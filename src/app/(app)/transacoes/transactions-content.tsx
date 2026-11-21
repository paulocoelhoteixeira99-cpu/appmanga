"use client";

import { useState } from "react";
import { TransactionItem } from "@matsborges/manga-design-system/transaction-item";
import { FinancialSummary } from "@matsborges/manga-design-system/financial-summary";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import type { ProductIconName } from "@matsborges/manga-design-system/product";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  category_id: string | null;
  created_at: string;
  categories: { name: string; icon: string | null } | null;
};

type Filter = "all" | "income" | "expense";

export function TransactionsContent({
  transactions,
  income,
  expense,
}: {
  transactions: Transaction[];
  income: number;
  expense: number;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  // Group by date
  const grouped = filtered.reduce<Record<string, Transaction[]>>(
    (acc, t) => {
      const key = t.date;
      if (!acc[key]) acc[key] = [];
      acc[key].push(t);
      return acc;
    },
    {}
  );

  const dateKeys = Object.keys(grouped).sort((a, b) =>
    b.localeCompare(a)
  );

  function formatDateLabel(dateStr: string) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.getTime() === today.getTime()) return "Hoje";
    if (date.getTime() === yesterday.getTime()) return "Ontem";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
    });
  }

  const filterButtons: { key: Filter; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "income", label: "Entradas" },
    { key: "expense", label: "Sa\u00eddas" },
  ];

  return (
    <div
      className="flex flex-col bg-manga-background-default"
      style={{ minHeight: "100dvh", paddingBottom: "88px" }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Header */}
        <div style={{ paddingTop: "24px" }}>
          <h1
            className="font-semibold text-manga-text-primary"
            style={{ fontSize: "24px", lineHeight: "28.8px" }}
          >
            Transa\u00e7\u00f5es
          </h1>
        </div>

        {/* Summary */}
        <FinancialSummary
          title="Movimenta\u00e7\u00f5es"
          income={income}
          expense={expense}
          period="M\u00eas atual"
          mode="simple"
          variant="embedded"
        />

        {/* Filters */}
        <div className="flex" style={{ gap: "8px" }}>
          {filterButtons.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className="font-semibold"
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "14px",
                backgroundColor:
                  filter === f.key
                    ? "rgb(35,25,56)"
                    : "rgb(241,240,243)",
                color:
                  filter === f.key ? "white" : "rgb(90,82,105)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Transaction list */}
        {filtered.length === 0 ? (
          <EmptyState
            title="Sem transa\u00e7\u00f5es"
            description="Seu hist\u00f3rico come\u00e7a aqui. Registre sua primeira transa\u00e7\u00e3o."
            size="compact"
          />
        ) : (
          <div
            className="flex flex-col"
            style={{ gap: "16px" }}
          >
            {dateKeys.map((dateStr) => (
              <div key={dateStr}>
                <p
                  className="font-semibold text-manga-text-secondary"
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  {formatDateLabel(dateStr)}
                </p>
                <div
                  className="flex flex-col"
                  style={{ gap: "4px" }}
                >
                  {grouped[dateStr].map((t) => (
                    <TransactionItem
                      key={t.id}
                      title={t.description}
                      amount={t.amount}
                      kind={t.type}
                      description={t.categories?.name}
                      leading={
                        t.categories?.icon ? (
                          <ProductIcon
                            name={
                              t.categories
                                .icon as ProductIconName
                            }
                            className="w-5 h-5"
                          />
                        ) : undefined
                      }
                      showLeading={!!t.categories?.icon}
                      href={`/transacoes/${t.id}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
