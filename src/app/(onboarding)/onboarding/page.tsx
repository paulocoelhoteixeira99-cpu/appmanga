import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "./onboarding-wizard";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Nao autenticado → comeca pelo step de criacao de conta
  if (!user) {
    return <OnboardingWizard startStep="account" />;
  }

  // Ja completou onboarding → vai pra home
  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_completed_at, first_name, phone")
    .eq("id", user.id)
    .single();

  if (profile?.onboarding_completed_at) {
    redirect("/home");
  }

  // Autenticado mas sem dados pessoais → comeca pela identificacao
  if (!profile?.first_name || !profile?.phone) {
    return <OnboardingWizard startStep="identification" />;
  }

  // Autenticado com dados pessoais → comeca pela intro financeira
  return <OnboardingWizard startStep="intro" />;
}
