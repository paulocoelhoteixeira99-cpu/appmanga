-- ============================================================
-- Migration 005: RPCs e views auxiliares
-- ============================================================

-- -------------------------------------------------------
-- Funcao: saldo disponivel do usuario
-- disponivel = initial_balance + entradas - saidas - reservas_em_metas + retiradas_de_metas
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_available_balance(target_user_id uuid)
RETURNS numeric(12,2)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    COALESCE(p.initial_balance, 0)
    + COALESCE((
        SELECT SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE -t.amount END)
        FROM public.transactions t
        WHERE t.user_id = target_user_id
      ), 0)
    - COALESCE((
        SELECT SUM(CASE WHEN gm.type = 'reserve' THEN gm.amount ELSE -gm.amount END)
        FROM public.goal_movements gm
        WHERE gm.user_id = target_user_id
      ), 0)
  FROM public.profiles p
  WHERE p.id = target_user_id;
$$;

-- -------------------------------------------------------
-- Funcao: resumo financeiro do mes atual
-- Retorna: income, expense, balance
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_monthly_summary(target_user_id uuid)
RETURNS TABLE (income numeric, expense numeric, balance numeric)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount END), 0) AS income,
    COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount END), 0) AS expense,
    public.get_available_balance(target_user_id) AS balance
  FROM public.transactions t
  WHERE t.user_id = target_user_id
    AND t.date >= date_trunc('month', CURRENT_DATE)
    AND t.date < date_trunc('month', CURRENT_DATE) + interval '1 month';
$$;

-- -------------------------------------------------------
-- Funcao: gasto por categoria no mes atual
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_category_spending(target_user_id uuid)
RETURNS TABLE (
  category_id uuid,
  category_name text,
  icon text,
  monthly_limit numeric,
  spent numeric
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    c.id AS category_id,
    c.name AS category_name,
    c.icon,
    c.monthly_limit,
    COALESCE(SUM(t.amount), 0) AS spent
  FROM public.categories c
  LEFT JOIN public.transactions t
    ON t.category_id = c.id
    AND t.type = 'expense'
    AND t.date >= date_trunc('month', CURRENT_DATE)
    AND t.date < date_trunc('month', CURRENT_DATE) + interval '1 month'
  WHERE c.user_id = target_user_id
    AND c.is_active = true
  GROUP BY c.id, c.name, c.icon, c.monthly_limit
  ORDER BY c.sort_order, c.name;
$$;

-- -------------------------------------------------------
-- Funcao: completar onboarding
-- Recebe saldo inicial e marca onboarding como completo
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  balance numeric
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET
    initial_balance = balance,
    onboarding_completed_at = now(),
    updated_at = now()
  WHERE id = auth.uid();
END;
$$;

-- -------------------------------------------------------
-- Funcao auxiliar: handle_updated_at
-- (criar somente se ainda nao existir)
-- -------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
