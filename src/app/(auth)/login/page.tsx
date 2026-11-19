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
        {/* Logo — upper area, vertically centered in top portion */}
        <div className="flex items-center justify-center" style={{ paddingTop: "136px", paddingBottom: "72px" }}>
          <Image
            src="/assets/logo-symbol.svg"
            alt="Manga"
            width={100}
            height={112}
            priority
          />
        </div>

        {/* Text — left-aligned */}
        <h1
          className="text-[32px] font-semibold text-manga-text-primary"
          style={{ lineHeight: "38.4px", letterSpacing: "-0.64px" }}
        >
          Seu dinheiro,<br />com mais clareza.
        </h1>
        <p
          className="text-base text-manga-text-secondary"
          style={{ marginTop: "36px", lineHeight: "24px" }}
        >
          Organize seus registros e acompanhe o que está disponível para suas
          escolhas.
        </p>

        {/* Spacer — pushes buttons to bottom */}
        <div className="flex-1" />

        {/* Buttons — pinned to bottom */}
        <div className="flex flex-col" style={{ gap: "16px", paddingBottom: "56px" }}>
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
      {/* Back button — top left, y=32 x=16 in Figma (px-6=24, so -ml-2 to get 16) */}
      <div style={{ paddingTop: "32px" }}>
        <button
          type="button"
          onClick={() => {
            setView("welcome");
            setError(null);
          }}
          className="flex items-center justify-center text-manga-text-secondary hover:text-manga-text-primary transition-colors"
          style={{ width: "40px", height: "40px", marginLeft: "-8px" }}
          aria-label="Voltar"
        >
          <ArrowBackIcon />
        </button>
      </div>

      {/* Content — top-aligned */}
      <div style={{ paddingTop: "40px" }}>
        <h1
          className="text-[32px] font-semibold text-manga-text-primary"
          style={{ lineHeight: "38.4px", letterSpacing: "-0.64px" }}
        >
          Entrar no Manga
        </h1>

        <form onSubmit={handleLogin} style={{ marginTop: "32px" }} className="flex flex-col">
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Seu e-mail"
          />

          <div style={{ marginTop: "16px" }}>
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Sua senha"
            />
          </div>

          {error && <p className="text-error-500 text-sm mt-2">{error}</p>}

          <div style={{ marginTop: "16px" }}>
            <Button type="submit" loading={loading} fullWidth size="large">
              Entrar
            </Button>
          </div>
        </form>

        {/* "ou" separator — simple centered text, no lines */}
        <p
          className="text-sm text-manga-text-secondary text-center"
          style={{ marginTop: "32px", lineHeight: "21px" }}
        >
          ou
        </p>

        <div style={{ marginTop: "16px" }}>
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
      </div>

      {/* Footer — pinned to bottom */}
      <div className="mt-auto text-center" style={{ paddingBottom: "56px", paddingTop: "24px" }}>
        <p className="text-sm text-manga-text-secondary" style={{ lineHeight: "21px" }}>
          Ainda não tem conta?{" "}
          <Link href="/onboarding" className="text-manga-text-brand font-medium">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
