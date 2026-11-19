"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ProgressBar } from "@matsborges/manga-design-system/progress-bar";
import { CategoryItem } from "@matsborges/manga-design-system/product";
import { GoalIdentity } from "@matsborges/manga-design-system/product";
import { ArrowBackIcon, CheckCircleIcon } from "@matsborges/manga-design-system/icons";
import {
  formatCurrencyInput,
  parseCurrencyInput,
  formatCurrency,
  formatPhone,
  phoneToDigits,
  formatCpf,
  cpfToDigits,
  isValidCpf,
} from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";

// --- Types ---

type Step =
  | "account"
  | "account-verify"
  | "identification"
  | "intro"
  | "balance"
  | "categories"
  | "limits"
  | "goal"
  | "reserve"
  | "recognition";

// Steps that count toward the progress bar (excludes account, account-verify, recognition)
const PROGRESS_STEPS: Step[] = [
  "identification",
  "intro",
  "balance",
  "categories",
  "limits",
  "goal",
  "reserve",
];

type CategoryDraft = {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  limit: string;
};

type GoalDraft = {
  name: string;
  target: string;
};

// --- localStorage persistence ---

const STORAGE_KEY = "manga_onboarding_draft";

type OnboardingDraft = {
  currentStep: Step;
  firstName: string;
  phone: string;
  cpf: string;
  balanceInput: string;
  categories: CategoryDraft[];
  skippedCategories: boolean;
  goal: GoalDraft;
  skippedGoal: boolean;
  reserveInput: string;
  signupEmail: string;
};

function saveDraft(draft: OnboardingDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // quota exceeded or private browsing
  }
}

