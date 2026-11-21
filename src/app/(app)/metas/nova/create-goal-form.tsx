"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoalCard } from "@matsborges/manga-design-system/goal-card";
import { GoalIdentity } from "@matsborges/manga-design-system/goal-identity";
import { GoalPersonalizationSheet } from "@matsborges/manga-design-system/goal-personalization";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import { formatCurrencyInput, parseCurrencyInput } from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";
import type {
  GoalColor,
  GoalIconName,
  GoalIdentityValue,
} from "@matsborges/manga-design-system/product";

export function CreateGoalForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [identity, setIdentity] = useState<GoalIdentityValue>({
    content: "initials",
    color: "orange",
  });
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const target = parseCurrencyInput(targetInput);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Informe o nome da meta.");
      return;
    }
    if (target <= 0) {
      setError("Informe um valor objetivo maior que zero.");
      return;
    }

    setSaving(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error: insertError } = await supabase
      .from("goals")
      .insert({
        user_id: user.id,
        name: name.trim(),
        target,
        color: identity.color,
        icon: identity.icon ?? null,
        content_type: identity.content,
      })
      .select("id")
      .single();

    if (insertError) {
      setError("Erro ao criar meta. Tente novamente.");
      setSaving(false);
      return;
    }

    router.push(`/metas/${data.id}`);
    router.refresh();
  }

  return (
    <div
      className="flex flex-col bg-manga-background-default"
      style={{ minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="shrink-0" style={{ height: "24px" }} />
      <div
        className="shrink-0 flex items-center"
        style={{ height: "56px", padding: "0 4px", gap: "4px" }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center text-manga-text-primary"
          style={{ width: "48px", height: "48px" }}
          aria-label="Voltar"
        >
          <ArrowBackIcon />
        </button>
        <h1
          className="font-semibold text-manga-text-primary"
          style={{ fontSize: "20px", lineHeight: "24px" }}
        >
          Criar Meta
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col"
      >
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "16px" }}
        >
          <div
            className="flex flex-col"
            style={{ gap: "20px" }}
          >
            {/* Personalization row */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowPersonalization(true)}
              >
                <GoalIdentity
                  name={name || "Meta"}
                  size={72}
                  content={identity.content}
                  icon={identity.icon}
                  color={identity.color}
                />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowPersonalization(true)}
              className="text-center font-semibold"
              style={{
                fontSize: "14px",
                color: "rgb(238,105,31)",
              }}
            >
              Personalizar ícone e cor
            </button>

            <TextField
              label="Nome da meta"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="Ex: Viagem, Reserva de emergência..."
            />

            <TextField
              label="Valor objetivo"
              type="text"
              inputMode="numeric"
              required
              value={targetInput ? `R$ ${targetInput}` : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(
                  /^R\$\s?/,
                  ""
                );
                setTargetInput(formatCurrencyInput(raw));
                setError(null);
              }}
              placeholder="R$ 0,00"
            />

            {/* Preview */}
            {name && target > 0 && (
              <div>
                <p
                  className="font-semibold text-manga-text-secondary"
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  Prévia
                </p>
                <GoalCard
                  title={name}
                  value={0}
                  target={target}
                  identity={{
                    color: identity.color,
                    icon: identity.icon,
                    content: identity.content,
                  }}
                  supportingInformation={`Objetivo: R$ ${targetInput}`}
                  variant="elevated"
                />
              </div>
            )}

            {error && (
              <p
                className="text-manga-text-error"
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                {error}
              </p>
            )}
          </div>
        </div>

        <div
          className="shrink-0"
          style={{ padding: "8px 16px 24px" }}
        >
          <Button
            type="submit"
            fullWidth
            size="large"
            loading={saving}
          >
            Criar Meta
          </Button>
        </div>
      </form>

      <GoalPersonalizationSheet
        open={showPersonalization}
        onOpenChange={setShowPersonalization}
        name={name || "Meta"}
        value={identity}
        onApply={(val) => {
          setIdentity(val);
          setShowPersonalization(false);
        }}
      />
    </div>
  );
}
