-- ============================================================
-- Migration 008: RPCs adicionais para MVP
-- ============================================================

-- Verificar se telefone esta disponivel (excluindo o proprio usuario)
CREATE OR REPLACE FUNCTION public.is_phone_available(phone_number text)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE phone = phone_number AND id != auth.uid()
  );
$$;

-- Verificar se CPF esta disponivel (excluindo o proprio usuario)
CREATE OR REPLACE FUNCTION public.is_cpf_available(cpf_number text)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE cpf = cpf_number AND id != auth.uid()
  );
$$;

-- Buscar movimentacoes de uma meta (com verificacao de ownership)
CREATE OR REPLACE FUNCTION public.get_goal_movements(target_goal_id uuid)
RETURNS TABLE(
  id uuid,
  type text,
  amount numeric(12,2),
  created_at timestamptz
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT gm.id, gm.type, gm.amount, gm.created_at
  FROM public.goal_movements gm
  JOIN public.goals g ON g.id = gm.goal_id
  WHERE gm.goal_id = target_goal_id
    AND g.user_id = auth.uid()
  ORDER BY gm.created_at DESC;
$$;

-- Historico de gastos por categoria nos ultimos N meses
CREATE OR REPLACE FUNCTION public.get_category_spending_history(
  target_category_id uuid,
  months_back int DEFAULT 3
)
RETURNS TABLE(
  month text,
  spent numeric(12,2)
) LANGUAGE sql SECURITY DEFINER AS $$
  SELECT
    to_char(date_trunc('month', t.date), 'YYYY-MM') AS month,
    COALESCE(SUM(t.amount), 0) AS spent
  FROM public.transactions t
  WHERE t.category_id = target_category_id
    AND t.user_id = auth.uid()
    AND t.type = 'expense'
    AND t.date >= (date_trunc('month', CURRENT_DATE) - (months_back || ' months')::interval)
  GROUP BY date_trunc('month', t.date)
  ORDER BY month DESC;
$$;
