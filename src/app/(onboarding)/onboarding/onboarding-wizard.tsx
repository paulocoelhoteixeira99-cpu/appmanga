"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ProgressBar } from "@matsborges/manga-design-system/progress-bar";
import { InputChip } from "@matsborges/manga-design-system/chip";
import { GoalIdentity } from "@matsborges/manga-design-system/product";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { ArrowBackIcon, CheckCircleIcon } from "@matsborges/manga-design-system/icons";
import {
  formatCurrencyInput,
  parseCurrencyInput,
  formatCurrency,
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
  | "goal-create"
  | "reserve"
  | "recognition";

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

// --- Figma C01: 5 default categories ---

const SUGGESTED_CATEGORIES: CategoryDraft[] = [
  { id: "alimentacao", name: "Alimenta\u00e7\u00e3o", icon: "restaurant", selected: true, limit: "" },
  { id: "moradia", name: "Moradia", icon: "home", selected: true, limit: "" },
  { id: "transporte", name: "Transporte", icon: "directions-car", selected: true, limit: "" },
  { id: "lazer", name: "Lazer", icon: "beach-access", selected: true, limit: "" },
  { id: "saude", name: "Sa\u00fade", icon: "favorite", selected: true, limit: "" },
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
      const allSteps: Step[] = ["account", "account-verify", "identification", "intro", "balance", "categories", "limits", "goal", "goal-create", "reserve", "recognition"];
      const startIdx = allSteps.indexOf(startStep);
      const savedIdx = allSteps.indexOf(draft.currentStep);
      if (savedIdx >= startIdx) {
        setCurrentStep(draft.currentStep);
      }
      setFirstName(draft.firstName || "");
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
      balanceInput,
      categories,
      skippedCategories,
      goal,
      skippedGoal,
      reserveInput,
      signupEmail,
    });
  }, [currentStep, firstName, balanceInput, categories, skippedCategories, goal, skippedGoal, reserveInput, signupEmail]);

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
      "goal-create": () => "goal",
      reserve: () => "goal-create",
      recognition: () => (skippedGoal ? "goal" : "reserve"),
    };
    const getPrev = backMap[currentStep];
    if (getPrev) {
      const prev = getPrev();
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
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        setAccountError("Este e-mail j\u00e1 est\u00e1 cadastrado. Tente entrar.");
      } else if (error.message.includes("password") || error.message.includes("Password")) {
        setAccountError("A senha deve ter pelo menos 6 caracteres.");
      } else if (error.message.includes("valid") || error.message.includes("email")) {
        setAccountError("E-mail inv\u00e1lido. Verifique e tente novamente.");
      } else if (error.message.includes("rate") || error.message.includes("limit")) {
        setAccountError("Muitas tentativas. Aguarde um momento e tente novamente.");
      } else {
        setAccountError(`Erro ao criar conta: ${error.message}`);
      }
      setLoading(false);
      return;
    }

    // Detect duplicate email (Supabase returns user with empty identities)
    if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
      setAccountError("Este e-mail j\u00e1 possui uma conta. Tente entrar.");
      setLoading(false);
      return;
    }

    // Check if user is auto-confirmed (session exists immediately)
    if (data.session) {
      setLoading(false);
      goTo("identification");
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

      const { error } = await supabase
        .from("profiles")
        .update({ first_name: trimmedName })
        .eq("id", user.id);

      if (error) {
        setIdentError("Erro ao salvar. Tente novamente.");
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
      setBalanceError("O saldo n\u00e3o pode ser negativo.");
      return;
    }
    setBalanceError(null);
    goTo("categories");
  }

  function handleCategoriesAccept() {
    setSkippedCategories(false);
    setCategories(SUGGESTED_CATEGORIES);
    goTo("limits");
  }

  function handleCategoriesSkip() {
    setSkippedCategories(true);
    setCategories((prev) => prev.map((c) => ({ ...c, selected: false })));
    goTo("goal");
  }

  function handleGoalSkip() {
    setSkippedGoal(true);
    goTo("recognition");
  }

  function handleGoalCreate() {
    setSkippedGoal(false);
    goTo("goal-create");
  }

  function handleGoalFormContinue() {
    goTo("reserve");
  }

  function handleReserveContinue() {
    if (reserveValue > balanceValue) {
      setReserveError("A reserva n\u00e3o pode ser maior que o saldo dispon\u00edvel.");
      return;
    }
    setReserveError(null);
    goTo("recognition");
  }

  function setCategoryLimit(id: string, limit: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, limit } : c))
    );
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

  // =========================================================
  // Figma layout: safe-top(24) + header(64) + content + actions + safe-bottom(24)
  // =========================================================

  function StepLayout({
    children,
    actions,
  }: {
    children: React.ReactNode;
    actions?: React.ReactNode;
  }) {
    return (
      <div
        className="flex flex-col bg-manga-background-default"
        style={{ minHeight: "100dvh" }}
      >
        {/* Safe area top — Figma: 24px */}
        <div className="shrink-0" style={{ height: "24px" }} />

        {/* Header — Figma: h=64, padL=16, padR=16, gap=12 */}
        {showProgress && (
          <div
            className="shrink-0 flex items-center"
            style={{ height: "64px", padding: "0 16px", gap: "12px" }}
          >
            <button
              type="button"
              onClick={goBack}
              className="flex items-center justify-center text-manga-text-primary"
              style={{ width: "44px", height: "44px", borderRadius: "4px" }}
              aria-label="Voltar"
            >
              <ArrowBackIcon />
            </button>
            <div className="flex-1">
              <ProgressBar
                value={progressIndex + 1}
                max={PROGRESS_STEPS.length}
                label="Progresso do onboarding"
                height={8}
              />
            </div>
          </div>
        )}

        {/* Scrollable content — Figma: pad=16 all sides */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "16px" }}>
          {children}
        </div>

        {/* Actions — Figma: padL=16, padT=4, padR=16, padB=4, gap=8 */}
        {actions && (
          <div
            className="shrink-0 flex flex-col"
            style={{ padding: "4px 16px", gap: "8px" }}
          >
            {actions}
          </div>
        )}

        {/* Safe area bottom — Figma: 24px */}
        <div className="shrink-0" style={{ height: "24px" }} />
      </div>
    );
  }

  // =========================================================
  // Account creation — no Figma equivalent, follows E03 Login pattern
  // =========================================================

  function renderAccount() {
    return (
      <div
        className="bg-manga-background-default flex flex-col"
        style={{ minHeight: "100dvh", padding: "0 24px" }}
      >
        {/* Back — Figma E03: pos=(16,32) 40x40 */}
        <div style={{ paddingTop: "32px", marginLeft: "-8px" }}>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex items-center justify-center text-manga-text-primary"
            style={{ width: "40px", height: "40px" }}
            aria-label="Voltar"
          >
            <ArrowBackIcon />
          </button>
        </div>

        {/* Content — follows E03 pattern: pos=(24,112), gap=32 */}
        <div
          className="flex flex-col"
          style={{ paddingTop: "40px", gap: "32px" }}
        >
          {/* Title — Figma: 32/600, lh=38.4, ls=-0.64 */}
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "32px",
              lineHeight: "38.4px",
              letterSpacing: "-0.64px",
            }}
          >
            Criar sua conta
          </h1>

          {/* Form — gap=16 */}
          <form
            onSubmit={handleAccountCreate}
            className="flex flex-col"
            style={{ gap: "16px" }}
          >
            <TextField
              label="E-mail"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
              placeholder="Seu e-mail"
            />
            <TextField
              label="Senha"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
              minLength={6}
              placeholder="M\u00ednimo 6 caracteres"
            />

            {accountError && (
              <p
                className="text-manga-text-primary"
                style={{ fontSize: "14px", lineHeight: "21px", color: "#7F1D1D" }}
              >
                {accountError}
              </p>
            )}

            <Button type="submit" loading={loading} fullWidth size="large">
              Criar conta
            </Button>
          </form>

          {/* Google — gap=16 */}
          <div className="flex flex-col" style={{ gap: "16px" }}>
            <p
              className="text-manga-text-secondary text-center"
              style={{ fontSize: "14px", lineHeight: "21px" }}
            >
              ou
            </p>
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
        </div>

        {/* Footer — Figma E03: pos=(24,696), h=48 */}
        <div
          className="mt-auto flex items-center justify-center"
          style={{ height: "48px", marginBottom: "56px" }}
        >
          <p
            className="text-manga-text-secondary text-center"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            J\u00e1 tem conta?{" "}
            <Link href="/login" className="text-manga-text-brand font-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // Account verify — email confirmation
  // =========================================================

  function renderAccountVerify() {
    return (
      <div className="flex flex-col bg-manga-background-default items-center justify-center px-6 text-center" style={{ minHeight: "100dvh" }}>
        <div className="mb-6 text-manga-text-brand">
          <CheckCircleIcon />
        </div>
        <h1
          className="font-semibold text-manga-text-primary"
          style={{ fontSize: "20px", lineHeight: "24px", marginBottom: "12px" }}
        >
          Verifique seu e-mail
        </h1>
        <p
          className="text-manga-text-secondary max-w-xs"
          style={{ fontSize: "14px", lineHeight: "21px", marginBottom: "32px" }}
        >
          Enviamos um link de confirma\u00e7\u00e3o para{" "}
          <strong className="text-manga-text-primary">{signupEmail}</strong>.
          Clique no link para ativar sua conta e continuar.
        </p>
        <Button variant="secondary" fullWidth size="large" onClick={() => router.push("/login")}>
          Ir para login
        </Button>
      </div>
    );
  }

  // =========================================================
  // 01 · Conta — Figma: "Como podemos chamar voce?"
  // Title: 20/600, lh=24, ls=-0.4 | Content gap=12
  // =========================================================

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
            Pr\u00f3ximo
          </Button>
        }
      >
        <div className="flex flex-col" style={{ gap: "12px" }}>
          {/* Figma: 20/600, lh=24, ls=-0.4 */}
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              letterSpacing: "-0.4px",
            }}
          >
            Como podemos chamar voc\u00ea?
          </h1>

          <TextField
            label="Nome"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setIdentError(null);
            }}
            required
            placeholder="Seu nome"
          />
        </div>

        {identError && (
          <p
            style={{ fontSize: "14px", lineHeight: "21px", color: "#7F1D1D", marginTop: "16px" }}
          >
            {identError}
          </p>
        )}
      </StepLayout>
    );
  }

  // =========================================================
  // 02 · Introducao financeira — Figma exact
  // Title: 24/600, lh=28.8, ls=-0.48 | Content gap=20
  // =========================================================

  function renderIntro() {
    return (
      <StepLayout
        actions={
          <Button onClick={() => goTo("balance")} fullWidth size="large">
            Informar Saldo Inicial
          </Button>
        }
      >
        <div className="flex flex-col" style={{ gap: "20px" }}>
          {/* Figma: 24/600, lh=28.8, ls=-0.48 */}
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Vamos entender seu ponto de partida
          </h1>

          {/* Figma: 16/400, lh=24 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "16px", lineHeight: "24px" }}
          >
            Primeiro, informe quanto voc\u00ea tem dispon\u00edvel hoje. Depois, voc\u00ea pode
            organizar Categorias e criar uma Meta.
          </p>

          {/* Figma: 14/400, lh=21 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            O Manga acompanha seus registros. Voc\u00ea escolhe o que organizar agora
            e o que deixar para depois.
          </p>
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // 03 · Saldo Inicial — Figma exact
  // Title: 24/600 | Field: "Saldo Inicial" | Button: "Confirmar Saldo Inicial"
  // =========================================================

  function renderBalance() {
    return (
      <StepLayout
        actions={
          <Button onClick={handleBalanceContinue} fullWidth size="large">
            Confirmar Saldo Inicial
          </Button>
        }
      >
        <div className="flex flex-col" style={{ gap: "20px" }}>
          {/* Figma: 24/600, lh=28.8, ls=-0.48 */}
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Quanto voc\u00ea tem dispon\u00edvel hoje?
          </h1>

          <TextField
            label="Saldo Inicial"
            type="text"
            inputMode="numeric"
            value={balanceInput ? `R$ ${balanceInput}` : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/^R\$\s?/, "");
              setBalanceInput(formatCurrencyInput(raw));
              setBalanceError(null);
            }}
            placeholder="R$ 0,00"
            required
            error={balanceError ?? undefined}
          />

          {/* Figma: 14/400, lh=21 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Esse \u00e9 seu ponto de partida no Manga. A partir dele, acompanhamos o
            que entra, o que sai e o que voc\u00ea reserva para Metas.
          </p>

          {/* Figma: 12/400, lh=18 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "12px", lineHeight: "18px" }}
          >
            Saldo Inicial n\u00e3o conta como Entrada.
          </p>
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // C01 · Categorias sugeridas — Figma exact
  // Chips in gray card, "Personalizar categorias" link
  // =========================================================

  function renderCategories() {
    return (
      <StepLayout
        actions={
          <>
            <Button onClick={handleCategoriesAccept} fullWidth size="large">
              Usar estas categorias
            </Button>
            <Button onClick={handleCategoriesSkip} variant="tertiary" fullWidth size="large">
              Configurar depois
            </Button>
          </>
        }
      >
        <div className="flex flex-col" style={{ gap: "24px" }}>
          {/* Title + subtitle — Figma gap=12 */}
          <div className="flex flex-col" style={{ gap: "12px" }}>
            <h1
              className="font-semibold text-manga-text-primary"
              style={{
                fontSize: "24px",
                lineHeight: "28.8px",
                letterSpacing: "-0.48px",
              }}
            >
              Suas categorias j\u00e1 est\u00e3o prontas!
            </h1>
            <p
              className="text-manga-text-secondary"
              style={{ fontSize: "14px", lineHeight: "21px" }}
            >
              Comece com uma organiza\u00e7\u00e3o simples e personalize quando quiser.
            </p>
          </div>

          {/* Figma: Card with chips — fill=rgb(241,240,243), radius=16, pad=16, gap=16 */}
          <div
            style={{
              backgroundColor: "rgb(241,240,243)",
              borderRadius: "16px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Chips — flex wrap, gap=8 */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SUGGESTED_CATEGORIES.map((cat) => (
                <InputChip
                  key={cat.id}
                  label={cat.name}
                  leadingIcon={
                    <ProductIcon
                      name={cat.icon as import("@matsborges/manga-design-system/product").ProductIconName}
                      className="w-5 h-5"
                    />
                  }
                />
              ))}
            </div>

            {/* "Personalizar categorias" link — Figma: 14/600, chevron */}
            <button
              type="button"
              className="flex items-center justify-between w-full text-manga-text-primary"
              style={{
                height: "48px",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "21px",
              }}
            >
              <span>Personalizar categorias</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Helper — Figma: 14/400, lh=21 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Esta etapa \u00e9 opcional. Voc\u00ea pode ajustar suas categorias depois.
          </p>
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // Limits — no Figma hi-fi, follows onboarding pattern
  // =========================================================

  function renderLimits() {
    return (
      <StepLayout
        actions={
          <>
            <Button onClick={() => goTo("goal")} fullWidth size="large">
              Continuar
            </Button>
            <Button onClick={() => goTo("goal")} variant="secondary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </>
        }
      >
        <div className="flex flex-col" style={{ gap: "20px" }}>
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Defina limites mensais
          </h1>
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Opcional. Ajuda o Manga a te avisar quando estiver perto do teto.
          </p>
          <div className="flex flex-col" style={{ gap: "16px" }}>
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
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // 10 · Oferta da primeira Meta — Figma exact
  // Title: 24/600 | Body: 14/400 | 2 buttons
  // =========================================================

  function renderGoal() {
    return (
      <StepLayout
        actions={
          <>
            <Button onClick={handleGoalCreate} fullWidth size="large">
              Criar minha primeira Meta
            </Button>
            <Button onClick={handleGoalSkip} variant="secondary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </>
        }
      >
        <div className="flex flex-col" style={{ gap: "12px" }}>
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Existe algo para o qual voc\u00ea quer guardar dinheiro?
          </h1>
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Uma Meta ajuda a acompanhar o que voc\u00ea j\u00e1 reservou para um objetivo.
            Voc\u00ea pode cri\u00e1-la agora ou depois.
          </p>
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // Goal create form — follows onboarding pattern
  // =========================================================

  function renderGoalCreate() {
    const hasGoalData = goal.name.trim() && goal.target;
    return (
      <StepLayout
        actions={
          <Button onClick={handleGoalFormContinue} fullWidth size="large" disabled={!hasGoalData}>
            Criar Meta
          </Button>
        }
      >
        <div className="flex flex-col" style={{ gap: "20px" }}>
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Criar sua primeira Meta
          </h1>

          <div className="flex justify-center">
            <GoalIdentity name={goal.name || "Meta"} size={72} color="orange" />
          </div>

          <div className="flex flex-col" style={{ gap: "16px" }}>
            <TextField
              label="Nome da meta"
              type="text"
              value={goal.name}
              onChange={(e) => setGoal((g) => ({ ...g, name: e.target.value }))}
              placeholder="Ex: Reserva de emerg\u00eancia"
              required
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
              required
            />
          </div>
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // Reserve — follows onboarding pattern
  // =========================================================

  function renderReserve() {
    return (
      <StepLayout
        actions={
          <>
            <Button onClick={handleReserveContinue} fullWidth size="large" disabled={!reserveInput}>
              Reservar
            </Button>
            <Button onClick={() => goTo("recognition")} variant="secondary" fullWidth size="large">
              Pular por enquanto
            </Button>
          </>
        }
      >
        <div className="flex flex-col" style={{ gap: "20px" }}>
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Reservar para &quot;{goal.name}&quot;?
          </h1>
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Voc\u00ea tem {formatCurrency(balanceValue)} dispon\u00edvel.
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
            helperText={`Dispon\u00edvel: ${formatCurrency(balanceValue)}`}
          />
        </div>
      </StepLayout>
    );
  }

  // =========================================================
  // 17 · Reconhecimento basico — Figma exact
  // Title: 24/600 | Balance: 32/600 | Detail: 14/400
  // =========================================================

  function renderRecognition() {
    const displayBalance = formatCurrency(balanceValue).replace(",00", "");

    return (
      <StepLayout
        actions={
          <>
            <Button onClick={handleFinish} fullWidth size="large" loading={loading}>
              Come\u00e7ar a organiza\u00e7\u00e3o
            </Button>
            {finishError && (
              <p style={{ fontSize: "14px", lineHeight: "21px", color: "#7F1D1D", textAlign: "center" }}>
                {finishError}
              </p>
            )}
          </>
        }
      >
        <div className="flex flex-col" style={{ gap: "12px" }}>
          {/* Figma: 24/600, lh=28.8, ls=-0.48 */}
          <h1
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
            }}
          >
            Seu ponto de partida est\u00e1 claro
          </h1>

          {/* Figma: 32/600, lh=38.4, ls=-0.64 */}
          <p
            className="font-semibold text-manga-text-primary"
            style={{
              fontSize: "32px",
              lineHeight: "38.4px",
              letterSpacing: "-0.64px",
            }}
          >
            {displayBalance} dispon\u00edveis
          </p>

          {/* Figma: 14/400, lh=21 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Saldo Inicial: {formatCurrency(balanceValue)}
          </p>

          {/* Figma: 14/400, lh=21 */}
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Entradas e Sa\u00eddas come\u00e7am em R$ 0. Voc\u00ea pode registrar sua primeira
            Transa\u00e7\u00e3o quando precisar.
          </p>
        </div>
      </StepLayout>
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
    "goal-create": renderGoalCreate,
    reserve: renderReserve,
    recognition: renderRecognition,
  };

  return <>{stepRenderers[currentStep]()}</>;
}
