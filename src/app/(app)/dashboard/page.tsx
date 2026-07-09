import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-mango-cream">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-mango-night">Manga</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
          Oi! Que bom ter voce aqui.
        </h2>
        <p className="text-neutral-600">
          O Manga vai te ajudar a entender para onde seu dinheiro vai — e o
          que fazer com isso.
        </p>
      </main>
    </div>
  );
}
