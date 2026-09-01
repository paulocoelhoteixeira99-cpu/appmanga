"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  formatPhone,
  phoneToDigits,
  formatCpf,
  cpfToDigits,
  isValidCpf,
  maskCpfDisplay,
} from "@/lib/utils/masks";

interface Profile {
  id: string;
  first_name: string;
  phone: string;
  cpf: string | null;
  email: string;
}

export function ProfileForm({
  profile,
  userEmail,
}: {
  profile: Profile;
  userEmail: string;
}) {
  const [firstName, setFirstName] = useState(profile.first_name);
  const [phone, setPhone] = useState(formatPhone(profile.phone));
  const [cpf, setCpf] = useState(
    profile.cpf ? formatCpf(profile.cpf) : ""
  );
  const [showCpf, setShowCpf] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const trimmedName = firstName.trim();
    if (!trimmedName) {
      setError("Nome e obrigatorio.");
      setLoading(false);
      return;
    }

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

    // If CPF changed, check availability
    if (cpfDigits && cpfDigits !== (profile.cpf || "")) {
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

    // If phone changed, check availability
    if (phoneDigits !== profile.phone) {
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
    }

    // Update profiles table
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: trimmedName,
        phone: phoneDigits,
        cpf: cpfDigits || null,
      })
      .eq("id", profile.id);

    if (updateError) {
      if (updateError.message.includes("profiles_phone_unique")) {
        setError("Este numero de WhatsApp ja esta vinculado a outra conta.");
      } else if (updateError.message.includes("idx_profiles_cpf_unique")) {
        setError("Este CPF ja esta vinculado a outra conta.");
      } else {
        setError("Erro ao salvar. Tente novamente.");
      }
      setLoading(false);
      return;
    }

    // Sync metadata to Supabase Auth
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        first_name: trimmedName,
        phone: phoneDigits,
        cpf: cpfDigits || null,
      },
    });

    if (authError) {
      setError("Perfil salvo, mas houve erro ao sincronizar. Tente novamente.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={userEmail}
          disabled
          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-500 cursor-not-allowed"
        />
        <p className="text-xs text-neutral-400 mt-1">
          O e-mail nao pode ser alterado por aqui.
        </p>
      </div>

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
        <div className="relative">
          <input
            id="cpf"
            type="text"
            value={
              !showCpf && profile.cpf && cpf === formatCpf(profile.cpf)
                ? maskCpfDisplay(profile.cpf)
                : cpf
            }
            onFocus={() => setShowCpf(true)}
            onBlur={() => setShowCpf(false)}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="000.000.000-00"
          />
        </div>
      </div>

      {error && <p className="text-error-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">Perfil atualizado com sucesso!</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Salvando..." : "Salvar alteracoes"}
      </button>
    </form>
  );
}
