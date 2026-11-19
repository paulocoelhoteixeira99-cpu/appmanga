-- ============================================================
-- Migration 004: Tabela de transacoes financeiras
-- ============================================================

CREATE TABLE public.transactions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  type        text NOT NULL CHECK (type IN ('income', 'expense')),
  amount      numeric(12,2) NOT NULL CHECK (amount > 0),
  description text,
  date        date NOT NULL DEFAULT CURRENT_DATE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Queries frequentes: transacoes do usuario no periodo
CREATE INDEX idx_transactions_user_date
  ON public.transactions (user_id, date DESC);

-- Queries por categoria
CREATE INDEX idx_transactions_category
  ON public.transactions (category_id, date DESC)
  WHERE category_id IS NOT NULL;

-- RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve proprias transacoes"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuario cria proprias transacoes"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario edita proprias transacoes"
  ON public.transactions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario deleta proprias transacoes"
  ON public.transactions FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger updated_at
CREATE TRIGGER set_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
