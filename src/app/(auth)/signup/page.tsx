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

    // Check phone availability before signup
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

    // Check CPF availability before signup
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
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Primeiro nome
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Como podemos te chamar?"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              required
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              CPF{" "}
              <span className="text-neutral-400 font-normal">(opcional)</span>
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Minimo 6 caracteres"
            />
          </div>

          {error && <p className="text-error-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>
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
