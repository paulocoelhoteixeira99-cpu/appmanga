"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { Dialog } from "@matsborges/manga-design-system/dialog";
import { Divider } from "@matsborges/manga-design-system/divider";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import {
  formatPhone,
  phoneToDigits,
  formatCpf,
  cpfToDigits,
  isValidCpf,
  maskCpfDisplay,
} from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  first_name: string;
  phone: string | null;
  cpf: string | null;
};

export function SettingsContent({
  profile,
  email,
}: {
  profile: Profile;
  email: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  // Profile fields
  const [name, setName] = useState(profile.first_name);
  const [phone, setPhone] = useState(
    profile.phone ? formatPhone(profile.phone) : ""
  );
  const [cpf, setCpf] = useState(
    profile.cpf ? formatCpf(profile.cpf) : ""
  );
  const [showCpf, setShowCpf] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Actions
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSave() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Nome \u00e9 obrigat\u00f3rio.");
      return;
    }

    const phoneDigits = phoneToDigits(phone);
    if (phoneDigits && phoneDigits.length !== 11) {
      setError("Telefone deve ter 11 d\u00edgitos (DDD + n\u00famero).");
      return;
    }

    const cpfDigits = cpfToDigits(cpf);
    if (cpfDigits && !isValidCpf(cpfDigits)) {
      setError("CPF inv\u00e1lido.");
      return;
    }

    setSaving(true);
    setError(null);
    setSaved(false);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Check phone uniqueness
    if (phoneDigits && phoneDigits !== (profile.phone || "")) {
      const { data: phoneAvailable, error: rpcError } =
        await supabase.rpc("is_phone_available", {
          phone_number: phoneDigits,
        });
      if (rpcError) {
        setError("Erro ao verificar telefone. Tente novamente.");
        setSaving(false);
        return;
      }
      if (!phoneAvailable) {
        setError(
          "Este n\u00famero de WhatsApp j\u00e1 est\u00e1 vinculado a outra conta."
        );
        setSaving(false);
        return;
      }
    }

    // Check CPF uniqueness
    if (cpfDigits && cpfDigits !== (profile.cpf || "")) {
      const { data: cpfAvailable, error: cpfRpcError } =
        await supabase.rpc("is_cpf_available", {
          cpf_number: cpfDigits,
        });
      if (cpfRpcError) {
        setError("Erro ao verificar CPF. Tente novamente.");
        setSaving(false);
        return;
      }
      if (!cpfAvailable) {
        setError(
          "Este CPF j\u00e1 est\u00e1 vinculado a outra conta."
        );
        setSaving(false);
        return;
      }
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        first_name: trimmedName,
        phone: phoneDigits || null,
        cpf: cpfDigits || null,
      })
      .eq("id", user.id);

    if (updateError) {
      if (updateError.message.includes("profiles_phone_unique")) {
        setError(
          "Este n\u00famero de WhatsApp j\u00e1 est\u00e1 vinculado a outra conta."
        );
      } else if (
        updateError.message.includes("idx_profiles_cpf_unique")
      ) {
        setError(
          "Este CPF j\u00e1 est\u00e1 vinculado a outra conta."
        );
      } else {
        setError("Erro ao salvar. Tente novamente.");
      }
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  async function handleLogout() {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div
      className="flex flex-col bg-manga-background-default"
      style={{ minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="shrink-0" style={{ height: "24px" }} />
      <div
        className="shrink-0 flex items-center"
        style={{ height: "56px", padding: "0 4px", gap: "4px" }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center text-manga-text-primary"
          style={{ width: "48px", height: "48px" }}
          aria-label="Voltar"
        >
          <ArrowBackIcon />
        </button>
        <h1
          className="font-semibold text-manga-text-primary"
          style={{ fontSize: "20px", lineHeight: "24px" }}
        >
          Configura\u00e7\u00f5es
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Account section */}
        <section>
          <h2
            className="font-semibold text-manga-text-secondary"
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Conta e dados
          </h2>
          <div
            className="flex flex-col"
            style={{ gap: "16px" }}
          >
            <TextField
              label="Nome"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false);
                setError(null);
              }}
            />

            <TextField
              label="E-mail"
              type="email"
              value={email}
              readOnly
              disabled
              helperText="O e-mail n\u00e3o pode ser alterado por aqui."
            />

            <TextField
              label="WhatsApp"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(formatPhone(e.target.value));
                setSaved(false);
                setError(null);
              }}
              placeholder="(11) 99999-9999"
            />

            <TextField
              label="CPF (opcional)"
              type="text"
              value={
                !showCpf &&
                profile.cpf &&
                cpf === formatCpf(profile.cpf)
                  ? maskCpfDisplay(profile.cpf)
                  : cpf
              }
              onFocus={() => setShowCpf(true)}
              onBlur={() => setShowCpf(false)}
              onChange={(e) => {
                setCpf(formatCpf(e.target.value));
                setSaved(false);
                setError(null);
              }}
              placeholder="000.000.000-00"
            />

            {error && (
              <p
                className="text-manga-text-error"
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                {error}
              </p>
            )}
            {saved && (
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "rgb(15,83,37)",
                }}
              >
                Perfil atualizado com sucesso!
              </p>
            )}

            <Button
              fullWidth
              size="large"
              loading={saving}
              onClick={handleSave}
            >
              Salvar altera\u00e7\u00f5es
            </Button>
          </div>
        </section>

        <Divider />

        {/* About section */}
        <section>
          <h2
            className="font-semibold text-manga-text-secondary"
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Sobre
          </h2>
          <p
            className="text-manga-text-secondary"
            style={{ fontSize: "14px", lineHeight: "21px" }}
          >
            Manga v1.0.0 (MVP)
          </p>
        </section>

        <Divider />

        {/* Actions */}
        <div
          className="flex flex-col"
          style={{ gap: "12px" }}
        >
          <Button
            fullWidth
            size="large"
            variant="secondary"
            loading={loggingOut}
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
          <Button
            fullWidth
            size="large"
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            Excluir minha conta
          </Button>
        </div>
      </div>

      {/* Delete account dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          setShowDeleteDialog(open);
          if (!open) setDeleteConfirm("");
        }}
        title="Excluir conta?"
        description='Essa a\u00e7\u00e3o \u00e9 irrevers\u00edvel. Todos os seus dados ser\u00e3o apagados. Digite "EXCLUIR" para confirmar.'
        variant="destructive"
        footer={
          <div className="flex" style={{ gap: "8px" }}>
            <Button
              variant="tertiary"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              loading={deleting}
              disabled={deleteConfirm !== "EXCLUIR"}
              onClick={handleDeleteAccount}
            >
              Excluir
            </Button>
          </div>
        }
      >
        <div style={{ padding: "8px 0" }}>
          <TextField
            label='Digite "EXCLUIR"'
            type="text"
            value={deleteConfirm}
            onChange={(e) =>
              setDeleteConfirm(e.target.value.toUpperCase())
            }
          />
        </div>
      </Dialog>
    </div>
  );
}
