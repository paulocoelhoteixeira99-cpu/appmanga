# Plano de Execucao - App Financeiro

> Baseado no Resumo Executivo + Pesquisa de Mercado (Mai/2026)
> Adaptado para stack gratuita, prioridade em desenvolvimento do produto.

---

## 1. Pesquisa de Mercado - Panorama Atual

### O problema (dados reais)
- 1 em 4 brasileiros nao consegue pagar todas as contas do mes (CNI)
- 69% nao consegue poupar nada
- 81% usam apps bancarios, mas **apenas 19% usam ferramentas especificas de gestao financeira**
- Brasileiros gastam em media R$51-200/mes com assinaturas - R$19,90 cabe no bolso

### Concorrentes diretos
| App | Modelo | Ponto forte | Ponto fraco |
|-----|--------|-------------|-------------|
| **Mobills** | Freemium (R$17,90/mes) | Graficos detalhados, planejamento | Interface carregada, muitos recursos pagos |
| **Organizze** | Freemium (R$15,90/mes) | Interface limpa e intuitiva | Funcoes basicas no free, sem comunidade |
| **Guiabolso/Olivia** | Gratuito (PicPay) | Open Finance automatico | Descontinuado como app independente |
| **ZapGastos** | WhatsApp bot | Sem atrito, usa WhatsApp | Limitado em visualizacao/relatorios |
| **Minhas Economias** | Freemium | Tradicional, base grande | Interface datada |

### Tendencias 2026
1. **IA para categorizacao automatica** - usuarios querem zero trabalho manual
2. **Interface via WhatsApp** ("interface invisivel") - tendencia forte no Brasil
3. **Open Finance** - integracao automatica com bancos
4. **Conteudo educativo embutido** - nao so ferramenta, mas educacao financeira
5. **Simplicidade radical** - menos e mais, apps complexos perdem usuarios

### Oportunidade identificada
Os concorrentes sao **ferramentas frias** - registram gastos mas nao educam nem engajam.
Nossa proposta combina **ferramenta + educacao + comunidade** com:
- PWA leve (funciona offline, sem download de app store)
- Conteudo educativo integrado (nao so planilha, mas orientacao)
- Planner como porta de entrada (low-ticket R$49,90)
- Assinatura acessivel (R$19,90/mes)
- Foco no publico 25-45 anos, classe B/C, que quer sair do vermelho

---

## 2. Stack Tecnica (100% Gratuita para MVP)

Substituicoes em relacao ao resumo executivo original:

| Resumo Original | Nossa Escolha | Custo | Motivo |
|-----------------|---------------|-------|--------|
| WordPress/Wix | **Next.js + Vercel** | R$0 | PWA nativo, SEO excelente, free hosting |
| RD Station (R$200-400/mes) | **Resend + Mailchimp Free** | R$0 | 3k emails/mes Resend, 500 contatos Mailchimp |
| DigitalOcean/Hostinger | **Vercel Free Tier** | R$0 | 100GB bandwidth, deploy automatico |
| React generico | **Next.js 15 App Router** | R$0 | SSR, SEO, PWA, tudo junto |
| Banco generico | **Supabase Free** | R$0 | 500MB storage, 50k MAU, Auth incluso |
| Pagar.me | **Mercado Pago** | Apenas taxa por transacao | PIX sem taxa, publico brasileiro confia |
| Hotjar | **Vercel Analytics + Google Analytics** | R$0 | Analytics integrado |
| Figma (design) | **Figma Free** | R$0 | 3 projetos gratis |
| Trello | **GitHub Projects** | R$0 | Ja estamos no GitHub |

### Stack final
```
Frontend:    Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
Backend:     Supabase (Postgres + Auth + Storage + Edge Functions)
Hospedagem:  Vercel (free tier)
Email:       Gmail (empresa) + Resend (transacional)
Pagamento:   Mercado Pago (PIX sem taxa, cartao ~4.99%)
PWA:         next-pwa (service worker nativo)
UI:          shadcn/ui (componentes gratuitos e bonitos)
Analytics:   Google Analytics 4
Dominio:     ~R$40/ano (.com.br)
```

**Custo fixo mensal do MVP: R$0** (ate escalar)
**Custo unico: ~R$40/ano** (dominio)

### Limites do Supabase Free Tier (atentar)
- 500MB de banco de dados
- 1GB de storage (arquivos)
- 50.000 usuarios ativos/mes
- **Pausa apos 1 semana sem requests** (para producao, upgrade pro R$25/mes quando tiver usuarios)
- 2 projetos ativos

---

## 3. Estrategia de Execucao - Ordem das Prioridades

