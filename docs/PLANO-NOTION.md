# Plano de Execução — App Financeiro

Baseado no Resumo Executivo + Pesquisa de Mercado (Mai/2026). Adaptado para stack gratuita, prioridade em desenvolvimento do produto.

---

# FASE 1 — Fundação (Semana 1-2)

> Objetivo: contas criadas e marca definida para trabalhar.

## Decisões

- [ ] Nome da marca (3 opções, votar)
- [ ] Público-alvo primário
- [ ] Modelo de preço (único ou básico/premium)
- [ ] Planner digital como porta de entrada?

## Tech

- [x] Repositório GitHub criado
- [x] Plano de execução escrito
- [ ] Gmail da empresa
- [ ] Supabase — criar projeto
- [ ] Vercel — criar conta (conectar ao GitHub)
- [ ] Mercado Pago — criar conta
- [ ] Resend — criar conta
- [ ] Comprar domínio .com.br (~R$40/ano)

## Marca

- [ ] Identidade visual (logo, cores, tipografia)
- [ ] Instagram — criar perfil
- [ ] Facebook — criar página
- [ ] Bio e foto padronizadas entre plataformas

---

# FASE 2 — Produto MVP (Semana 3-6)

> Objetivo: app funcionando que você e seu amigo usam no dia a dia.

## Semana 3-4: Core

- [ ] Setup Next.js 15 + Supabase + Tailwind + shadcn/ui
- [ ] Auth (login/cadastro com email + Google)
- [ ] Dashboard principal (resumo financeiro do mês)
- [ ] CRUD de transações (receitas e despesas)
- [ ] Categorias de gastos (alimentação, transporte, moradia, lazer, etc)
- [ ] Configuração PWA (instalável no celular)

## Semana 5-6: Valor

- [ ] Gráficos de evolução (gastos por categoria, mensal)
- [ ] Metas de economia (definir meta, acompanhar progresso)
- [ ] Alertas de limite por categoria
- [ ] Relatórios mensais
- [ ] Responsividade mobile perfeita
- [ ] Testes diários — você e amigo usando de verdade

> Entregável: PWA instalável no celular, funcionando offline.

---

# FASE 3 — Conteúdo (Semana 7-8)

> Objetivo: landing page + planner para captar leads.

- [ ] Planner financeiro digital (PDF interativo ou template Notion)
- [ ] Landing page no Next.js (/)
    - [ ] Hero com proposta de valor
    - [ ] Benefícios
    - [ ] Preço do planner
    - [ ] CTA para teste grátis do PWA
- [ ] Página de vendas do planner (/planner)
- [ ] E-book gratuito "Guia Rápido de Orçamento" (lead magnet)
- [ ] Blog básico com 3-5 artigos SEO

---

# FASE 4 — Funil (Semana 9-10)

> Objetivo: automações de email e fluxo de conversão.

- [ ] Resend — emails transacionais (boas-vindas, reset senha)
- [ ] Mailchimp Free — sequência de nurturing
- [ ] Fluxo: download e-book → 3 emails de valor → oferta planner → oferta PWA
- [ ] Integrar Mercado Pago para assinatura
- [ ] Página de checkout
- [ ] Trial 7 dias → conversão para pago

---

# FASE 5 — Lançamento (Semana 11-12)

> Objetivo: atrair usuários de verdade.

- [ ] Google Ads (keywords: "controle financeiro", "app de gastos")
- [ ] Instagram/Facebook Ads (público 25-45, interesse em finanças)
- [ ] Conteúdo orgânico (posts, reels, stories)
- [ ] Parcerias com micro-influenciadores de finanças
- [ ] Orçamento sugerido: R$500-1.000/mês

---

# FASE 6 — Escala (Semana 13+)

> Objetivo: otimizar e crescer.

- [ ] Analisar métricas (CAC, LTV, churn, conversão)
- [ ] A/B testing na landing page
- [ ] Novas features baseadas em feedback
- [ ] Considerar integração WhatsApp
- [ ] Upgrade Supabase Pro quando necessário (~R$25/mês)
- [ ] SEO contínuo + blog
- [ ] Programa de indicação (indica amigo, ganha desconto)

---

# Métricas-Alvo

| Métrica | Meta |
| --- | --- |
| CAC | ~R$30 |
| LTV | ~R$119 (6 meses) |
| Churn mensal | < 15% |
| Landing → Lead | 20% |
| Lead → Compra planner | 3-5% |
| Trial → Assinante pago | 20% |
| Meta 6 meses | 300 assinantes = ~R$6.000/mês |

---

# Custos Estimados (Ano 1)

| Item | Mês | Ano |
| --- | --- | --- |
| Domínio | — | R$40 |
| Hospedagem (Vercel) | R$0 | R$0 |
| Supabase (free → pro) | R$0 → R$125 | ~R$750 |
| Email (Resend/Mailchimp) | R$0 | R$0 |
| Ads (a partir mês 3) | R$500 → R$2.000 | ~R$15.000 |
| Total ano 1 | | ~R$16.000 |

> Break-even estimado: mês 6-7
