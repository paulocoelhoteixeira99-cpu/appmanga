"use client";

import Link from "next/link";
import { CategoryItem } from "@matsborges/manga-design-system/category-item";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { Button } from "@matsborges/manga-design-system/button";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { formatCurrency } from "@/lib/utils/masks";
import type { ProductIconName } from "@matsborges/manga-design-system/product";

type Category = {
  id: string;
  name: string;
  icon: string | null;
  monthly_limit: number | null;
  spent: number;
};

function getMonthLabel(): string {
  const now = new Date();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${months[now.getMonth()]} de ${now.getFullYear()}`;
}

export function CategoriesContent({
  categories,
  totalSpent,
}: {
  categories: Category[];
  totalSpent: number;
}) {
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
            Categorias
          </h1>
          <p
            className="text-manga-text-secondary"
            style={{
              fontSize: "14px",
              lineHeight: "21px",
              marginTop: "4px",
            }}
          >
            {getMonthLabel()} •{" "}
            {formatCurrency(totalSpent)} em saídas
          </p>
        </div>

        {/* Category list */}
        {categories.length === 0 ? (
          <EmptyState
            title="O que você gostaria de acompanhar?"
            description="Crie categorias para organizar suas saídas e acompanhar seus gastos."
            size="compact"
          />
        ) : (
          <div
            className="flex flex-col"
            style={{ gap: "8px" }}
          >
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                title={cat.name}
                icon={
                  cat.icon ? (
                    <ProductIcon
                      name={cat.icon as ProductIconName}
                      className="w-6 h-6"
                    />
                  ) : undefined
                }
                showIcon
                mode="spending"
                spent={cat.spent}
                limit={cat.monthly_limit ?? undefined}
                variant="surface"
                href={`/categorias/${cat.id}`}
              />
            ))}
          </div>
        )}

        {/* Create button */}
        <div style={{ paddingTop: "8px" }}>
          <Link href="/categorias/nova">
            <Button fullWidth size="large" variant="secondary">
              Criar Categoria
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
