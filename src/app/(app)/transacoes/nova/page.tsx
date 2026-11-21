import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NewTransactionForm } from "./new-transaction-form";

export default async function NewTransactionPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, icon")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("sort_order");

  return <NewTransactionForm categories={categories ?? []} />;
}
