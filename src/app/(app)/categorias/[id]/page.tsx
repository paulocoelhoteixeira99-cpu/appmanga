import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CategoryDetail } from "./category-detail";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [catResult, txResult, spendingResult] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, icon, monthly_limit")
      .eq("id", id)
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("transactions")
      .select("id, amount, description, date, type")
      .eq("category_id", id)
      .eq("user_id", user.id)
      .eq("type", "expense")
      .order("date", { ascending: false })
      .limit(50),
    supabase.rpc("get_category_spending", {
      target_user_id: user.id,
    }),
  ]);

  if (!catResult.data) notFound();

  const spending =
    (spendingResult.data as {
      category_id: string;
      spent: number;
    }[]) ?? [];
  const catSpending =
    spending.find((s) => s.category_id === id)?.spent ?? 0;

  return (
    <CategoryDetail
      category={catResult.data}
      transactions={txResult.data ?? []}
      spent={catSpending}
    />
  );
}
