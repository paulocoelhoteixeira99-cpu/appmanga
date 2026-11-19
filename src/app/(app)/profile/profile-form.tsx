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
        <label className="block text-sm font-semibold text-neutral-900 mb-1">E-mail</label>
        <input
          type="email"
          value={userEmail}
          disabled
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm bg-neutral-100 text-neutral-500"
        />
        <p className="text-xs text-neutral-500 mt-1">O e-mail nao pode ser alterado por aqui.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">Primeiro nome</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">WhatsApp</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          required
          placeholder="(11) 99999-9999"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-neutral-900 mb-1">
          CPF <span className="text-neutral-400 font-normal">(opcional)</span>
        </label>
        <input
          type="text"
          value={
            !showCpf && profile.cpf && cpf === formatCpf(profile.cpf)
              ? maskCpfDisplay(profile.cpf)
              : cpf
          }
          onFocus={() => setShowCpf(true)}
          onBlur={() => setShowCpf(false)}
          onChange={(e) => setCpf(formatCpf(e.target.value))}
          placeholder="000.000.000-00"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        />
      </div>

      {error && <p className="text-error-500 text-sm">{error}</p>}
      {success && (
        <p className="text-success-500 text-sm">Perfil atualizado com sucesso!</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-600 disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar alteracoes"}
      </button>
    </form>
  );
}
