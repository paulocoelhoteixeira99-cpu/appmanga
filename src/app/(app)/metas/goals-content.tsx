"use client";

import { useState } from "react";
import Link from "next/link";
import { GoalCard } from "@matsborges/manga-design-system/goal-card";
import { EmptyState } from "@matsborges/manga-design-system/empty-state";
import { Button } from "@matsborges/manga-design-system/button";
import { formatCurrency } from "@/lib/utils/masks";
import type { GoalColor, GoalIconName } from "@matsborges/manga-design-system/product";

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

export function GoalsContent({
  goals,
  availableBalance,
}: {
  goals: Goal[];
  availableBalance: number;
}) {
  const [showCompleted, setShowCompleted] = useState(false);

  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");
  const totalInGoals = goals
    .filter((g) => g.status === "active")
    .reduce((sum, g) => sum + g.current_value, 0);

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
            Metas
          </h1>
          {activeGoals.length > 0 && (
            <p
              className="text-manga-text-secondary"
              style={{
                fontSize: "14px",
                lineHeight: "21px",
                marginTop: "4px",
              }}
            >
              {formatCurrency(totalInGoals)} reservados em{" "}
              {activeGoals.length}{" "}
              {activeGoals.length === 1 ? "meta" : "metas"}
            </p>
          )}
        </div>

        {/* Active goals */}
        {activeGoals.length === 0 && completedGoals.length === 0 ? (
          <EmptyState
            title="Transforme um objetivo em um plano"
            description="Crie sua primeira meta e comece a separar dinheiro com propósito."
            size="compact"
          />
        ) : (
          <div
            className="flex flex-col"
            style={{ gap: "12px" }}
          >
            {activeGoals.map((g) => (
              <GoalCard
                key={g.id}
                title={g.name}
                value={g.current_value}
                target={g.target}
                identity={{
                  color: g.color as GoalColor,
                  icon: g.icon as GoalIconName | undefined,
                  content: g.content_type as
                    | "initials"
                    | "icon"
                    | "image",
                }}
                supportingInformation={`Faltam ${formatCurrency(g.target - g.current_value)}`}
                variant="elevated"
                href={`/metas/${g.id}`}
              />
            ))}
          </div>
        )}

        {/* Completed goals */}
        {completedGoals.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setShowCompleted(!showCompleted)}
              className="font-semibold text-manga-text-secondary"
              style={{
                fontSize: "14px",
                lineHeight: "21px",
                padding: "8px 0",
              }}
            >
              Metas concluídas ({completedGoals.length}){" "}
              {showCompleted ? "\u25B2" : "\u25BC"}
            </button>
            {showCompleted && (
              <div
                className="flex flex-col"
                style={{ gap: "12px", marginTop: "8px" }}
              >
                {completedGoals.map((g) => (
                  <GoalCard
                    key={g.id}
                    title={g.name}
                    value={g.current_value}
                    target={g.target}
                    identity={{
                      color: g.color as GoalColor,
                      icon: g.icon as GoalIconName | undefined,
                      content: g.content_type as
                        | "initials"
                        | "icon"
                        | "image",
                    }}
                    status="completed"
                    supportingInformation="Meta concluída"
                    variant="elevated"
                    href={`/metas/${g.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Create goal button */}
        <div style={{ paddingTop: "8px" }}>
          <Link href="/metas/nova">
            <Button fullWidth size="large" variant="secondary">
              Criar Meta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
