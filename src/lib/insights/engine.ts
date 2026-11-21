export type Insight = {
  id: string;
  priority: "P1" | "P2" | "P3";
  title: string;
  description: string;
  used?: number;
  limit?: number;
  action?: { label: string; href: string };
};

export function computeInsights(data: {
  balance: number;
  income: number;
  expense: number;
  categories: {
    name: string;
    spent: number;
    limit: number | null;
  }[];
  goals: {
    name: string;
    current_value: number;
    target: number;
    status: string;
  }[];
}): Insight[] {
  const insights: Insight[] = [];

  // P1: Category over limit (> 100%)
  for (const cat of data.categories) {
    if (cat.limit && cat.spent > cat.limit) {
      insights.push({
        id: `cat-over-${cat.name}`,
        priority: "P1",
        title: `${cat.name} acima do planejado`,
        description: `Você ultrapassou o limite planejado para esta categoria.`,
        used: cat.spent,
        limit: cat.limit,
        action: { label: "Ver categoria", href: "/categorias" },
      });
    }
  }

  // P2: Category approaching limit (80-100%)
  for (const cat of data.categories) {
    if (
      cat.limit &&
      cat.spent >= cat.limit * 0.8 &&
      cat.spent <= cat.limit
    ) {
      insights.push({
        id: `cat-attention-${cat.name}`,
        priority: "P2",
        title: `${cat.name} próximo do planejado`,
        description: `Atenção: você já usou ${Math.round((cat.spent / cat.limit) * 100)}% do planejado.`,
        used: cat.spent,
        limit: cat.limit,
        action: { label: "Ver categoria", href: "/categorias" },
      });
    }
  }

  // P2: Goal with no progress
  for (const goal of data.goals) {
    if (
      goal.status === "active" &&
      goal.current_value === 0 &&
      goal.target > 0
    ) {
      insights.push({
        id: `goal-start-${goal.name}`,
        priority: "P2",
        title: `${goal.name} aguardando primeira reserva`,
        description:
          "Comece a reservar para transformar seu plano em realidade.",
        action: { label: "Ver meta", href: "/metas" },
      });
    }
  }

  // P3: Positive balance
  if (data.income > 0 && data.expense < data.income) {
    insights.push({
      id: "positive-balance",
      priority: "P3",
      title: "Suas contas estão no azul",
      description:
        "Suas entradas superam as saídas este mês. Continue assim!",
    });
  }

  // P2: Negative available balance
  if (data.balance < 0) {
    insights.push({
      id: "negative-balance",
      priority: "P1",
      title: "Disponível negativo",
      description:
        "Suas saídas e reservas superaram suas entradas. Revise seus gastos.",
      action: { label: "Ver transações", href: "/transacoes" },
    });
  }

  // Sort by priority, return max 3
  const priorityOrder = { P1: 0, P2: 1, P3: 2 };
  insights.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
  return insights.slice(0, 3);
}
