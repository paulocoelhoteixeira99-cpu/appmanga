import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsContent } from "./settings-content";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, phone, cpf")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/home");

  return (
    <SettingsContent
      profile={{
        first_name: profile.first_name ?? "",
        phone: profile.phone ?? null,
        cpf: profile.cpf ?? null,
      }}
      email={user.email ?? ""}
    />
  );
}
