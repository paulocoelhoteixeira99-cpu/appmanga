"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mango-cream px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mango-night">Manga</h1>
          <p className="text-neutral-600 mt-2">
            Seu parceiro financeiro de todo dia.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
          />

          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Sua senha"
          />

          {error && <p className="text-error-500 text-sm">{error}</p>}

          <Button type="submit" loading={loading} fullWidth>
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-600 mt-6">
          Nao tem conta?{" "}
          <Link
            href="/signup"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
