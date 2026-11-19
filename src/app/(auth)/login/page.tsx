"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";

type View = "welcome" | "login";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

export default function LoginPage() {
  const [view, setView] = useState<View>("welcome");
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
      setError("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError("Erro ao conectar com Google. Tente novamente.");
    }
  }

  // ========== E02 · Boas-vindas ==========
  if (view === "welcome") {
    return (
      <div className="min-h-screen bg-manga-background-default flex flex-col px-6">
        {/* Logo — upper area */}
        <div className="flex-1 flex flex-col justify-center items-center pt-16">
          <Image
            src="/assets/logo-gradient.svg"
            alt="Manga"
            width={100}
            height={112}
            priority
          />
        </div>

        {/* Text — left-aligned */}
        <div className="mb-auto">
          <h1 className="text-[28px] font-bold text-manga-text-primary leading-tight mb-4">
            Seu dinheiro,{"\n"}com mais clareza.
          </h1>
          <p className="text-base text-manga-text-secondary leading-relaxed">
            Organize seus registros e acompanhe o que esta disponivel para suas
            escolhas.
          </p>
        </div>

        {/* Buttons — pinned to bottom */}
        <div className="space-y-3 pb-8 pt-10">
          <Link href="/onboarding">
            <Button fullWidth size="large">
              Criar conta
            </Button>
          </Link>
          <Button
            variant="secondary"
            fullWidth
            size="large"
            onClick={() => setView("login")}
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }

  // ========== E03 · Login ==========
  return (
    <div className="min-h-screen bg-manga-background-default flex flex-col px-6">
      {/* Back button — top left */}
      <div className="pt-3">
        <button
          type="button"
          onClick={() => {
            setView("welcome");
            setError(null);
          }}
          className="p-2 -ml-2 text-manga-text-secondary hover:text-manga-text-primary transition-colors"
          aria-label="Voltar"
        >
          <ArrowBackIcon />
        </button>
      </div>

      {/* Content — top-aligned */}
      <div className="w-full max-w-[328px] mx-auto pt-4">
        <h1 className="text-[28px] font-bold text-manga-text-primary mb-8">
          Entrar no Manga
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Seu e-mail"
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

          <Button type="submit" loading={loading} fullWidth size="large">
            Entrar
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-manga-background-subtle" />
          <span className="text-sm text-manga-text-secondary">ou</span>
          <div className="flex-1 h-px bg-manga-background-subtle" />
        </div>

        <Button
          variant="secondary"
          fullWidth
          size="large"
          onClick={handleGoogleLogin}
          leadingIcon={<GoogleIcon />}
        >
          Continuar com Google
        </Button>
      </div>

      {/* Footer — pinned to bottom */}
      <div className="mt-auto pb-8 pt-6 text-center">
        <p className="text-sm text-manga-text-secondary">
          Ainda nao tem conta?{" "}
          <Link href="/onboarding" className="text-manga-text-brand font-medium">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
