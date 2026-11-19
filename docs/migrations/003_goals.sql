-- ============================================================
-- Migration 003: Tabela de metas e movimentacoes de meta
-- ============================================================

CREATE TABLE public.goals (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name           text NOT NULL,
  target         numeric(12,2) NOT NULL CHECK (target > 0),
  current_value  numeric(12,2) NOT NULL DEFAULT 0 CHECK (current_value >= 0),
  color          text NOT NULL DEFAULT 'orange',
  icon           text DEFAULT 'star',          -- GoalIconName
  content_type   text NOT NULL DEFAULT 'initials' CHECK (content_type IN ('initials', 'icon', 'image')),
  image_url      text,                          -- se content_type = 'image'
  status         text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  completed_at   timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_goals_user_status ON public.goals (user_id, status);

-- Movimentacoes de meta (reservar / retirar)
CREATE TABLE public.goal_movements (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id    uuid NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type       text NOT NULL CHECK (type IN ('reserve', 'withdraw')),
  amount     numeric(12,2) NOT NULL CHECK (amount > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_goal_movements_goal ON public.goal_movements (goal_id, created_at DESC);

-- RLS goals
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve proprias metas"
  ON public.goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuario cria proprias metas"
  ON public.goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario edita proprias metas"
  ON public.goals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuario deleta proprias metas"
  ON public.goals FOR DELETE
  USING (auth.uid() = user_id);

-- RLS goal_movements
ALTER TABLE public.goal_movements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuario ve proprias movimentacoes de meta"
  ON public.goal_movements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuario cria proprias movimentacoes de meta"
  ON public.goal_movements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Triggers updated_at
CREATE TRIGGER set_goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
