"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  formatPhone,
  phoneToDigits,
  formatCpf,
  cpfToDigits,
  isValidCpf,
} from "@/lib/utils/masks";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";

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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mango-cream px-4">
        <div className="w-full max-w-sm text-center">
          <div className="bg-success-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">
              Verifique seu e-mail
            </h2>
            <p className="text-neutral-600">
              Enviamos um link de confirmacao para{" "}
              <strong>{email}</strong>. Clique no link para ativar sua
              conta.
            </p>
          </div>
          <Link
            href="/login"
            className="text-primary-500 hover:text-primary-600 text-sm mt-4 inline-block"
          >
            Voltar para login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mango-cream px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-mango-night">Manga</h1>
          <p className="text-neutral-600 mt-2">
            Crie sua conta e comece a cuidar do seu dinheiro.
          </p>
        </div>

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

          <Button type="submit" loading={loading} fullWidth>
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-neutral-600 mt-6">
          Ja tem conta?{" "}
          <Link
            href="/login"
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
