import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CreateGoalForm } from "./create-goal-form";

export default async function CreateGoalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <CreateGoalForm />;
}
