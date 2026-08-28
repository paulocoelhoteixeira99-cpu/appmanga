# Fase 1 - Checklist de Fundacao

> Manga — Fase 1: Fundacao
> Baseado no PRD definitivo e stack de ferramentas confirmada.

---

## Empresa/Admin

- [ ] Abrir CNPJ (pre-requisito para gateway de pagamento, conta PJ e verificacao Meta)
- [ ] Comprar dominio
- [ ] Criar conta bancaria PJ (Nubank PJ, Inter PJ ou C6 PJ — sem mensalidade)
- [ ] Assinatura eletronica do contrato de sociedade (Gov.br — gratis)

## Tech

- [x] GitHub — repositorio criado
- [x] Plano de execucao e PRD documentados
- [ ] Supabase — criar projeto (com email da empresa)
- [ ] Vercel — criar conta (conectar ao GitHub)
- [ ] PostHog — criar conta e definir eventos iniciais (ativacao, retencao, engajamento)
- [ ] Linear — criar workspace e importar issues do PRD

## WhatsApp Cloud API (iniciar cedo — tem lead time)

- [ ] Criar conta Meta Business Suite
- [ ] Criar Facebook App no Meta for Developers
- [ ] Adicionar produto WhatsApp ao app
- [ ] Configurar numero de teste (Meta fornece temporario gratis)
- [ ] Gerar token de acesso permanente
- [ ] Iniciar verificacao do negocio (exige CNPJ)

## Marca

- [x] Identidade visual definida (docs/BRAND-IDENTITY.md)
- [ ] Instagram — criar perfil
- [ ] Facebook — criar pagina

## Stack confirmada (custo R$0 em dev)

| Ferramenta | Para que |
|-----------|----------|
| Next.js 15 + TypeScript + Tailwind CSS 4 | Frontend |
| shadcn/ui | Componentes visuais |
| Supabase | Banco de dados + auth + storage + edge functions |
| Vercel | Hospedagem |
| WhatsApp Cloud API | Canal principal de entrada de dados |
| PostHog | Analytics, feature flags, error tracking |
| Linear | Gestao de tarefas/sprints |
| Notion | Documentacao e PRD |
| GitHub | Codigo e CI |

## Decisoes adiadas (nao bloqueiam MVP)

- Email corporativo (Zoho free ou Google Workspace pago)
- Registro de marca INPI (backlog)
- Gateway de pagamento (definir antes da Fase 5)

---

> PRD completo: `docs/PRD.md`
> Plano de execucao: `docs/PLANO-DE-EXECUCAO.md`
