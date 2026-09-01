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
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-mango-cream">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-mango-night">Manga</h1>
          <a
            href="/dashboard"
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            Voltar ao inicio
          </a>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
          Meu perfil
        </h2>
        <ProfileForm profile={profile} userEmail={user.email ?? ""} />
      </main>
    </div>
  );
}