function loadDraft(): OnboardingDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingDraft;
  } catch {
    return null;
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// --- Suggested categories ---

const SUGGESTED_CATEGORIES: CategoryDraft[] = [
  { id: "moradia", name: "Moradia", icon: "home", selected: true, limit: "" },
  { id: "alimentacao", name: "Alimentacao", icon: "restaurant", selected: true, limit: "" },
  { id: "transporte", name: "Transporte", icon: "directions-car", selected: true, limit: "" },
  { id: "saude", name: "Saude", icon: "favorite", selected: false, limit: "" },
  { id: "educacao", name: "Educacao", icon: "school", selected: false, limit: "" },
  { id: "lazer", name: "Lazer", icon: "beach-access", selected: false, limit: "" },
  { id: "compras", name: "Compras", icon: "redeem", selected: false, limit: "" },
  { id: "servicos", name: "Servicos", icon: "business-center", selected: false, limit: "" },
];

// --- Google icon ---

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

// --- Main component ---

export function OnboardingWizard({ startStep }: { startStep: Step }) {
  const router = useRouter();
  const hydrated = useRef(false);
  const [currentStep, setCurrentStep] = useState<Step>(startStep);
  const [loading, setLoading] = useState(false);

  // Account step
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [accountError, setAccountError] = useState<string | null>(null);

  // Identification step
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [identError, setIdentError] = useState<string | null>(null);

  // Balance step
  const [balanceInput, setBalanceInput] = useState("");
  const [balanceError, setBalanceError] = useState<string | null>(null);

  // Categories step
  const [categories, setCategories] = useState<CategoryDraft[]>(SUGGESTED_CATEGORIES);
  const [skippedCategories, setSkippedCategories] = useState(false);

  // Goal step
  const [goal, setGoal] = useState<GoalDraft>({ name: "", target: "" });
  const [skippedGoal, setSkippedGoal] = useState(false);

  // Reserve step
  const [reserveInput, setReserveInput] = useState("");
  const [reserveError, setReserveError] = useState<string | null>(null);

  // Finish
  const [finishError, setFinishError] = useState<string | null>(null);

  // Restore draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      // Only restore if the saved step is at or after the server-determined startStep
      // (don't go back to "account" if server says "identification")
      const allSteps: Step[] = ["account", "account-verify", "identification", "intro", "balance", "categories", "limits", "goal", "reserve", "recognition"];
      const startIdx = allSteps.indexOf(startStep);
      const savedIdx = allSteps.indexOf(draft.currentStep);
      if (savedIdx >= startIdx) {
        setCurrentStep(draft.currentStep);
      }
      setFirstName(draft.firstName || "");
      setPhone(draft.phone || "");
      setCpf(draft.cpf || "");
      setBalanceInput(draft.balanceInput || "");
      setCategories(draft.categories || SUGGESTED_CATEGORIES);
      setSkippedCategories(draft.skippedCategories || false);
      setGoal(draft.goal || { name: "", target: "" });
      setSkippedGoal(draft.skippedGoal || false);
      setReserveInput(draft.reserveInput || "");
      setSignupEmail(draft.signupEmail || "");
    }
    hydrated.current = true;
  }, [startStep]);

  // Save draft on changes
  useEffect(() => {
    if (!hydrated.current) return;
    if (currentStep === "account" || currentStep === "account-verify") return;
    saveDraft({
      currentStep,
      firstName,
      phone,
      cpf,
      balanceInput,
      categories,
      skippedCategories,
      goal,
      skippedGoal,
      reserveInput,
      signupEmail,
    });
  }, [currentStep, firstName, phone, cpf, balanceInput, categories, skippedCategories, goal, skippedGoal, reserveInput, signupEmail]);

  // Derived values
  const balanceValue = parseCurrencyInput(balanceInput);
  const selectedCategories = categories.filter((c) => c.selected);
  const reserveValue = parseCurrencyInput(reserveInput);
  const goalTarget = parseCurrencyInput(goal.target);
  const progressIndex = PROGRESS_STEPS.indexOf(currentStep);
  const showProgress = progressIndex >= 0;

  const goTo = useCallback((step: Step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    const backMap: Partial<Record<Step, () => Step>> = {
      identification: () => "account" as Step,
      intro: () => "identification",
      balance: () => "intro",
      categories: () => "balance",
      limits: () => "categories",
      goal: () => skippedCategories ? "categories" : "limits",
      reserve: () => "goal",
      recognition: () => (skippedGoal ? "goal" : "reserve"),
    };
    const getPrev = backMap[currentStep];
    if (getPrev) {
      const prev = getPrev();
      // Don't go back to account if already authenticated
      if (prev === "account" && startStep !== "account") return;
      goTo(prev);
    }
  }, [currentStep, skippedCategories, skippedGoal, startStep, goTo]);

  // --- Step handlers ---

  async function handleAccountCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAccountError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });

    if (error) {
      setAccountError(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      goTo("account-verify");
    }
  }

  async function handleGoogleSignup() {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
    if (error) {
      setAccountError("Erro ao conectar com Google. Tente novamente.");
    }
  }

  async function handleIdentificationContinue() {
    const trimmedName = firstName.trim();
    if (!trimmedName) {
      setIdentError("Como podemos te chamar?");
      return;
    }
    const phoneDigits = phoneToDigits(phone);
    if (phoneDigits.length !== 11) {
      setIdentError("Telefone deve ter 11 digitos (DDD + numero).");
      return;
    }
    const cpfDigits = cpfToDigits(cpf);
    if (cpfDigits && !isValidCpf(cpfDigits)) {
      setIdentError("CPF invalido.");
      return;
    }

    setLoading(true);
    setIdentError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Salvar dados pessoais no profile
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: trimmedName,
          phone: phoneDigits,
          cpf: cpfDigits || null,
        })
        .eq("id", user.id);

      if (error) {
        if (error.message.includes("profiles_phone_unique")) {
          setIdentError("Este WhatsApp ja esta vinculado a outra conta.");
        } else if (error.message.includes("idx_profiles_cpf_unique")) {
          setIdentError("Este CPF ja esta vinculado a outra conta.");
        } else {
          setIdentError("Erro ao salvar. Tente novamente.");
        }
        setLoading(false);
        return;
      }

      setLoading(false);
      goTo("intro");
    } catch {
      setIdentError("Erro inesperado. Tente novamente.");
      setLoading(false);
    }
  }

  function handleBalanceContinue() {
    if (balanceInput === "") {
      setBalanceError("Informe seu saldo, mesmo que seja R$ 0,00.");
      return;
    }
    if (balanceValue < 0) {
      setBalanceError("O saldo nao pode ser negativo.");
      return;
    }
    setBalanceError(null);
    goTo("categories");
  }

  function handleCategoriesContinue() {
    setSkippedCategories(false);
    if (selectedCategories.length === 0) {
      setSkippedCategories(true);
      goTo("goal");
    } else {
      goTo("limits");
    }
  }

  function handleCategoriesSkip() {
    setSkippedCategories(true);
    setCategories((prev) => prev.map((c) => ({ ...c, selected: false })));
    goTo("goal");
  }

  function handleGoalContinue() {
    setSkippedGoal(false);
    goTo("reserve");
  }

  function handleGoalSkip() {
    setSkippedGoal(true);
    goTo("recognition");
  }

  function handleReserveContinue() {
    if (reserveValue > balanceValue) {
      setReserveError("A reserva nao pode ser maior que o saldo disponivel.");
      return;
    }
    setReserveError(null);
    goTo("recognition");
  }

  async function handleFinish() {
    setLoading(true);
    setFinishError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      if (!skippedCategories && selectedCategories.length > 0) {
        const { error: catError } = await supabase.from("categories").insert(
          selectedCategories.map((c, i) => ({
            user_id: user.id,
            name: c.name,
            icon: c.icon,
            monthly_limit: c.limit ? parseCurrencyInput(c.limit) : null,
            sort_order: i,
          }))
        );
        if (catError) throw catError;
      }

      let createdGoalId: string | null = null;
      if (!skippedGoal && goal.name.trim() && goalTarget > 0) {
        const { data: goalData, error: goalError } = await supabase
          .from("goals")
          .insert({
            user_id: user.id,
            name: goal.name.trim(),
            target: goalTarget,
            color: "orange",
            icon: "star",
            content_type: "icon",
          })
          .select("id")
          .single();
        if (goalError) throw goalError;
        createdGoalId = goalData.id;
      }

      if (createdGoalId && reserveValue > 0) {
        const { error: moveError } = await supabase
          .from("goal_movements")
          .insert({
            goal_id: createdGoalId,
            user_id: user.id,
            type: "reserve",
            amount: reserveValue,
          });
        if (moveError) throw moveError;

        const { error: updateError } = await supabase
          .from("goals")
          .update({ current_value: reserveValue })
          .eq("id", createdGoalId);
        if (updateError) throw updateError;
      }

      const { error: onboardingError } = await supabase.rpc(
        "complete_onboarding",
        { balance: balanceValue }
      );
      if (onboardingError) throw onboardingError;

      clearDraft();
      router.push("/home");
      router.refresh();
    } catch (err) {
      console.error("Erro ao salvar onboarding:", err);
      setFinishError("Algo deu errado ao salvar. Tente novamente.");
      setLoading(false);
    }
  }

  function toggleCategory(id: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  }

  function setCategoryLimit(id: string, limit: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, limit } : c))
    );
  }

  // --- Layout components (Figma structure: safe-top 24 + header 64 + content flex + actions + safe-bottom 24) ---

  function StepLayout({
    children,
    actions,
    showHeader = true,
  }: {
    children: React.ReactNode;
    actions?: React.ReactNode;
    showHeader?: boolean;
  }) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Safe area top */}
        <div className="h-6 shrink-0" />

        {/* Header */}
        {showHeader && showProgress && (
          <div className="h-16 shrink-0 flex flex-col justify-center px-6">
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={goBack}
                className="p-1 -ml-1 text-manga-text-secondary hover:text-manga-text-primary transition-colors"
                aria-label="Voltar"
              >
                <ArrowBackIcon />
              </button>
              <span className="text-sm text-manga-text-secondary">
                {progressIndex + 1} de {PROGRESS_STEPS.length}
              </span>
            </div>
            <ProgressBar
              value={progressIndex + 1}
              max={PROGRESS_STEPS.length}
              label="Progresso do onboarding"
              height={4}
            />
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {/* Actions — fixed at bottom */}
        {actions && (
          <div className="shrink-0 px-6 pb-2">
            {actions}
          </div>
        )}

        {/* Safe area bottom */}
        <div className="h-6 shrink-0" />
      </div>
    );
  }

  // --- Steps ---

  function renderAccount() {
    return (
      <div className="flex flex-col min-h-screen px-6">
        <div className="h-6 shrink-0" />
        <div className="pt-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="p-2 -ml-2 text-manga-text-secondary hover:text-manga-text-primary transition-colors"
            aria-label="Voltar"
          >
            <ArrowBackIcon />
          </button>
        </div>

        <div className="flex-1 pt-4">
          <div className="flex justify-center mb-6">
            <Image src="/assets/logo-gradient.svg" alt="Manga" width={60} height={67} priority />
          </div>
          <h1 className="text-[28px] font-bold text-manga-text-primary mb-2 text-center">
            Criar sua conta
          </h1>
          <p className="text-manga-text-secondary mb-8 text-center">
            Preencha para comecar.
          </p>

          <form onSubmit={handleAccountCreate} className="space-y-4">
            <TextField
              label="E-mail"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
            <TextField
              label="Senha"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Minimo 6 caracteres"
            />

            {accountError && <p className="text-error-500 text-sm">{accountError}</p>}

            <Button type="submit" loading={loading} fullWidth size="large">
              Criar conta
            </Button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-manga-background-subtle" />
            <span className="text-sm text-manga-text-secondary">ou</span>
            <div className="flex-1 h-px bg-manga-background-subtle" />
          </div>

          <Button
            variant="secondary"
            fullWidth
            size="large"
            onClick={handleGoogleSignup}
            leadingIcon={<GoogleIcon />}
          >
            Continuar com Google
          </Button>
        </div>

        <div className="mt-auto pb-8 pt-6 text-center">
          <p className="text-sm text-manga-text-secondary">
            Ja tem conta?{" "}
            <a href="/login" className="text-manga-text-brand font-medium">
              Entrar
            </a>
          </p>
        </div>
      </div>
    );
  }

  function renderAccountVerify() {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-6 text-center">
        <div className="mb-6 text-manga-text-brand">
          <CheckCircleIcon />
        </div>
        <h1 className="text-xl font-bold text-manga-text-primary mb-3">
          Verifique seu e-mail
        </h1>
        <p className="text-manga-text-secondary mb-8 max-w-xs">
          Enviamos um link de confirmacao para{" "}
          <strong className="text-manga-text-primary">{signupEmail}</strong>.
          Clique no link para ativar sua conta e continuar.
        </p>
        <Button variant="secondary" fullWidth size="large" onClick={() => router.push("/login")}>
          Ir para login
        </Button>
      </div>
    );
  }

  function renderIdentification() {
    return (
      <StepLayout
        actions={
          <Button
            onClick={handleIdentificationContinue}
            fullWidth
            size="large"
            loading={loading}
          >
            Continuar
          </Button>
        }
      >
        <h1 className="text-xl font-bold text-manga-text-primary mb-2">
          Como podemos te chamar?
        </h1>
        <p className="text-manga-text-secondary mb-6">
          Precisamos de alguns dados para personalizar sua experiencia.
        </p>

        <div className="space-y-4">
          <TextField
            label="Primeiro nome"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setIdentError(null);
            }}
            required
            placeholder="Seu nome"
          />
          <TextField
            label="WhatsApp"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(formatPhone(e.target.value));
              setIdentError(null);
            }}
            required
            placeholder="(11) 99999-9999"
            helperText="Usado para registrar gastos por mensagem."
          />
          <TextField
            label="CPF (opcional)"
            type="text"
            value={cpf}
            onChange={(e) => {
              setCpf(formatCpf(e.target.value));
              setIdentError(null);
            }}
            placeholder="000.000.000-00"
          />
        </div>

        {identError && <p className="text-error-500 text-sm mt-4">{identError}</p>}
      </StepLayout>
    );
  }

  function renderIntro() {
    return (
      <StepLayout
        actions={
          <Button onClick={() => goTo("balance")} fullWidth size="large">
            Continuar
          </Button>
        }
      >
        <div className="flex flex-col items-center text-center pt-8">
          <Image src="/assets/logo-gradient.svg" alt="Manga" width={80} height={90} priority />
          <h1 className="text-xl font-bold text-manga-text-primary mt-8 mb-3">
            Vamos configurar seu Manga
          </h1>
          <p className="text-manga-text-secondary max-w-xs">
            Algumas perguntas rapidas para o Manga te ajudar melhor. Leva menos
            de 2 minutos.
          </p>
        </div>
      </StepLayout>
    );
  }

  function renderBalance() {
    return (
      <StepLayout
        actions={
          <Button onClick={handleBalanceContinue} fullWidth size="large">
            Continuar
          </Button>
        }
      >
        <h1 className="text-xl font-bold text-manga-text-primary mb-2">
          Qual seu saldo disponivel hoje?
        </h1>
        <p className="text-manga-text-secondary mb-6">
          Pode ser aproximado. R$ 0 tambem vale.
        </p>
        <TextField
          label="Saldo disponivel"
          type="text"
          inputMode="numeric"
          value={balanceInput ? `R$ ${balanceInput}` : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/^R\$\s?/, "");
            setBalanceInput(formatCurrencyInput(raw));
            setBalanceError(null);
          }}
          placeholder="R$ 0,00"
          error={balanceError ?? undefined}
          helperText="Quanto voce tem disponivel agora, fora metas e reservas."
        />
      </StepLayout>
    );
  }

  function renderCategories() {
    return (
      <StepLayout
        actions={
          <div className="space-y-3">
            <Button onClick={handleCategoriesContinue} fullWidth size="large">
              Continuar{selectedCategories.length > 0 && ` (${selectedCategories.length})`}
            </Button>
            <Button onClick={handleCategoriesSkip} variant="tertiary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </div>
        }
      >
        <h1 className="text-xl font-bold text-manga-text-primary mb-2">
          Categorias ajudam a organizar seus gastos
        </h1>
        <p className="text-manga-text-secondary mb-6">
          Sugerimos algumas para comecar. Voce pode alterar depois.
        </p>
        <div className="space-y-1">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              title={cat.name}
              mode="selection"
              name="categories"
              value={cat.id}
              checked={cat.selected}
              onChange={() => toggleCategory(cat.id)}
            />
          ))}
        </div>
      </StepLayout>
    );
  }

  function renderLimits() {
    return (
      <StepLayout
        actions={
          <div className="space-y-3">
            <Button onClick={() => goTo("goal")} fullWidth size="large">
              Continuar
            </Button>
            <Button onClick={() => goTo("goal")} variant="tertiary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </div>
        }
      >
        <h1 className="text-xl font-bold text-manga-text-primary mb-2">
          Defina limites mensais
        </h1>
        <p className="text-manga-text-secondary mb-6">
          Opcional. Ajuda o Manga a te avisar quando estiver perto do teto.
        </p>
        <div className="space-y-4">
          {selectedCategories.map((cat) => (
            <TextField
              key={cat.id}
              label={cat.name}
              type="text"
              inputMode="numeric"
              value={cat.limit ? `R$ ${cat.limit}` : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/^R\$\s?/, "");
                setCategoryLimit(cat.id, formatCurrencyInput(raw));
              }}
              placeholder="Sem limite"
            />
          ))}
        </div>
      </StepLayout>
    );
  }

  function renderGoal() {
    const hasGoalData = goal.name.trim() && goal.target;
    return (
      <StepLayout
        actions={
          <div className="space-y-3">
            <Button onClick={handleGoalContinue} fullWidth size="large" disabled={!hasGoalData}>
              Criar meta
            </Button>
            <Button onClick={handleGoalSkip} variant="tertiary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </div>
        }
      >
        <h1 className="text-xl font-bold text-manga-text-primary mb-2">
          Que tal criar sua primeira meta?
        </h1>
        <p className="text-manga-text-secondary mb-6">
          Uma meta ajuda a separar dinheiro com proposito.
        </p>
        <div className="flex justify-center mb-6">
          <GoalIdentity name={goal.name || "Meta"} size={72} color="orange" />
        </div>
        <div className="space-y-4">
          <TextField
            label="Nome da meta"
            type="text"
            value={goal.name}
            onChange={(e) => setGoal((g) => ({ ...g, name: e.target.value }))}
            placeholder="Ex: Reserva de emergencia"
          />
          <TextField
            label="Valor objetivo"
            type="text"
            inputMode="numeric"
            value={goal.target ? `R$ ${goal.target}` : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/^R\$\s?/, "");
              setGoal((g) => ({ ...g, target: formatCurrencyInput(raw) }));
            }}
            placeholder="R$ 0,00"
          />
        </div>
      </StepLayout>
    );
  }

  function renderReserve() {
    return (
      <StepLayout
        actions={
          <div className="space-y-3">
            <Button onClick={handleReserveContinue} fullWidth size="large" disabled={!reserveInput}>
              Reservar
            </Button>
            <Button onClick={() => goTo("recognition")} variant="tertiary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </div>
        }
      >
        <h1 className="text-xl font-bold text-manga-text-primary mb-2">
          Reservar para &quot;{goal.name}&quot;?
        </h1>
        <p className="text-manga-text-secondary mb-6">
          Voce tem {formatCurrency(balanceValue)} disponivel.
        </p>
        <TextField
          label="Valor da reserva"
          type="text"
          inputMode="numeric"
          value={reserveInput ? `R$ ${reserveInput}` : ""}
          onChange={(e) => {
            const raw = e.target.value.replace(/^R\$\s?/, "");
            setReserveInput(formatCurrencyInput(raw));
            setReserveError(null);
          }}
          placeholder="R$ 0,00"
          error={reserveError ?? undefined}
          helperText={`Disponivel: ${formatCurrency(balanceValue)}`}
        />
      </StepLayout>
    );
  }

  function renderRecognition() {
    const hasGoal = !skippedGoal && goal.name.trim();
    const hasReserve = reserveValue > 0;
    const hasCategories = !skippedCategories && selectedCategories.length > 0;

    return (
      <div className="flex flex-col min-h-screen items-center justify-center px-6 text-center">
        <div className="mb-6 text-manga-text-brand">
          <CheckCircleIcon />
        </div>
        <h1 className="text-2xl font-bold text-manga-text-primary mb-3">
          Tudo pronto!
        </h1>
        <p className="text-manga-text-secondary mb-8 max-w-xs">
          O Manga ja esta pronto para te ajudar a cuidar do seu dinheiro.
        </p>

        <div className="w-full max-w-xs space-y-3 mb-10 text-left">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-manga-text-brand">&#10003;</span>
            <span className="text-manga-text-primary">
              Saldo inicial: {formatCurrency(balanceValue)}
            </span>
          </div>
          {hasCategories && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-manga-text-brand">&#10003;</span>
              <span className="text-manga-text-primary">
                {selectedCategories.length} categoria{selectedCategories.length > 1 ? "s" : ""} configurada{selectedCategories.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {hasGoal && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-manga-text-brand">&#10003;</span>
              <span className="text-manga-text-primary">
                Meta &quot;{goal.name}&quot; ({formatCurrency(goalTarget)})
              </span>
            </div>
          )}
          {hasReserve && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-manga-text-brand">&#10003;</span>
              <span className="text-manga-text-primary">
                {formatCurrency(reserveValue)} reservado
              </span>
            </div>
          )}
        </div>

        {finishError && <p className="text-error-500 text-sm mb-4">{finishError}</p>}

        <div className="w-full max-w-xs">
          <Button onClick={handleFinish} fullWidth size="large" loading={loading}>
            Ir para o Manga
          </Button>
        </div>
      </div>
    );
  }

  // --- Render ---

  const stepRenderers: Record<Step, () => React.ReactNode> = {
    account: renderAccount,
    "account-verify": renderAccountVerify,
    identification: renderIdentification,
    intro: renderIntro,
    balance: renderBalance,
    categories: renderCategories,
    limits: renderLimits,
    goal: renderGoal,
    reserve: renderReserve,
    recognition: renderRecognition,
  };

  return <>{stepRenderers[currentStep]()}</>;
}
