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
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
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

  /*
   * =============================================
   * E02 · Boas-vindas
   * Figma: 360×800, node 158:1550
   *
   * Layout (posicoes absolutas do Figma):
   *   Logo:       y=136, centralizado, wordmark 180×41, gap=143 (compensado)
   *   Titulo:     y=320, x=24, 312×76,  Inter 32/600/38.4/-0.64
   *   Subtitulo:  y=432, x=24, 312×48,  Inter 16/400/24
   *   Criar btn:  y=632, x=24, 312×48
   *   Entrar btn: y=696, x=24, 312×48
   *
   * Gaps calculados:
   *   top→logo=136, logo→titulo=143 (wordmark), titulo→sub=36
   *   sub→btn1=152(flex), btn1→btn2=16, btn2→bottom=56
   * =============================================
   */
  if (view === "welcome") {
    return (
      <div
        className="bg-manga-background-default flex flex-col"
        style={{ minHeight: "100dvh", padding: "0 24px" }}
      >
        {/* Spacer superior — empurra logo+texto para a posicao correta */}
        <div className="flex-1" style={{ minHeight: "136px" }} />

        {/* Logo — wordmark centralizado, gap compensado (symbol era 112px, wordmark é 41px) */}
        <div className="flex justify-center" style={{ marginBottom: "143px" }}>
          <Image
            src="/assets/logo-gradient.svg"
            alt="Manga"
            width={180}
            height={41}
            priority
          />
        </div>

        {/* Titulo — Inter 32/600, lh=38.4, ls=-0.64, centralizado */}
        <h1
          className="font-semibold text-manga-text-primary text-center"
          style={{
            fontSize: "32px",
            lineHeight: "38.4px",
            letterSpacing: "-0.64px",
          }}
        >
          Seu dinheiro,
          <br />
          com mais clareza.
        </h1>

        {/* Subtitulo — Inter 16/400, lh=24, centralizado */}
        <p
          className="text-manga-text-secondary text-center"
          style={{
            marginTop: "36px",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          Organize seus registros e acompanhe o que está disponível para suas
          escolhas.
        </p>

        {/* Spacer inferior — empurra botoes para o rodape */}
        <div className="flex-1" style={{ minHeight: "40px" }} />

        {/* Botoes — gap=16px, padding-bottom=56px */}
        <div
          className="flex flex-col"
          style={{ gap: "16px", paddingBottom: "56px" }}
        >
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

  /*
   * =============================================
   * E03 · Login
   * Figma: 360×800, node 158:1559
   *
   * Layout:
   *   Back btn:  pos=(16,32) 40×40, icon 24×24, fill=rgb(35,26,56)
   *   Content:   pos=(24,112) VERTICAL gap=32
   *     Titulo:  312×38, Inter 32/600/38.4/-0.64
   *     Creds:   VERTICAL gap=16 (Email 69 + Senha 69 + Btn 48)
   *     Google:  VERTICAL gap=16 ("ou" 21 center + Btn 48)
   *   Footer:    pos=(24,696) 312×48, text center, Inter 14/400/21
   *
   * Gaps:
   *   top→back=32, back(72)→content=40 (total 112)
   *   titulo→creds=32, email→senha=16, senha→btn=16
   *   creds→google=32, ou→btn=16
   *   footer at bottom, pb=56
   * =============================================
   */
  return (
    <div
      className="bg-manga-background-default flex flex-col"
      style={{ minHeight: "100dvh", padding: "0 24px" }}
    >
      {/* Back button — Figma: pos=(16,32) 40×40 */}
      <div style={{ paddingTop: "32px", marginLeft: "-8px" }}>
        <button
          type="button"
          onClick={() => {
            setView("welcome");
            setError(null);
          }}
          className="flex items-center justify-center text-manga-text-primary"
          style={{ width: "40px", height: "40px" }}
          aria-label="Voltar"
        >
          <ArrowBackIcon />
        </button>
      </div>

      {/* Content — Figma: pos=(24,112), VERTICAL, gap=32 */}
      <div
        className="flex flex-col"
        style={{ paddingTop: "40px", gap: "32px" }}
      >
        {/* Titulo — Figma: Inter 32/600, lh=38.4, ls=-0.64 */}
        <h1
          className="font-semibold text-manga-text-primary"
          style={{
            fontSize: "32px",
            lineHeight: "38.4px",
            letterSpacing: "-0.64px",
          }}
        >
          Entrar no Manga
        </h1>

        {/* Credenciais — Figma: VERTICAL gap=16 */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col"
          style={{ gap: "16px" }}
        >
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

          {error && (
            <p
              className="text-manga-text-primary"
              style={{ fontSize: "14px", lineHeight: "21px", color: "#7F1D1D" }}
            >
              {error}
            </p>
          )}

          <Button type="submit" loading={loading} fullWidth size="large">
            Entrar
          </Button>
        </form>

        {/* Acesso com Google — Figma: VERTICAL gap=16 */}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          {/* "ou" — Figma: Inter 14/400, lh=21, center, fill=rgb(90,82,105) */}
          <p
            className="text-manga-text-secondary text-center"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            ou
          </p>

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

      {/* Footer — Figma: pos=(24,696) 312×48, text center, Inter 14/400/21 */}
      <div
        className="mt-auto flex items-center justify-center"
        style={{ height: "48px", marginBottom: "56px" }}
      >
        <p
          className="text-manga-text-secondary text-center"
          style={{ fontSize: "14px", lineHeight: "21px" }}
        >
          Ainda não tem conta?{" "}
          <Link
            href="/onboarding"
            className="text-manga-text-link font-medium"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
