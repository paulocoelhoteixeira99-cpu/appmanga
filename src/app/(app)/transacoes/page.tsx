import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TransactionsContent } from "./transactions-content";

export default async function TransactionsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [txResult, summaryResult] = await Promise.all([
    supabase
      .from("transactions")
      .select(
        "id, type, amount, description, date, category_id, created_at, categories(name, icon)"
      )
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.rpc("get_monthly_summary", { target_user_id: user.id }),
  ]);

  const summary = (
    summaryResult.data as
      | { income: number; expense: number; balance: number }[]
      | null
  )?.[0] ?? { income: 0, expense: 0, balance: 0 };

  // Supabase join returns categories as array; normalize to single object
  const transactions = (txResult.data ?? []).map((t) => ({
    ...t,
    categories: Array.isArray(t.categories)
      ? (t.categories[0] as { name: string; icon: string | null } | undefined) ?? null
      : t.categories,
  }));

  return (
    <TransactionsContent
      transactions={transactions}
      income={summary.income}
      expense={summary.expense}
    />
  );
}
