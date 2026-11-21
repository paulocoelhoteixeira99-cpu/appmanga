import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TransactionDetail } from "./transaction-detail";

export default async function TransactionDetailPage({
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

  const [txResult, catResult] = await Promise.all([
    supabase
      .from("transactions")
      .select(
        "id, type, amount, description, date, category_id, created_at, updated_at"
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("categories")
      .select("id, name, icon")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("sort_order"),
  ]);

  if (!txResult.data) notFound();

  return (
    <TransactionDetail
      transaction={txResult.data}
      categories={catResult.data ?? []}
    />
  );
}
