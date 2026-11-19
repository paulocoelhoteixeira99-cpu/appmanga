import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { HomeContent } from "./home-content";

type Goal = {
  id: string;
  name: string;
  current_value: number;
  target: number;
  color: string;
  icon: string | null;
  content_type: string;
  status: string;
};

type CategorySpending = {
  category_id: string;
  category_name: string;
  icon: string | null;
  monthly_limit: number | null;
  spent: number;
};

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, onboarding_completed_at")
    .eq("id", user.id)
    .single();

  if (!profile?.onboarding_completed_at) {
    redirect("/onboarding");
  }

  // Buscar dados em paralelo
  const [balanceResult, summaryResult, goalsResult, spendingResult] =
    await Promise.all([
      supabase.rpc("get_available_balance", { target_user_id: user.id }),
      supabase.rpc("get_monthly_summary", { target_user_id: user.id }),
      supabase
        .from("goals")
        .select("id, name, current_value, target, color, icon, content_type, status")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(3),
      supabase.rpc("get_category_spending", { target_user_id: user.id }),
    ]);

  const balance = (balanceResult.data as number) ?? 0;
  const summary = (summaryResult.data as { income: number; expense: number; balance: number }[] | null)?.[0] ?? {
    income: 0,
    expense: 0,
    balance: 0,
  };
  const goals = (goalsResult.data as Goal[]) ?? [];
  const categorySpending = (spendingResult.data as CategorySpending[]) ?? [];

  // Encontrar categoria com maior % de limite gasto para insight
  const insightCategory = categorySpending
    .filter((c) => c.monthly_limit && c.monthly_limit > 0 && c.spent > 0)
    .map((c) => ({
      ...c,
      percentage: c.spent / c.monthly_limit!,
    }))
    .sort((a, b) => b.percentage - a.percentage)[0];

  const insight = insightCategory
    ? {
        title: `Atencao com ${insightCategory.category_name}`,
        description: `Voce ja gastou ${Math.round(insightCategory.percentage * 100)}% do limite em ${insightCategory.category_name} este mes.`,
        used: insightCategory.spent,
        limit: insightCategory.monthly_limit!,
      }
    : null;

  return (
    <HomeContent
      firstName={profile.first_name ?? "Voce"}
      balance={balance}
      income={summary.income}
      expense={summary.expense}
      goals={goals.map((g) => ({
        id: g.id,
        title: g.name,
        value: g.current_value,
        target: g.target,
        color: g.color as "orange" | "blue" | "purple" | "green" | "pink" | "teal" | "yellow" | "red" | "neutral",
        icon: g.icon ?? undefined,
        contentType: g.content_type as "initials" | "icon" | "image",
      }))}
      insight={insight}
    />
  );
}