### Filosofia: "Build first, market second"
> Diferente do resumo executivo que sugere marketing primeiro, nossa estrategia e:
> **Construir o app primeiro → usar e testar pessoalmente → ajustar → so entao investir em marketing.**
>
> Motivo: voce precisa de um produto real e testado antes de gastar com ads.
> O planner digital pode ser criado em paralelo enquanto o app amadurece.

### Ordem estrategica (fases)

```
FASE 1 (Semana 1-2)     → Fundacao: contas, marca, infraestrutura
FASE 2 (Semana 3-6)     → Produto: MVP do PWA funcionando
FASE 3 (Semana 7-8)     → Conteudo: planner digital + landing page
FASE 4 (Semana 9-10)    → Funil: email marketing + automacoes
FASE 5 (Semana 11-12)   → Lancamento: ads + redes sociais
FASE 6 (Semana 13+)     → Escala: otimizar, iterar, crescer
```

### FASE 1 - Fundacao (Semana 1-2)
**Objetivo:** ter todas as contas criadas e marca definida para trabalhar.

#### Tech
- [x] Criar repositorio GitHub com Claude Code (@Paulo - 26/05)
- [ ] Criar Gmail da empresa (ex: contato@nomedomarca.com ou nomedomarca@gmail.com)
- [ ] Criar conta Supabase (com o Gmail da empresa)
- [ ] Criar conta Vercel (com o GitHub)
- [ ] Criar conta Mercado Pago
- [ ] Criar conta Resend (para emails transacionais)
- [ ] Criar conta Google Analytics
- [ ] Comprar dominio .com.br (~R$40/ano)
- [ ] Gerar lista de afazeres e contas iniciais com Claude Code (@Paulo - 26/05)

#### Marca
- [ ] Definir nome do produto/marca
- [ ] Criar identidade visual (logo, paleta de cores, tipografia)
- [ ] Criar conta Instagram
- [ ] Criar pagina Facebook
- [ ] Criar perfil LinkedIn da empresa (opcional, mas recomendado)

#### Decisoes a tomar nesta fase
- [ ] Nome da marca (sugestoes podem ser geradas aqui)
- [ ] Publico-alvo primario (ex: jovens 25-35 endividados? familias classe C?)
- [ ] Modelo de preco inicial (Plano Unico R$19,90 vs Basico/Premium)

---

### FASE 2 - Produto MVP (Semana 3-6)
**Objetivo:** app funcionando que voce e seu amigo usam diariamente.

> Esta e a fase mais importante. Um app que voce usa e confia
> e o melhor argumento de venda que existe.

#### Semana 3-4: Core do App
- [ ] Setup Next.js + Supabase + Tailwind + shadcn/ui
- [ ] Auth (login/cadastro com email + Google via Supabase Auth)
- [ ] Dashboard principal (resumo financeiro do mes)
- [ ] CRUD de transacoes (receitas e despesas)
- [ ] Categorias de gastos (alimentacao, transporte, moradia, lazer, etc)
- [ ] Configuracao PWA (instalar no celular como app)

#### Semana 5-6: Funcionalidades de valor
- [ ] Graficos de evolucao (gastos por categoria, mensal)
- [ ] Metas de economia (definir meta, acompanhar progresso)
- [ ] Alertas de limite por categoria
- [ ] Relatorios mensais (resumo do mes anterior)
- [ ] Responsividade mobile perfeita
- [ ] Testes com voce e amigo usando diariamente

**Entregavel:** PWA funcionando, instalavel no celular, que voces dois usam no dia a dia.

---

### FASE 3 - Conteudo (Semana 7-8)
**Objetivo:** criar o planner digital e a landing page para comecar a captar leads.

- [ ] Criar planner financeiro digital (PDF interativo ou Notion template)
- [ ] Landing page no proprio Next.js (/)
  - Hero com proposta de valor
  - Beneficios
  - Preco do planner
  - CTA para teste gratis do PWA
- [ ] Pagina de vendas do planner (/planner)
- [ ] E-book gratuito "Guia Rapido de Orcamento" (lead magnet)
- [ ] Blog basico com 3-5 artigos SEO (ex: "Como sair das dividas em 2026")

---

### FASE 4 - Funil (Semana 9-10)
**Objetivo:** automacoes de email e fluxo de conversao funcionando.

- [ ] Integrar Resend para emails transacionais (boas-vindas, reset senha)
- [ ] Configurar Mailchimp Free para nurturing (sequencia de emails)
- [ ] Fluxo: download e-book → 3 emails de valor → oferta planner → oferta PWA
- [ ] Integrar Mercado Pago para assinatura
- [ ] Pagina de checkout no app
- [ ] Fluxo de trial 7 dias → conversao para pago

---

### FASE 5 - Lancamento (Semana 11-12)
**Objetivo:** comecar a atrair usuarios de verdade.

