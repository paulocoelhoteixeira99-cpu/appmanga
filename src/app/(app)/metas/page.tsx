import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GoalsContent } from "./goals-content";

export default async function GoalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [goalsResult, balanceResult] = await Promise.all([
    supabase
      .from("goals")
      .select(
        "id, name, target, current_value, color, icon, content_type, status, created_at"
      )
      .eq("user_id", user.id)
      .in("status", ["active", "completed"])
      .order("created_at", { ascending: false }),
    supabase.rpc("get_available_balance", { target_user_id: user.id }),
  ]);

  return (
    <GoalsContent
      goals={goalsResult.data ?? []}
      availableBalance={(balanceResult.data as number) ?? 0}
    />
  );
}
