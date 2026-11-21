"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { Select } from "@matsborges/manga-design-system/select";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import { formatCurrencyInput, parseCurrencyInput } from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";

type Category = { id: string; name: string; icon: string | null };

export function NewTransactionForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amountInput, setAmountInput] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const amount = parseCurrencyInput(amountInput);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (amount <= 0) {
      setError("Informe um valor maior que zero.");
      return;
    }
    if (!description.trim()) {
      setError("Informe uma descri\u00e7\u00e3o.");
      return;
    }

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        type,
        amount,
        description: description.trim(),
        date,
        category_id: type === "expense" && categoryId ? categoryId : null,
      });

    if (insertError) {
      setError("Erro ao salvar. Tente novamente.");
      setLoading(false);
      return;
    }

    router.push("/home");
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
        style={{ height: "56px", padding: "0 4px 0 4px", gap: "4px" }}
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
          Nova Transa\u00e7\u00e3o
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "16px" }}
        >
          <div className="flex flex-col" style={{ gap: "20px" }}>
            {/* Type toggle */}
            <div className="flex" style={{ gap: "8px" }}>
              <button
                type="button"
                onClick={() => {
                  setType("expense");
                  setCategoryId("");
                }}
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
                    type === "expense" ? "white" : "rgb(35,25,56)",
                }}
              >
                Sa\u00edda
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("income");
                  setCategoryId("");
                }}
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
                    type === "income" ? "white" : "rgb(35,25,56)",
                }}
              >
                Entrada
              </button>
            </div>

            {/* Amount */}
            <TextField
              label="Valor"
              type="text"
              inputMode="numeric"
              required
              value={amountInput ? `R$ ${amountInput}` : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/^R\$\s?/, "");
                setAmountInput(formatCurrencyInput(raw));
                setError(null);
              }}
              placeholder="R$ 0,00"
            />

            {/* Description */}
            <TextField
              label="Descri\u00e7\u00e3o"
              type="text"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError(null);
              }}
              placeholder={
                type === "expense"
                  ? "Com o que voc\u00ea gastou?"
                  : "De onde veio?"
              }
            />

            {/* Date */}
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

            {/* Category (expense only) */}
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
                style={{ fontSize: "14px", lineHeight: "21px" }}
              >
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="shrink-0" style={{ padding: "8px 16px 24px" }}>
          <Button type="submit" fullWidth size="large" loading={loading}>
            Registrar {type === "expense" ? "Sa\u00edda" : "Entrada"}
          </Button>
        </div>
      </form>
    </div>
  );
}
