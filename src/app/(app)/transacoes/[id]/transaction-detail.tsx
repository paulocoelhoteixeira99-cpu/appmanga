"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { Select } from "@matsborges/manga-design-system/select";
import { Dialog } from "@matsborges/manga-design-system/dialog";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import {
  formatCurrency,
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category_id: string | null;
  created_at: string;
  updated_at: string;
};

type Category = { id: string; name: string; icon: string | null };

export function TransactionDetail({
  transaction,
  categories,
}: {
  transaction: Transaction;
  categories: Category[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [type, setType] = useState(transaction.type);
  const [amountInput, setAmountInput] = useState(
    formatCurrencyInput((transaction.amount * 100).toString())
  );
  const [description, setDescription] = useState(
    transaction.description
  );
  const [date, setDate] = useState(transaction.date);
  const [categoryId, setCategoryId] = useState(
    transaction.category_id ?? ""
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTypeDialog, setShowTypeDialog] = useState(false);
  const [pendingType, setPendingType] = useState<
    "income" | "expense" | null
  >(null);

  const amount = parseCurrencyInput(amountInput);
  const categoryName =
    categories.find((c) => c.id === transaction.category_id)?.name ??
    null;

  function handleTypeChange(newType: "income" | "expense") {
    if (newType !== type) {
      setPendingType(newType);
      setShowTypeDialog(true);
    }
  }

  function confirmTypeChange() {
    if (pendingType) {
      setType(pendingType);
      if (pendingType === "income") setCategoryId("");
    }
    setShowTypeDialog(false);
    setPendingType(null);
  }

  async function handleSave() {
    if (amount <= 0) {
      setError("Informe um valor maior que zero.");
      return;
    }
    if (!description.trim()) {
      setError("Informe uma descri\u00e7\u00e3o.");
      return;
    }

    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("transactions")
      .update({
        type,
        amount,
        description: description.trim(),
        date,
        category_id:
          type === "expense" && categoryId ? categoryId : null,
      })
      .eq("id", transaction.id);

    if (updateError) {
      setError("Erro ao salvar. Tente novamente.");
      setSaving(false);
      return;
    }

    router.push("/transacoes");
    router.refresh();
  }

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("transactions")
      .delete()
      .eq("id", transaction.id);

    if (deleteError) {
      setError("Erro ao excluir. Tente novamente.");
      setDeleting(false);
      setShowDeleteDialog(false);
      return;
    }

    router.push("/transacoes");
    router.refresh();
  }

  const typeLabel =
    transaction.type === "income" ? "Entrada" : "Sa\u00edda";
  const formattedDate = new Date(
    transaction.date + "T12:00:00"
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

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
            {editing ? "Editar Transa\u00e7\u00e3o" : "Transa\u00e7\u00e3o"}
          </h1>
        </div>
        {!editing && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="font-semibold"
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: "rgb(238,105,31)",
            }}
          >
            Editar
          </button>
        )}
      </div>

      {editing ? (
        /* Edit mode */
        <div className="flex-1 flex flex-col">
          <div
            className="flex-1 overflow-y-auto"
            style={{ padding: "16px" }}
          >
            <div
              className="flex flex-col"
              style={{ gap: "20px" }}
            >
              {/* Type toggle */}
              <div className="flex" style={{ gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => handleTypeChange("expense")}
                  className="flex-1 font-semibold"
                  style={{
                    height: "44px",
                    fontSize: "14px",
                    borderRadius: "12px",
                    backgroundColor:
                      type === "expense"
                        ? "rgb(238,105,31)"
                        : "rgb(241,240,243)",
                    color:
                      type === "expense"
                        ? "white"
                        : "rgb(35,25,56)",
                  }}
                >
                  Sa\u00edda
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange("income")}
                  className="flex-1 font-semibold"
                  style={{
                    height: "44px",
                    fontSize: "14px",
                    borderRadius: "12px",
                    backgroundColor:
                      type === "income"
                        ? "rgb(15,83,37)"
                        : "rgb(241,240,243)",
                    color:
                      type === "income"
                        ? "white"
                        : "rgb(35,25,56)",
                  }}
                >
                  Entrada
                </button>
              </div>

              <TextField
                label="Valor"
                type="text"
                inputMode="numeric"
                required
                value={amountInput ? `R$ ${amountInput}` : ""}
                onChange={(e) => {
                  const raw = e.target.value.replace(
                    /^R\$\s?/,
                    ""
                  );
                  setAmountInput(formatCurrencyInput(raw));
                  setError(null);
                }}
                placeholder="R$ 0,00"
              />

              <TextField
                label="Descri\u00e7\u00e3o"
                type="text"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError(null);
                }}
              />

              <div className="flex flex-col" style={{ gap: "6px" }}>
                <label
                  className="font-semibold text-manga-text-primary"
                  style={{ fontSize: "14px", lineHeight: "21px" }}
                >
                  Data
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-manga-text-primary bg-manga-background-default"
                  style={{
                    height: "48px",
                    padding: "0 16px",
                    fontSize: "16px",
                    borderRadius: "12px",
                    border: "1px solid rgb(200,196,208)",
                  }}
                />
              </div>

              {type === "expense" && categories.length > 0 && (
                <Select
                  label="Categoria (opcional)"
                  placeholder="Sem categoria"
                  options={categories.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                  value={categoryId}
                  onValueChange={setCategoryId}
                />
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
            className="shrink-0 flex flex-col"
            style={{ padding: "8px 16px 24px", gap: "8px" }}
          >
            <Button
              fullWidth
              size="large"
              loading={saving}
              onClick={handleSave}
            >
              Salvar altera\u00e7\u00f5es
            </Button>
            <Button
              fullWidth
              size="large"
              variant="tertiary"
              onClick={() => {
                setEditing(false);
                setType(transaction.type);
                setAmountInput(
                  formatCurrencyInput(
                    (transaction.amount * 100).toString()
                  )
                );
                setDescription(transaction.description);
                setDate(transaction.date);
                setCategoryId(transaction.category_id ?? "");
                setError(null);
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        /* View mode */
        <div className="flex-1 flex flex-col">
          <div
            className="flex-1"
            style={{ padding: "16px" }}
          >
            <div
              className="flex flex-col"
              style={{ gap: "24px" }}
            >
              {/* Amount */}
              <div className="text-center" style={{ padding: "16px 0" }}>
                <p
                  className="font-semibold"
                  style={{
                    fontSize: "32px",
                    lineHeight: "38px",
                    color:
                      transaction.type === "income"
                        ? "rgb(15,83,37)"
                        : "rgb(35,25,56)",
                  }}
                >
                  {transaction.type === "income" ? "+ " : "- "}
                  {formatCurrency(transaction.amount)}
                </p>
                <p
                  className="text-manga-text-secondary"
                  style={{
                    fontSize: "14px",
                    lineHeight: "21px",
                    marginTop: "4px",
                  }}
                >
                  {typeLabel}
                </p>
              </div>

              {/* Details */}
              <div
                className="flex flex-col"
                style={{ gap: "16px" }}
              >
                <DetailRow
                  label="Descri\u00e7\u00e3o"
                  value={transaction.description}
                />
                <DetailRow label="Data" value={formattedDate} />
                {transaction.type === "expense" && (
                  <DetailRow
                    label="Categoria"
                    value={categoryName ?? "Sem categoria"}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            className="shrink-0"
            style={{ padding: "8px 16px 24px" }}
          >
            <Button
              fullWidth
              size="large"
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Excluir transa\u00e7\u00e3o
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Excluir transa\u00e7\u00e3o?"
        description="Essa a\u00e7\u00e3o n\u00e3o pode ser desfeita. O valor ser\u00e1 removido do seu hist\u00f3rico."
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

      {/* Type change confirmation dialog */}
      <Dialog
        open={showTypeDialog}
        onOpenChange={setShowTypeDialog}
        title="Alterar tipo da transa\u00e7\u00e3o?"
        description={`A transa\u00e7\u00e3o ser\u00e1 alterada de ${typeLabel} para ${pendingType === "income" ? "Entrada" : "Sa\u00edda"}. Isso afeta o c\u00e1lculo do seu dispon\u00edvel.`}
        variant="confirmation"
        footer={
          <div className="flex" style={{ gap: "8px" }}>
            <Button
              variant="tertiary"
              onClick={() => {
                setShowTypeDialog(false);
                setPendingType(null);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={confirmTypeChange}>Confirmar</Button>
          </div>
        }
      />
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="font-semibold text-manga-text-secondary"
        style={{
          fontSize: "12px",
          lineHeight: "16px",
          textTransform: "uppercase",
          marginBottom: "4px",
        }}
      >
        {label}
      </p>
      <p
        className="text-manga-text-primary"
        style={{ fontSize: "16px", lineHeight: "24px" }}
      >
        {value}
      </p>
    </div>
  );
}
