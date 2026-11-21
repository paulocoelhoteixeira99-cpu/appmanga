"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoalCard } from "@matsborges/manga-design-system/goal-card";
import { GoalIdentity } from "@matsborges/manga-design-system/goal-identity";
import { GoalPersonalizationSheet } from "@matsborges/manga-design-system/goal-personalization";
import { TransactionItem } from "@matsborges/manga-design-system/transaction-item";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { Drawer } from "@matsborges/manga-design-system/drawer";
import { Dialog } from "@matsborges/manga-design-system/dialog";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import {
  formatCurrency,
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";
import type {
  GoalColor,
  GoalIconName,
  GoalIdentityValue,
} from "@matsborges/manga-design-system/product";

type Goal = {
  id: string;
  name: string;
  target: number;
  current_value: number;
  color: string;
  icon: string | null;
  content_type: string;
  status: string;
  created_at: string;
};

type Movement = {
  id: string;
  type: "reserve" | "withdraw";
  amount: number;
  created_at: string;
};

export function GoalDetail({
  goal,
  movements,
  availableBalance,
}: {
  goal: Goal;
  movements: Movement[];
  availableBalance: number;
}) {
  const router = useRouter();
  const [showMoveDrawer, setShowMoveDrawer] = useState(false);
  const [moveType, setMoveType] = useState<"reserve" | "withdraw">(
    "reserve"
  );
  const [moveAmount, setMoveAmount] = useState("");
  const [moveError, setMoveError] = useState<string | null>(null);
  const [moveSaving, setMoveSaving] = useState(false);

  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editName, setEditName] = useState(goal.name);
  const [editTargetInput, setEditTargetInput] = useState(
    formatCurrencyInput((goal.target * 100).toString())
  );
  const [editIdentity, setEditIdentity] = useState<GoalIdentityValue>(
    {
      content: goal.content_type as "initials" | "icon" | "image",
      icon: goal.icon as GoalIconName | undefined,
      color: goal.color as GoalColor,
    }
  );
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isCompleted = goal.status === "completed";
  const percentage =
    goal.target > 0
      ? Math.round((goal.current_value / goal.target) * 100)
      : 0;

  async function handleMove() {
    const amount = parseCurrencyInput(moveAmount);
    if (amount <= 0) {
      setMoveError("Informe um valor maior que zero.");
      return;
    }
    if (
      moveType === "reserve" &&
      amount > availableBalance
    ) {
      setMoveError("Valor maior que o dispon\u00edvel.");
      return;
    }
    if (
      moveType === "withdraw" &&
      amount > goal.current_value
    ) {
      setMoveError("Valor maior que o reservado na meta.");
      return;
    }

    setMoveSaving(true);
    setMoveError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const newValue =
      moveType === "reserve"
        ? goal.current_value + amount
        : goal.current_value - amount;

    const [insertResult, updateResult] = await Promise.all([
      supabase.from("goal_movements").insert({
        goal_id: goal.id,
        user_id: user.id,
        type: moveType,
        amount,
      }),
      supabase
        .from("goals")
        .update({
          current_value: newValue,
          ...(newValue >= goal.target
            ? { status: "completed", completed_at: new Date().toISOString() }
            : {}),
        })
        .eq("id", goal.id),
    ]);

    if (insertResult.error || updateResult.error) {
      setMoveError("Erro ao registrar. Tente novamente.");
      setMoveSaving(false);
      return;
    }

    setShowMoveDrawer(false);
    setMoveAmount("");
    setMoveSaving(false);
    router.refresh();
  }

  async function handleEditSave() {
    const target = parseCurrencyInput(editTargetInput);
    if (!editName.trim()) return;
    if (target <= 0) return;

    setEditSaving(true);
    const supabase = createClient();
    await supabase
      .from("goals")
      .update({
        name: editName.trim(),
        target,
        color: editIdentity.color,
        icon: editIdentity.icon ?? null,
        content_type: editIdentity.content,
      })
      .eq("id", goal.id);

    setShowEditDrawer(false);
    setEditSaving(false);
    router.refresh();
  }

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    await supabase.from("goals").delete().eq("id", goal.id);
    router.push("/metas");
    router.refresh();
  }

  function openMove(type: "reserve" | "withdraw") {
    setMoveType(type);
    setMoveAmount("");
    setMoveError(null);
    setShowMoveDrawer(true);
  }

  return (
    <div
      className="flex flex-col bg-manga-background-default"
      style={{ minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="shrink-0" style={{ height: "24px" }} />
      <div
        className="shrink-0 flex items-center justify-between"
        style={{ height: "56px", padding: "0 4px" }}
      >
        <div className="flex items-center" style={{ gap: "4px" }}>
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
            {goal.name}
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setShowEditDrawer(true)}
          className="font-semibold"
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            color: "rgb(238,105,31)",
          }}
        >
          Editar
        </button>
      </div>

      {/* Content */}
      <div
        className="flex-1"
        style={{ padding: "16px" }}
      >
        <div
          className="flex flex-col"
          style={{ gap: "24px" }}
        >
          {/* Goal progress card */}
          <GoalCard
            title={goal.name}
            value={goal.current_value}
            target={goal.target}
            identity={{
              color: goal.color as GoalColor,
              icon: goal.icon as GoalIconName | undefined,
              content: goal.content_type as
                | "initials"
                | "icon"
                | "image",
            }}
            status={isCompleted ? "completed" : undefined}
            supportingInformation={
              isCompleted
                ? "Meta conclu\u00edda!"
                : `${percentage}% do objetivo \u2022 Faltam ${formatCurrency(goal.target - goal.current_value)}`
            }
            variant="elevated"
          />

          {/* Actions */}
          {!isCompleted && (
            <div className="flex" style={{ gap: "8px" }}>
              <Button
                fullWidth
                size="large"
                onClick={() => openMove("reserve")}
              >
                Reservar
              </Button>
              {goal.current_value > 0 && (
                <Button
                  fullWidth
                  size="large"
                  variant="secondary"
                  onClick={() => openMove("withdraw")}
                >
                  Retirar
                </Button>
              )}
            </div>
          )}

          {/* Movement history */}
          <div>
            <h2
              className="font-semibold text-manga-text-secondary"
              style={{
                fontSize: "14px",
                lineHeight: "21px",
                marginBottom: "12px",
              }}
            >
              Hist\u00f3rico
            </h2>
            {movements.length === 0 ? (
              <EmptyState
                title="Sem movimenta\u00e7\u00f5es"
                description="Reserve ou retire valores para ver o hist\u00f3rico aqui."
                size="compact"
              />
            ) : (
              <div
                className="flex flex-col"
                style={{ gap: "4px" }}
              >
                {movements.map((m) => (
                  <TransactionItem
                    key={m.id}
                    title={
                      m.type === "reserve"
                        ? "Reserva"
                        : "Retirada"
                    }
                    amount={m.amount}
                    kind={
                      m.type === "reserve"
                        ? "income"
                        : "expense"
                    }
                    description={new Date(
                      m.created_at
                    ).toLocaleDateString("pt-BR")}
                    size="compact"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Delete */}
          <Button
            fullWidth
            size="large"
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Excluir meta
          </Button>
        </div>
      </div>

      {/* Move drawer (reserve/withdraw) */}
      <Drawer
        open={showMoveDrawer}
        onOpenChange={setShowMoveDrawer}
        title={
          moveType === "reserve"
            ? "Reservar para meta"
            : "Retirar da meta"
        }
        description={
          moveType === "reserve"
            ? `Dispon\u00edvel: ${formatCurrency(availableBalance)}`
            : `Reservado: ${formatCurrency(goal.current_value)}`
        }
      >
        <div
          className="flex flex-col"
          style={{ gap: "16px", padding: "16px 0" }}
        >
          <TextField
            label="Valor"
            type="text"
            inputMode="numeric"
            required
            value={moveAmount ? `R$ ${moveAmount}` : ""}
            onChange={(e) => {
              const raw = e.target.value.replace(/^R\$\s?/, "");
              setMoveAmount(formatCurrencyInput(raw));
              setMoveError(null);
            }}
            placeholder="R$ 0,00"
            error={moveError ?? undefined}
          />
          <Button
            fullWidth
            size="large"
            loading={moveSaving}
            onClick={handleMove}
          >
            {moveType === "reserve"
              ? "Confirmar Reserva"
              : "Confirmar Retirada"}
          </Button>
        </div>
      </Drawer>

      {/* Edit drawer */}
      <Drawer
        open={showEditDrawer}
        onOpenChange={setShowEditDrawer}
        title="Editar Meta"
      >
        <div
          className="flex flex-col"
          style={{ gap: "16px", padding: "16px 0" }}
        >
          <TextField
            label="Nome da meta"
            type="text"
            required
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          {!isCompleted && (
            <TextField
              label="Valor objetivo"
              type="text"
              inputMode="numeric"
              required
              value={
                editTargetInput
                  ? `R$ ${editTargetInput}`
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(
                  /^R\$\s?/,
                  ""
                );
                setEditTargetInput(formatCurrencyInput(raw));
              }}
              placeholder="R$ 0,00"
            />
          )}

          {/* Personalization row */}
          <div>
            <p
              className="font-semibold text-manga-text-primary"
              style={{
                fontSize: "14px",
                lineHeight: "21px",
                marginBottom: "8px",
              }}
            >
              Personaliza\u00e7\u00e3o
            </p>
            <button
              type="button"
              onClick={() => setShowPersonalization(true)}
              className="flex items-center"
              style={{ gap: "12px" }}
            >
              <GoalIdentity
                name={editName || goal.name}
                size={48}
                content={editIdentity.content}
                icon={editIdentity.icon}
                color={editIdentity.color}
              />
              <span
                className="text-manga-text-secondary"
                style={{ fontSize: "14px" }}
              >
                Alterar \u00edcone e cor
              </span>
            </button>
          </div>

          <Button
            fullWidth
            size="large"
            loading={editSaving}
            onClick={handleEditSave}
          >
            Salvar altera\u00e7\u00f5es
          </Button>
        </div>
      </Drawer>

      {/* Personalization sheet */}
      <GoalPersonalizationSheet
        open={showPersonalization}
        onOpenChange={setShowPersonalization}
        name={editName || goal.name}
        value={editIdentity}
        onApply={(val) => {
          setEditIdentity(val);
          setShowPersonalization(false);
        }}
      />

      {/* Delete dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Excluir meta?"
        description={
          goal.current_value > 0
            ? `O valor de ${formatCurrency(goal.current_value)} reservado ser\u00e1 devolvido ao seu dispon\u00edvel.`
            : "Essa a\u00e7\u00e3o n\u00e3o pode ser desfeita."
        }
        variant="destructive"
        footer={
          <div className="flex" style={{ gap: "8px" }}>
            <Button
              variant="tertiary"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              loading={deleting}
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        }
      />
    </div>
  );
}
