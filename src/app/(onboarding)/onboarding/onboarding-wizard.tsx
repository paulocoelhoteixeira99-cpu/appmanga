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
import { formatCurrencyInput, parseCurrencyInput, formatCurrency } from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";

// --- Types ---

type Step =
  | "welcome"
  | "balance"
  | "categories"
  | "limits"
  | "goal"
  | "reserve"
  | "recognition";

const STEPS_ORDER: Step[] = [
  "welcome",
  "balance",
  "categories",
  "limits",
  "goal",
  "reserve",
  "recognition",
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

// --- localStorage draft ---

const STORAGE_KEY = "manga_onboarding_draft";

type OnboardingDraft = {
  currentStep: Step;
  balanceInput: string;
  categories: CategoryDraft[];
  skippedCategories: boolean;
  goal: GoalDraft;
  skippedGoal: boolean;
  reserveInput: string;
};

function saveDraft(draft: OnboardingDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // quota exceeded or private browsing — ignore silently
  }
}

function loadDraft(): OnboardingDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingDraft;
    // Validar que o step salvo e valido
    if (!STEPS_ORDER.includes(parsed.currentStep)) return null;
    return parsed;
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

// --- Main component ---

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [loading, setLoading] = useState(false);
  const hydrated = useRef(false);

  // State per step
  const [balanceInput, setBalanceInput] = useState("");
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryDraft[]>(SUGGESTED_CATEGORIES);
  const [skippedCategories, setSkippedCategories] = useState(false);
  const [goal, setGoal] = useState<GoalDraft>({ name: "", target: "" });
  const [skippedGoal, setSkippedGoal] = useState(false);
  const [reserveInput, setReserveInput] = useState("");
  const [reserveError, setReserveError] = useState<string | null>(null);
  const [finishError, setFinishError] = useState<string | null>(null);

  // Restaurar rascunho do localStorage no mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setCurrentStep(draft.currentStep);
      setBalanceInput(draft.balanceInput);
      setCategories(draft.categories);
      setSkippedCategories(draft.skippedCategories);
      setGoal(draft.goal);
      setSkippedGoal(draft.skippedGoal);
      setReserveInput(draft.reserveInput);
    }
    hydrated.current = true;
  }, []);

  // Salvar rascunho no localStorage a cada mudanca de step
  useEffect(() => {
    if (!hydrated.current) return;
    // Nao salvar na tela de welcome (nada foi preenchido ainda)
    if (currentStep === "welcome") return;
    saveDraft({
      currentStep,
      balanceInput,
      categories,
      skippedCategories,
      goal,
      skippedGoal,
      reserveInput,
    });
  }, [currentStep, balanceInput, categories, skippedCategories, goal, skippedGoal, reserveInput]);

  const stepIndex = STEPS_ORDER.indexOf(currentStep);
  const totalSteps = STEPS_ORDER.length;

  const goTo = useCallback((step: Step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    if (currentStep === "welcome") return;

    // Skip logic when going back
    if (currentStep === "recognition") {
      goTo(skippedGoal ? "goal" : "reserve");
      return;
    }
    if (currentStep === "reserve") {
      goTo("goal");
      return;
    }
    if (currentStep === "goal") {
      goTo(skippedCategories ? "categories" : "limits");
      return;
    }
    if (currentStep === "limits") {
      goTo("categories");
      return;
    }

    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) goTo(STEPS_ORDER[prevIndex]);
  }, [currentStep, stepIndex, skippedCategories, skippedGoal, goTo]);

  // Derived values
  const balanceValue = parseCurrencyInput(balanceInput);
  const selectedCategories = categories.filter((c) => c.selected);
  const reserveValue = parseCurrencyInput(reserveInput);
  const goalTarget = parseCurrencyInput(goal.target);

  // --- Step handlers ---

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

  function handleLimitsContinue() {
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

  function handleReserveSkip() {
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

      // 1. Inserir categorias selecionadas
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

      // 2. Criar meta se preenchida
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

      // 3. Reservar valor para meta se informado
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

        // Atualizar current_value da meta
        const { error: updateError } = await supabase
          .from("goals")
          .update({ current_value: reserveValue })
          .eq("id", createdGoalId);
        if (updateError) throw updateError;
      }

      // 4. Completar onboarding (salva saldo inicial + marca como completo)
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

  // --- Render helpers ---

  function renderHeader() {
    if (currentStep === "welcome" || currentStep === "recognition") return null;

    return (
      <div className="sticky top-0 z-10 bg-manga-background-default px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-3">
          <button
            type="button"
            onClick={goBack}
            className="p-1 -ml-1 text-manga-text-secondary hover:text-manga-text-primary transition-colors"
            aria-label="Voltar"
          >
            <ArrowBackIcon />
          </button>
          <span className="text-sm text-manga-text-secondary">
            {stepIndex} de {totalSteps - 2}
          </span>
        </div>
        <ProgressBar
          value={stepIndex}
          max={totalSteps - 2}
          label="Progresso do onboarding"
          height={4}
        />
      </div>
    );
  }

  // --- Steps ---

  function renderWelcome() {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <Image
            src="/assets/logo-gradient.svg"
            alt="Manga"
            width={80}
            height={80}
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-manga-text-primary mb-3">
          Seu dinheiro, com mais clareza.
        </h1>
        <p className="text-manga-text-secondary mb-10 max-w-xs">
          Vamos configurar algumas coisas para o Manga te ajudar melhor. Leva
          menos de 2 minutos.
        </p>
        <Button onClick={() => goTo("balance")} fullWidth size="large">
          Comecar
        </Button>
      </div>
    );
  }

  function renderBalance() {
    return (
      <div className="flex-1 flex flex-col px-6 pt-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-manga-text-primary mb-2">
            Qual seu saldo disponivel hoje?
          </h1>
          <p className="text-manga-text-secondary mb-6">
            Pode ser aproximado. R$ 0 tambem vale.
          </p>

          <div className="mb-2">
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
              helperText="Informe quanto voce tem disponivel agora, fora metas e reservas."
            />
          </div>
        </div>

        <div className="pb-8">
          <Button onClick={handleBalanceContinue} fullWidth size="large">
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  function renderCategories() {
    return (
      <div className="flex-1 flex flex-col px-6 pt-6">
        <div className="flex-1">
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
        </div>

        <div className="pb-8 space-y-3 pt-6">
          <Button onClick={handleCategoriesContinue} fullWidth size="large">
            Continuar{selectedCategories.length > 0 && ` (${selectedCategories.length})`}
          </Button>
          <Button
            onClick={handleCategoriesSkip}
            variant="tertiary"
            fullWidth
            size="large"
          >
            Pular por enquanto
          </Button>
        </div>
      </div>
    );
  }

  function renderLimits() {
    return (
      <div className="flex-1 flex flex-col px-6 pt-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-manga-text-primary mb-2">
            Defina limites mensais
          </h1>
          <p className="text-manga-text-secondary mb-6">
            Opcional. Ajuda o Manga a te avisar quando estiver perto do teto.
          </p>

          <div className="space-y-4">
            {selectedCategories.map((cat) => (
              <div key={cat.id}>
                <TextField
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
              </div>
            ))}
          </div>
        </div>

        <div className="pb-8 space-y-3 pt-6">
          <Button onClick={handleLimitsContinue} fullWidth size="large">
            Continuar
          </Button>
          <Button
            onClick={() => goTo("goal")}
            variant="tertiary"
            fullWidth
            size="large"
          >
            Pular por enquanto
          </Button>
        </div>
      </div>
    );
  }

  function renderGoal() {
    const hasGoalData = goal.name.trim() && goal.target;

    return (
      <div className="flex-1 flex flex-col px-6 pt-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-manga-text-primary mb-2">
            Que tal criar sua primeira meta?
          </h1>
          <p className="text-manga-text-secondary mb-6">
            Uma meta ajuda a separar dinheiro com proposito. Pode ser uma
            viagem, uma reserva de emergencia, um presente...
          </p>

          <div className="flex justify-center mb-6">
            <GoalIdentity
              name={goal.name || "Meta"}
              size={72}
              color="orange"
            />
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
        </div>

        <div className="pb-8 space-y-3 pt-6">
          <Button
            onClick={handleGoalContinue}
            fullWidth
            size="large"
            disabled={!hasGoalData}
          >
            Criar meta
          </Button>
          <Button
            onClick={handleGoalSkip}
            variant="tertiary"
            fullWidth
            size="large"
          >
            Pular por enquanto
          </Button>
        </div>
      </div>
    );
  }

  function renderReserve() {
    return (
      <div className="flex-1 flex flex-col px-6 pt-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-manga-text-primary mb-2">
            Deseja reservar um valor para essa meta?
          </h1>
          <p className="text-manga-text-secondary mb-6">
            Voce tem {formatCurrency(balanceValue)} disponivel. Quanto quer separar
            para &quot;{goal.name}&quot;?
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
        </div>

        <div className="pb-8 space-y-3 pt-6">
          <Button
            onClick={handleReserveContinue}
            fullWidth
            size="large"
            disabled={!reserveInput}
          >
            Reservar
          </Button>
          <Button
            onClick={handleReserveSkip}
            variant="tertiary"
            fullWidth
            size="large"
          >
            Pular por enquanto
          </Button>
        </div>
      </div>
    );
  }

  function renderRecognition() {
    const hasGoal = !skippedGoal && goal.name.trim();
    const hasReserve = reserveValue > 0;
    const hasCategories = !skippedCategories && selectedCategories.length > 0;

    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
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
                Meta &quot;{goal.name}&quot; criada ({formatCurrency(goalTarget)})
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

        {finishError && (
          <p className="text-error-500 text-sm mb-4">{finishError}</p>
        )}

        <Button onClick={handleFinish} fullWidth size="large" loading={loading}>
          Ir para o Manga
        </Button>
      </div>
    );
  }

  // --- Main render ---

  return (
    <>
      {renderHeader()}
      <div className="flex-1 flex flex-col">
        {currentStep === "welcome" && renderWelcome()}
        {currentStep === "balance" && renderBalance()}
        {currentStep === "categories" && renderCategories()}
        {currentStep === "limits" && renderLimits()}
        {currentStep === "goal" && renderGoal()}
        {currentStep === "reserve" && renderReserve()}
        {currentStep === "recognition" && renderRecognition()}
      </div>
    </>
  );
}
