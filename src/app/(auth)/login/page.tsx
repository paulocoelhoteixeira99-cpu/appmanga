"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import { Divider } from "@matsborges/manga-design-system/divider";

type View = "welcome" | "login";

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

  // E02 · Boas-vindas
  if (view === "welcome") {
    return (
      <div className="min-h-screen bg-manga-background-default flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[312px] flex flex-col items-center text-center">
          <div className="mb-10">
            <Image
              src="/assets/logo-gradient.svg"
              alt="Manga"
              width={100}
              height={112}
              priority
              className="mx-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-manga-text-primary mb-3 leading-tight">
            Seu dinheiro,{"\n"}com mais clareza.
          </h1>
          <p className="text-manga-text-secondary mb-10">
            Organize seus registros e acompanhe o que esta disponivel para suas
            escolhas.
          </p>

          <div className="w-full space-y-3">
            <Link href="/signup">
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
      </div>
    );
  }

  // E03 · Login
  return (
    <div className="min-h-screen bg-manga-background-default flex flex-col px-6">
      {/* Header com voltar */}
      <div className="pt-4">
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

      {/* Conteudo */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full max-w-[312px] mx-auto">
          <h1 className="text-2xl font-bold text-manga-text-primary mb-8">
            Entrar no Manga
          </h1>

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

            <Button type="submit" loading={loading} fullWidth size="large">
              Entrar
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Divider />
            <span className="text-sm text-manga-text-secondary shrink-0">ou</span>
            <Divider />
          </div>

          <Button
            variant="secondary"
            fullWidth
            size="large"
            onClick={handleGoogleLogin}
          >
            Continuar com Google
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 pt-6 text-center">
        <p className="text-sm text-manga-text-secondary">
          Ainda nao tem conta?{" "}
          <Link
            href="/signup"
            className="text-manga-text-brand font-medium"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
