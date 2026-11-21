"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryItem } from "@matsborges/manga-design-system/category-item";
import { TransactionItem } from "@matsborges/manga-design-system/transaction-item";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { Drawer } from "@matsborges/manga-design-system/drawer";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import {
  formatCurrency,
  formatCurrencyInput,
  parseCurrencyInput,
} from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";
import type { ProductIconName } from "@matsborges/manga-design-system/product";

type Category = {
  id: string;
  name: string;
  icon: string | null;
  monthly_limit: number | null;
};

type Transaction = {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: string;
};

function getStatusText(
  spent: number,
  limit: number | null
): { text: string; color: string } {
  if (!limit)
    return { text: "Sem limite definido", color: "rgb(90,82,105)" };
  const pct = (spent / limit) * 100;
  if (pct > 100)
    return {
      text: "Acima do planejado",
      color: "rgb(185,28,28)",
    };
  if (pct >= 80)
    return { text: "Atenção", color: "rgb(180,83,9)" };
  return {
    text: "Dentro do planejado",
    color: "rgb(15,83,37)",
  };
}

export function CategoryDetail({
  category,
  transactions,
  spent,
}: {
  category: Category;
  transactions: Transaction[];
  spent: number;
}) {
  const router = useRouter();
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [editLimitInput, setEditLimitInput] = useState(
    category.monthly_limit
      ? formatCurrencyInput(
          (category.monthly_limit * 100).toString()
        )
      : ""
  );
  const [editSaving, setEditSaving] = useState(false);

  const status = getStatusText(spent, category.monthly_limit);

  async function handleEditSave() {
    if (!editName.trim()) return;

    setEditSaving(true);
    const limit = parseCurrencyInput(editLimitInput);
    const supabase = createClient();
    await supabase
      .from("categories")
      .update({
        name: editName.trim(),
        monthly_limit: limit > 0 ? limit : null,
      })
      .eq("id", category.id);

    setShowEditDrawer(false);
    setEditSaving(false);
    router.refresh();
  }

  return (
    <div
      className="flex flex-col bg-manga-background-default"
      style={{ minHeight: "100dvh", paddingBottom: "88px" }}
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
            {category.name}
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
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Spending overview */}
        <CategoryItem
          title={category.name}
          icon={
            category.icon ? (
              <ProductIcon
                name={category.icon as ProductIconName}
                className="w-6 h-6"
              />
            ) : undefined
          }
          showIcon
          mode="spending"
          spent={spent}
          limit={category.monthly_limit ?? undefined}
          variant="surface"
        />

        {/* Status */}
        <div>
          <p
            className="font-semibold"
            style={{
              fontSize: "14px",
              lineHeight: "21px",
              color: status.color,
            }}
          >
            {status.text}
          </p>
          {category.monthly_limit && (
            <p
              className="text-manga-text-secondary"
              style={{
                fontSize: "14px",
                lineHeight: "21px",
                marginTop: "4px",
              }}
            >
              {formatCurrency(spent)} de{" "}
              {formatCurrency(category.monthly_limit)} planejados
            </p>
          )}
        </div>

        {/* Transaction list */}
        <div>
          <h2
            className="font-semibold text-manga-text-secondary"
            style={{
              fontSize: "14px",
              lineHeight: "21px",
              marginBottom: "12px",
            }}
          >
            Gastos do mês
          </h2>
          {transactions.length === 0 ? (
            <EmptyState
              title="Sem gastos nesta categoria"
              description="Os gastos registrados com esta categoria aparecerão aqui."
              size="compact"
            />
          ) : (
            <div
              className="flex flex-col"
              style={{ gap: "4px" }}
            >
              {transactions.map((t) => (
                <TransactionItem
                  key={t.id}
                  title={t.description}
                  amount={t.amount}
                  kind="expense"
                  description={new Date(
                    t.date + "T12:00:00"
                  ).toLocaleDateString("pt-BR")}
                  href={`/transacoes/${t.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit drawer */}
      <Drawer
        open={showEditDrawer}
        onOpenChange={setShowEditDrawer}
        title="Editar Categoria"
      >
        <div
          className="flex flex-col"
          style={{ gap: "16px", padding: "16px 0" }}
        >
          <TextField
            label="Nome"
            type="text"
            required
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            label="Limite mensal (opcional)"
            type="text"
            inputMode="numeric"
            value={
              editLimitInput ? `R$ ${editLimitInput}` : ""
            }
            onChange={(e) => {
              const raw = e.target.value.replace(
                /^R\$\s?/,
                ""
              );
              setEditLimitInput(formatCurrencyInput(raw));
            }}
            placeholder="Sem limite"
          />
          <Button
            fullWidth
            size="large"
            loading={editSaving}
            onClick={handleEditSave}
          >
            Salvar
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
