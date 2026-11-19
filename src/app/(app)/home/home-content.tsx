"use client";

import { useState } from "react";
import Link from "next/link";
import { BalanceCard } from "@matsborges/manga-design-system/balance-card";
import { FinancialCard } from "@matsborges/manga-design-system/financial-card";
import { GoalCard } from "@matsborges/manga-design-system/goal-card";
import { MangaInsights } from "@matsborges/manga-design-system/manga-insights";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { Divider } from "@matsborges/manga-design-system/divider";
import { formatCurrency } from "@/lib/utils/masks";
import type { GoalIconName } from "@matsborges/manga-design-system/product";
import type { GoalColor } from "@matsborges/manga-design-system/product";

type GoalData = {
  id: string;
  title: string;
  value: number;
  target: number;
  color: GoalColor;
  icon?: string;
  contentType: "initials" | "icon" | "image";
};

type InsightData = {
  title: string;
  description: string;
  used: number;
  limit: number;
} | null;

type HomeContentProps = {
  firstName: string;
  balance: number;
  income: number;
  expense: number;
  goals: GoalData[];
  insight: InsightData;
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia,";
  if (hour < 18) return "Boa tarde,";
  return "Boa noite,";
}

export function HomeContent({
  firstName,
  balance,
  income,
  expense,
  goals,
  insight,
}: HomeContentProps) {
  const [balanceHidden, setBalanceHidden] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-manga-text-secondary">{getGreeting()}</p>
          <h1 className="text-xl font-bold text-manga-text-primary">
            {firstName}
          </h1>
        </div>
        <Link
          href="/profile"
          className="p-2 rounded-full hover:bg-manga-background-subtle transition-colors"
          aria-label="Configuracoes"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-manga-text-secondary"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 space-y-6 pb-8">
        {/* Contexto financeiro */}
        <section aria-labelledby="financial-context">
          <h2 id="financial-context" className="sr-only">
            Contexto financeiro
          </h2>

          <BalanceCard
            title="Disponivel"
            value={balance}
            hidden={balanceHidden}
            variant="brand"
            action={
              <button
                type="button"
                onClick={() => setBalanceHidden((h) => !h)}
                className="text-xs text-manga-text-secondary underline"
              >
                {balanceHidden ? "Mostrar" : "Ocultar"}
              </button>
            }
          />

          <div className="mt-3">
            <FinancialCard
              title="Resumo do mes"
              layout="summary"
              hidden={balanceHidden}
              metrics={[
                { label: "Entradas", value: income },
                { label: "Saidas", value: expense },
              ]}
            />
          </div>
        </section>

        <Divider />

        {/* Manga Insights */}
        {insight && (
          <>
            <section aria-labelledby="insights-heading">
              <h2
                id="insights-heading"
                className="text-lg font-semibold text-manga-text-primary mb-3"
              >
                Manga Insights
              </h2>
              <MangaInsights
                title={insight.title}
                description={insight.description}
                signature="Manga"
                showIcon
                showIndicator
                used={insight.used}
                limit={insight.limit}
                showPercentage
                action={{
                  label: "Ver categoria",
                  showArrow: true,
                }}
              />
            </section>

            <Divider />
          </>
        )}

        {/* Metas */}
        <section aria-labelledby="goals-heading">
          <div className="flex items-center justify-between mb-3">
            <h2
              id="goals-heading"
              className="text-lg font-semibold text-manga-text-primary"
            >
              Suas metas
            </h2>
            {goals.length > 0 && (
              <Link
                href="/metas"
                className="text-sm font-medium text-manga-text-brand"
              >
                Ver todas
              </Link>
            )}
          </div>

          {goals.length === 0 ? (
            <EmptyState
              title="Nenhuma meta ainda"
              description="Crie sua primeira meta e comece a separar dinheiro com proposito."
              size="compact"
              primaryAction={{
                label: "Criar meta",
                onClick: () => {
                  // TODO: navegar para criacao de meta
                },
              }}
            />
          ) : (
            <div className="space-y-3">
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
                  supportingInformation={`${formatCurrency(g.target - g.value)} restantes`}
                  variant="elevated"
                  href={`/metas/${g.id}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
