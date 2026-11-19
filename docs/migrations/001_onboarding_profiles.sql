-- ============================================================
-- Migration 001: Adicionar campos de onboarding ao profiles
-- ============================================================
-- Rodar no SQL Editor do Supabase
-- Projeto: guqovupxmjovajniedgb
-- ============================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS initial_balance numeric(12,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;

-- Indice para queries de onboarding pendente
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding
  ON public.profiles (onboarding_completed_at)
  WHERE onboarding_completed_at IS NULL;