- [ ] Google Ads (keywords: "controle financeiro", "app de gastos", "sair das dividas")
- [ ] Instagram/Facebook Ads (publico 25-45, interesse em financas)
- [ ] Conteudo organico (posts, reels, stories sobre educacao financeira)
- [ ] Parcerias com micro-influenciadores de financas
- [ ] Orcamento inicial sugerido: R$500-1000/mes em ads

---

### FASE 6 - Escala (Semana 13+)
**Objetivo:** otimizar metricas e crescer.

- [ ] Analisar metricas (CAC, LTV, churn, conversao)
- [ ] A/B testing na landing page
- [ ] Adicionar funcionalidades baseadas em feedback
- [ ] Considerar integracao WhatsApp (tendencia forte)
- [ ] Upgrade Supabase para Pro quando necessario (~R$25/mes)
- [ ] SEO continuo + conteudo no blog
- [ ] Programa de indicacao (usuario indica amigo, ganha desconto)

---

## 4. Metricas-Alvo (do resumo executivo, mantidas)

| Metrica | Meta |
|---------|------|
| CAC (Custo de Aquisicao) | ~R$30 |
| LTV (Lifetime Value) | ~R$119 (6 meses x R$19,90) |
| LTV/CAC | >= 3:1 |
| Churn mensal | < 15% |
| Landing → Lead | 20% |
| Lead → Compra planner | 3-5% |
| Compra → Trial PWA | 50% |
| Trial → Assinante pago | 20% |
| Meta 6 meses | 300 assinantes = ~R$6.000/mes |

---

## 5. Projecao Financeira (12 meses)

### Custos
| Item | Mensal | Anual |
|------|--------|-------|
| Dominio | - | R$40 |
| Hospedagem (Vercel free) | R$0 | R$0 |
| Supabase (free → pro) | R$0 → R$125 | ~R$750 |
| Email (Resend/Mailchimp free) | R$0 | R$0 |
| Ads (a partir do mes 3) | R$500 → R$2.000 | ~R$15.000 |
| **Total estimado ano 1** | | **~R$16.000** |

### Receita (cenario realista)
| Mes | Assinantes | Receita mensal |
|-----|-----------|----------------|
| 3 | 20 | R$398 |
| 6 | 80 | R$1.592 |
| 9 | 160 | R$3.184 |
| 12 | 240 | R$4.776 |
| **Total ano 1** | | **~R$30.000** |

**Break-even estimado: mes 6-7** (no cenario realista)

---

## 6. Riscos e Mitigacoes

| Risco | Mitigacao |
|-------|----------|
| Supabase free pausa apos 1 semana sem uso | Fazer ping automatico ou upgrade pro cedo |
| Concorrencia (Mobills, Organizze) | Diferencial: educacao + comunidade + simplicidade |
| Baixa conversao inicial | Comecar organico, testar antes de investir em ads |
| LGPD | Implementar consentimento, politica de privacidade, dados no Brasil |
| Churn alto | Conteudo educativo semanal, notificacoes uteis, gamificacao leve |
| Nao e consultoria financeira | Disclaimer claro em todo o app |

---

## 7. Fontes da Pesquisa de Mercado

- [Comparativo apps financeiros 2026 - Financinha](https://blog.financinha.com.br/post/melhores-aplicativos-para-controle-de-gastos-2025-2026-brasil)
- [Mobills vs Organizze 2026 - Gazeta Brasilia](https://gazetabrasilia.com.br/melhores-aplicativos-de-controle-financeiro-2026/)
- [Apps controle financeiro - Serasa](https://www.serasa.com.br/score/blog/opcoes-de-aplicativo-para-controle-financeiro/)
- [Melhor app financeiro 2026 - Focca AI](https://focca-ai.com/melhor-app-financeiro-2026)
- [IA venceu apps tradicionais - Startups to Watch](https://startupstowatch.com.br/o-melhor-aplicativo-para-controle-financeiro-em-2026-por-que-a-ia-venceu-os-apps-tradicionais/)
- [Supabase Pricing 2026 - UI Bakery](https://uibakery.io/blog/supabase-pricing)
- [Next.js + Supabase vs Firebase MVP 2026](https://propeliustech.com/blogs/nextjs-supabase-vs-firebase-mvp-tech-stack-2026/)
- [Supabase Free Tier 2026 - Cotera](https://cotera.co/articles/supabase-pricing-guide)
- [Apps gestao financeira - ZapGastos](https://zapgastos.com/blog/apps-para-gestao-financeira/)
- [Pesquisa Assinaturas 2025 - Vindi](https://blog.vindi.com.br/pesquisa-de-assinaturas/)
- [Mercado de Assinaturas - Opinion Box](https://blog.opinionbox.com/mercado-de-assinaturas/)
- CNI - Pesquisa endividamento brasileiros
