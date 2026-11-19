import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/home");
  }

  return (
    <div className="bg-manga-background-default" style={{ minHeight: "100dvh" }}>
      <header
        className="flex items-center justify-between"
        style={{ padding: "16px" }}
      >
        <h1
          className="font-semibold text-manga-text-primary"
          style={{ fontSize: "20px", lineHeight: "24px" }}
        >
          Meu perfil
        </h1>
        <a
          href="/home"
          className="text-manga-text-link font-medium"
          style={{ fontSize: "14px", lineHeight: "21px" }}
        >
          Voltar
        </a>
      </header>

      <main style={{ padding: "0 16px 32px" }}>
        <ProfileForm profile={profile} userEmail={user.email ?? ""} />
      </main>
    </div>
  );
}
