import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CategoriesContent } from "./categories-content";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [spendingResult, categoriesResult] = await Promise.all([
    supabase.rpc("get_category_spending", {
      target_user_id: user.id,
    }),
    supabase
      .from("categories")
      .select("id, name, icon, monthly_limit, is_active, sort_order")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("sort_order"),
  ]);

  const spending =
    (spendingResult.data as {
      category_id: string;
      category_name: string;
      icon: string | null;
      monthly_limit: number | null;
      spent: number;
    }[]) ?? [];

  // Merge category data with spending
  const categories = (categoriesResult.data ?? []).map((cat) => {
    const sp = spending.find((s) => s.category_id === cat.id);
    return {
      ...cat,
      spent: sp?.spent ?? 0,
    };
  });

  const totalSpent = spending.reduce((sum, s) => sum + s.spent, 0);

  return (
    <CategoriesContent
      categories={categories}
      totalSpent={totalSpent}
    />
  );
}
