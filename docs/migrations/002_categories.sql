-- ============================================================
-- Migration 002: Tabela de categorias
-- ============================================================

CREATE TABLE public.categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        text NOT NULL,
  icon        text,                          -- nome do ProductIcon (ex: 'home', 'restaurant')
  monthly_limit numeric(12,2),               -- null = sem limite
  is_active   boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Um usuario nao pode ter duas categorias com mesmo nome
CREATE UNIQUE INDEX idx_categories_user_name
  ON public.categories (user_id, lower(name))
  WHERE is_active = true;

-- RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve proprias categorias"
  ON public.categories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuario cria proprias categorias"
  ON public.categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario edita proprias categorias"
  ON public.categories FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario deleta proprias categorias"
  ON public.categories FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger updated_at
CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
