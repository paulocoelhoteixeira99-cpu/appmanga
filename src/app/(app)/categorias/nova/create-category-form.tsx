"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@matsborges/manga-design-system/button";
import { TextField } from "@matsborges/manga-design-system/text-field";
import { ProductIcon } from "@matsborges/manga-design-system/product";
import { ArrowBackIcon } from "@matsborges/manga-design-system/icons";
import { formatCurrencyInput, parseCurrencyInput } from "@/lib/utils/masks";
import { createClient } from "@/lib/supabase/client";
import type { ProductIconName } from "@matsborges/manga-design-system/product";

const ICON_OPTIONS: ProductIconName[] = [
  "restaurant",
  "directions-car",
  "home",
  "school",
  "pets",
  "flight",
  "favorite",
  "business-center",
  "redeem",
  "sports-soccer",
  "star",
  "beach-access",
  "account-balance-wallet",
  "lightbulb",
  "devices",
  "savings",
];

export function CreateCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<ProductIconName>("restaurant");
  const [limitInput, setLimitInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Informe o nome da categoria.");
      return;
    }

    setSaving(true);
    setError(null);

    const limit = parseCurrencyInput(limitInput);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase
      .from("categories")
      .insert({
        user_id: user.id,
        name: name.trim(),
        icon,
        monthly_limit: limit > 0 ? limit : null,
      });

    if (insertError) {
      if (insertError.code === "23505") {
        setError("J\u00e1 existe uma categoria com esse nome.");
      } else {
        setError("Erro ao criar categoria. Tente novamente.");
      }
      setSaving(false);
      return;
    }

    router.push("/categorias");
    router.refresh();
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
          Criar Categoria
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col"
      >
        <div
          className="flex-1 overflow-y-auto"
          style={{ padding: "16px" }}
        >
          <div
            className="flex flex-col"
            style={{ gap: "20px" }}
          >
            <TextField
              label="Nome"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              placeholder="Ex: Alimenta\u00e7\u00e3o, Transporte..."
            />

            {/* Icon selector */}
            <div>
              <p
                className="font-semibold text-manga-text-primary"
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                  marginBottom: "8px",
                }}
              >
                \u00cdcone
              </p>
              <div
                className="grid"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(48px, 1fr))",
                  gap: "8px",
                }}
              >
                {ICON_OPTIONS.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setIcon(iconName)}
                    className="flex items-center justify-center"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor:
                        icon === iconName
                          ? "rgb(238,105,31)"
                          : "rgb(241,240,243)",
                      color:
                        icon === iconName
                          ? "white"
                          : "rgb(90,82,105)",
                    }}
                  >
                    <ProductIcon
                      name={iconName}
                      className="w-6 h-6"
                    />
                  </button>
                ))}
              </div>
            </div>

            <TextField
              label="Limite mensal (opcional)"
              type="text"
              inputMode="numeric"
              value={limitInput ? `R$ ${limitInput}` : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(
                  /^R\$\s?/,
                  ""
                );
                setLimitInput(formatCurrencyInput(raw));
              }}
              placeholder="Sem limite"
              helperText="Voc\u00ea receber\u00e1 alertas ao se aproximar do limite."
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
          </div>
        </div>

        <div
          className="shrink-0"
          style={{ padding: "8px 16px 24px" }}
        >
          <Button
            type="submit"
            fullWidth
            size="large"
            loading={saving}
          >
            Criar Categoria
          </Button>
        </div>
      </form>
    </div>
  );
}
