"use client";

import { useState } from "react";
import Link from "next/link";
import { FinancialCard } from "@matsborges/manga-design-system/financial-card";
import { GoalCard } from "@matsborges/manga-design-system/goal-card";
import { CategoryItem } from "@matsborges/manga-design-system/category-item";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { Button } from "@matsborges/manga-design-system/button";
import { MangaInsights } from "@matsborges/manga-design-system/manga-insights";
import { ArrowForwardIcon } from "@matsborges/manga-design-system/icons";
import { formatCurrency } from "@/lib/utils/masks";
import type { Insight } from "@/lib/insights/engine";
import type { GoalIconName } from "@matsborges/manga-design-system/product";
import type { GoalColor } from "@matsborges/manga-design-system/product";
import type { ProductIconName } from "@matsborges/manga-design-system/product";

type GoalData = {
  id: string;
  title: string;
  value: number;
  target: number;
  color: GoalColor;
  icon?: string;
  contentType: "initials" | "icon" | "image";
};

type CategorySpendingData = {
  category_id: string;
  category_name: string;
  icon: string | null;
  monthly_limit: number | null;
  spent: number;
};

type HomeContentProps = {
  firstName: string;
  balance: number;
  income: number;
  expense: number;
  insights: Insight[];
  goals: GoalData[];
  categorySpending: CategorySpendingData[];
};

