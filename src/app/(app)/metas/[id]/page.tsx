import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GoalDetail } from "./goal-detail";

export default async function GoalDetailPage({
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

  const [goalResult, movementsResult, balanceResult] =
    await Promise.all([
      supabase
        .from("goals")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("goal_movements")
        .select("id, type, amount, created_at")
        .eq("goal_id", id)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase.rpc("get_available_balance", {
        target_user_id: user.id,
      }),
    ]);

  if (!goalResult.data) notFound();

  return (
    <GoalDetail
      goal={goalResult.data}
      movements={movementsResult.data ?? []}
      availableBalance={(balanceResult.data as number) ?? 0}
    />
  );
}
