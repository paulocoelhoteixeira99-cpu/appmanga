"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import {
  formatPhone,
  phoneToDigits,
  formatCpf,
  cpfToDigits,
  isValidCpf,
} from "@/lib/utils/masks";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ArrowBackIcon, CheckCircleIcon } from "@matsborges/manga-design-system/icons";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const phoneDigits = phoneToDigits(phone);

    if (phoneDigits.length !== 11) {
      setError("Telefone deve ter 11 digitos (DDD + numero).");
      setLoading(false);
      return;
    }

    const cpfDigits = cpfToDigits(cpf);
    if (cpfDigits && !isValidCpf(cpfDigits)) {
      setError("CPF invalido.");
      setLoading(false);
      return;
    }

    const { data: phoneAvailable, error: rpcError } = await supabase.rpc(
      "is_phone_available",
      { phone_number: phoneDigits }
    );

    if (rpcError) {
      setError("Erro ao verificar telefone. Tente novamente.");
      setLoading(false);
      return;
    }

    if (!phoneAvailable) {
      setError("Este numero de WhatsApp ja esta vinculado a outra conta.");
      setLoading(false);
      return;
    }

    if (cpfDigits) {
      const { data: cpfAvailable, error: cpfRpcError } = await supabase.rpc(
        "is_cpf_available",
        { cpf_number: cpfDigits }
      );

      if (cpfRpcError) {
        setError("Erro ao verificar CPF. Tente novamente.");
        setLoading(false);
        return;
      }

      if (!cpfAvailable) {
        setError("Este CPF ja esta vinculado a outra conta.");
        setLoading(false);
        return;
      }
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName.trim(),
          phone: phoneDigits,
          cpf: cpfDigits || null,
        },
      },
    });

    if (signUpError) {
      if (signUpError.message.includes("profiles_phone_unique")) {
        setError("Este numero de WhatsApp ja esta vinculado a outra conta.");
      } else if (signUpError.message.includes("idx_profiles_cpf_unique")) {
        setError("Este CPF ja esta vinculado a outra conta.");
      } else {
        setError(signUpError.message);
      }
    } else {
      setSuccess(true);
    }
    setLoading(false);
  }

  // Tela de sucesso
  if (success) {
    return (
      <div className="min-h-screen bg-manga-background-default flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[312px] text-center">
          <div className="mb-6 flex justify-center text-manga-text-brand">
            <CheckCircleIcon />
          </div>
          <h2 className="text-xl font-bold text-manga-text-primary mb-3">
            Verifique seu e-mail
          </h2>
          <p className="text-manga-text-secondary mb-8">
            Enviamos um link de confirmacao para{" "}
            <strong className="text-manga-text-primary">{email}</strong>. Clique
            no link para ativar sua conta.
          </p>
          <Link href="/login">
            <Button variant="secondary" fullWidth size="large">
              Voltar para login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Formulario de cadastro
  return (
    <div className="min-h-screen bg-manga-background-default flex flex-col px-6">
      {/* Header */}
      <div className="pt-4 flex items-center gap-3">
        <Link
          href="/login"
          className="p-2 -ml-2 text-manga-text-secondary hover:text-manga-text-primary transition-colors"
          aria-label="Voltar"
        >
          <ArrowBackIcon />
        </Link>
      </div>

      {/* Conteudo */}
      <div className="flex-1 flex flex-col justify-center py-6">
        <div className="w-full max-w-[312px] mx-auto">
          <div className="flex justify-center mb-6">
            <Image
              src="/assets/logo-gradient.svg"
              alt="Manga"
              width={60}
              height={67}
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-manga-text-primary mb-2 text-center">
            Criar sua conta
          </h1>
          <p className="text-manga-text-secondary mb-8 text-center">
            Preencha seus dados para comecar.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <TextField
              label="Primeiro nome"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Como podemos te chamar?"
            />

            <TextField
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />

            <TextField
              label="WhatsApp"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              required
              placeholder="(11) 99999-9999"
            />

            <TextField
              label="CPF (opcional)"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
            />

            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Minimo 6 caracteres"
            />

            {error && <p className="text-error-500 text-sm">{error}</p>}

            <Button type="submit" loading={loading} fullWidth size="large">
              Criar conta
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 text-center">
        <p className="text-sm text-manga-text-secondary">
          Ja tem conta?{" "}
          <Link
            href="/login"
            className="text-manga-text-brand font-medium"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