function getMonthLabel(): string {
  const now = new Date();
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  return `${months[now.getMonth()]} de ${now.getFullYear()} · mês atual`;
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.167 12.5a1.375 1.375 0 0 0 .275 1.517l.05.05a1.667 1.667 0 1 1-2.359 2.358l-.05-.05a1.375 1.375 0 0 0-1.516-.275 1.375 1.375 0 0 0-.834 1.258v.142a1.667 1.667 0 1 1-3.333 0v-.075a1.375 1.375 0 0 0-.9-1.258 1.375 1.375 0 0 0-1.517.275l-.05.05a1.667 1.667 0 1 1-2.358-2.359l.05-.05A1.375 1.375 0 0 0 3.9 12.567a1.375 1.375 0 0 0-1.258-.834h-.142a1.667 1.667 0 0 1 0-3.333h.075A1.375 1.375 0 0 0 3.833 7.5a1.375 1.375 0 0 0-.275-1.517l-.05-.05A1.667 1.667 0 1 1 5.867 3.575l.05.05A1.375 1.375 0 0 0 7.433 3.9h.067a1.375 1.375 0 0 0 .833-1.258v-.142a1.667 1.667 0 0 1 3.334 0v.075a1.375 1.375 0 0 0 .833 1.258 1.375 1.375 0 0 0 1.517-.275l.05-.05a1.667 1.667 0 1 1 2.358 2.359l-.05.05a1.375 1.375 0 0 0-.275 1.516v.067a1.375 1.375 0 0 0 1.258.833h.142a1.667 1.667 0 0 1 0 3.334h-.075a1.375 1.375 0 0 0-1.258.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeContent({
  firstName,
  balance,
  income,
  expense,
  insights,
  goals,
  categorySpending,
}: HomeContentProps) {
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <div className="relative flex flex-col" style={{ minHeight: "100dvh", paddingBottom: "88px" }}>
      {/* Figma: Orange background — h=215, fill=rgb(238,105,31) with curved bottom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "215px",
          backgroundColor: "rgb(238,105,31)",
          borderRadius: "0 0 24px 24px",
          zIndex: 0,
        }}
      />

      {/* Content above orange bg */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Safe area top — Figma: 24px */}
        <div style={{ height: "24px" }} />

        {/* Header — Figma: h=90, pad=16, gap=8 */}
        <header
          className="flex items-center justify-between"
          style={{ height: "90px", padding: "16px" }}
        >
          {/* Figma: "Olá, [Name] 👋" — 24/600, lh=28.8, ls=-0.48, white */}
          <h1
            className="font-semibold"
            style={{
              fontSize: "24px",
              lineHeight: "28.8px",
              letterSpacing: "-0.48px",
              color: "white",
            }}
          >
            Olá,
            <br />
            {firstName} 👋
          </h1>

          {/* Settings button — Figma: 40x40, icon fill=rgb(241,240,243) */}
          <Link
            href="/configuracoes"
            className="flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              color: "rgb(241,240,243)",
            }}
            aria-label="Configurações"
          >
            <SettingsIcon />
          </Link>
        </header>

        {/* Scrollable content — Figma: pad=16, gap=12 */}
        <div
          className="flex flex-col"
          style={{ padding: "0 16px 16px", gap: "12px" }}
        >
          {/* Financial Card — Figma: "Disponível", balance, Entradas/Saídas */}
          <FinancialCard
            title="Disponível"
            value={balance}
            hidden={balanceHidden}
            layout="summary"
            metrics={[
              { label: "Entradas", value: income },
              { label: "Saídas", value: expense },
            ]}
            supportingInformation="Mês atual"
          />

          {/* Date label — Figma: 14/600, lh=21, fill=rgb(90,83,106) */}
          <p
            className="text-manga-text-secondary font-semibold"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            {getMonthLabel()}
          </p>

          {/* Manga Insights — only shown if there are insights */}
          {insights.length > 0 && (
            <section>
              <h2
                className="text-manga-text-secondary font-semibold"
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                  marginBottom: "12px",
                }}
              >
                Manga Insights
              </h2>
              <div className="flex flex-col" style={{ gap: "8px" }}>
                {insights.map((insight) => (
                  <MangaInsights
                    key={insight.id}
                    title={insight.title}
                    description={insight.description}
                    used={insight.used}
                    limit={insight.limit}
                    showIndicator={
                      !!insight.used && !!insight.limit
                    }
                    action={
                      insight.action
                        ? {
                            label: insight.action.label,
                            href: insight.action.href,
                            showArrow: true,
                          }
                        : undefined
                    }
                    size="compact"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Suas Metas section — Figma: title + "Ver todas" */}
          <section>
            <div
              className="flex items-center justify-between"
              style={{ height: "40px", marginBottom: "12px" }}
            >
              <h2
                className="text-manga-text-secondary font-semibold"
                style={{ fontSize: "14px", lineHeight: "21px" }}
              >
                Suas Metas
              </h2>
              {goals.length > 0 && (
                <Link href="/metas">
                  <Button
                    variant="tertiary"
                    size="small"
                    trailingIcon={<ArrowForwardIcon />}
                  >
                    Ver todas
                  </Button>
                </Link>
              )}
            </div>

            {goals.length === 0 ? (
              <EmptyState
                title="Nenhuma meta ainda"
                description="Crie sua primeira meta e comece a separar dinheiro com propósito."
                size="compact"
              />
            ) : (
              <div className="flex flex-col" style={{ gap: "12px" }}>
                {goals.map((g) => (
                  <GoalCard
                    key={g.id}
                    title={g.title}
                    value={g.value}
                    target={g.target}
                    hidden={balanceHidden}
                    identity={{
                      color: g.color,
                      icon: g.icon as GoalIconName | undefined,
                      content: g.contentType,
                    }}
                    supportingInformation={`Faltam ${formatCurrency(g.target - g.value)}`}
                    variant="elevated"
                    href={`/metas/${g.id}`}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Categorias section — Figma: title + "Ver todas" + CategoryItems */}
          {categorySpending.length > 0 && (
            <section>
              <div
                className="flex items-center justify-between"
                style={{ height: "40px", marginBottom: "12px" }}
              >
                <h2
                  className="text-manga-text-secondary font-semibold"
                  style={{ fontSize: "14px", lineHeight: "21px" }}
                >
                  Categorias
                </h2>
                <Link href="/categorias">
                  <Button
                    variant="tertiary"
                    size="small"
                    trailingIcon={<ArrowForwardIcon />}
                  >
                    Ver todas
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col" style={{ gap: "12px" }}>
                {categorySpending.slice(0, 3).map((cat) => (
                  <CategoryItem
                    key={cat.category_id}
                    title={cat.category_name}
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
                    hidden={balanceHidden}
                    variant="surface"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
