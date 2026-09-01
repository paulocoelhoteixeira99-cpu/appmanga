-- Migration: adicionar constraint UNIQUE no CPF (parcial — ignora NULLs)
-- Aplicar no SQL Editor do Supabase Dashboard

-- 1. Unique index parcial: so valida unicidade quando CPF nao e NULL
CREATE UNIQUE INDEX idx_profiles_cpf_unique ON public.profiles (cpf) WHERE cpf IS NOT NULL;

-- 2. Funcao RPC para checar disponibilidade de CPF
CREATE OR REPLACE FUNCTION public.is_cpf_available(cpf_number TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (SELECT 1 FROM public.profiles WHERE cpf = cpf_number);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
