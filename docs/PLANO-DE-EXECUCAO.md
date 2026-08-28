# Plano de Execucao — Manga MVP

> Baseado no PRD definitivo (7 entrevistas + benchmark de 7 apps).
> Stack validada: Next.js 15 + Supabase + WhatsApp Cloud API + PostHog.

---

## Fases

```
FASE 1 (Semana 1-2)     -> Fundacao: contas, infra, verificacao Meta
FASE 2 (Semana 3-6)     -> Core: app funcionando com registro manual
FASE 3 (Semana 5-8)     -> WhatsApp: agente via Cloud API (paralelo)
FASE 4 (Semana 7-10)    -> Orientacao: motor consultivo + visualizacoes
FASE 5 (Semana 11-12)   -> Polish: onboarding, trial, analytics
FASE 6 (Semana 13+)     -> Lancamento + iteracao
```

---

## FASE 1 — Fundacao (Semana 1-2)

> Objetivo: contas criadas, infra pronta, processo de verificacao Meta iniciado.

### Empresa/Admin
- [ ] Abrir CNPJ (pre-requisito para gateway de pagamento e conta PJ)
- [ ] Comprar dominio
- [ ] Criar conta bancaria PJ (banco digital, sem mensalidade)

### Tech
- [x] Repositorio GitHub criado
- [x] Plano de execucao escrito
- [ ] Supabase — criar projeto
- [ ] Vercel — criar conta (conectar ao GitHub)
- [ ] PostHog — criar conta e configurar eventos iniciais
- [ ] Linear — criar workspace e importar issues do PRD

### WhatsApp Cloud API (iniciar cedo — tem lead time)
- [ ] Criar conta Meta Business Suite
- [ ] Criar Facebook App no Meta for Developers
- [ ] Adicionar produto WhatsApp ao app
- [ ] Configurar numero de teste (Meta fornece temporario)
- [ ] Gerar token de acesso permanente
- [ ] Iniciar verificacao do negocio (exige CNPJ)

### Marca
- [x] Identidade visual definida (ver docs/BRAND-IDENTITY.md)
- [ ] Instagram — criar perfil
- [ ] Facebook — criar pagina

---

## FASE 2 — Core do App (Semana 3-6)

> Objetivo: PWA funcionando com registro manual de transacoes.

### Semana 3-4: Fundacao do app
- [ ] Setup Next.js 15 + Supabase + Tailwind CSS 4 + shadcn/ui
- [ ] Auth (login/cadastro com email + Google via Supabase Auth)
- [ ] Modelar banco de dados (users, transactions, categories)
- [ ] CRUD de transacoes (receitas e despesas, fixas e variaveis)
- [ ] Categorias padrao + criar/renomear categorias
- [ ] Configuracao PWA (next-pwa, instalavel no celular)

### Semana 5-6: Motor de orientacao basico
- [ ] Saldo disponivel calculado com entradas reais (agnostico a renda fixa)
- [ ] Dashboard principal (resumo financeiro do mes)
- [ ] Suporte a renda irregular/variavel desde o inicio
- [ ] Responsividade mobile

> Entregavel: PWA instalavel, registro manual funcionando, dashboard com saldo real.

---

## FASE 3 — Agente WhatsApp (Semana 5-8, paralelo ao core)

> Objetivo: usuario registra gastos/receitas pelo WhatsApp em linguagem natural.
> Detalhes completos: docs/MODULO-WHATSAPP.md

### Semana 5-6: Webhook + registro basico
- [ ] Criar Edge Function do webhook no Supabase
- [ ] Receber mensagens via WhatsApp Cloud API
- [ ] Parser de linguagem natural (valor, categoria, tipo, data)
- [ ] Fluxo de confirmacao rapida (usuario valida ou corrige)
- [ ] Registro de gastos/receitas no banco
- [ ] Tela de vinculacao WhatsApp no PWA (Configuracoes)

### Semana 7-8: IA + consultas
- [ ] Integrar LLM para extracao estruturada (provedor a definir)
- [ ] Consulta de resumo financeiro via WhatsApp
- [ ] Historico de mensagens para contexto
- [ ] Tratamento de erro/ambiguidade robusto
- [ ] Testes end-to-end

> Entregavel: usuario registra gastos por WhatsApp, agente interpreta e confirma.

---

## FASE 4 — Motor de Orientacao (Semana 7-10)

> Objetivo: transformar dados em orientacao pratica (diferencial core do Manga).

### Camada consultiva
- [ ] Alertas de desvio da media por categoria ("voce gastou X% a mais com iFood")
- [ ] Sugestoes praticas de proximo passo (nao so exibicao de dado)
- [ ] Comportamento sensato para primeiras semanas (benchmarks ate ter historico)

### Visualizacao
- [ ] Grafico de proporcao (pizza/barra) por categoria com icones
- [ ] Visao clara "bater o olho e entender"

### Reserva de emergencia / Metas
- [ ] Reserva/meta com logica de "saldo zerado" (direcionar saldo positivo, zerar pro proximo mes)
- [ ] Orientacao basica opcional (explicacoes simples de conceitos para quem precisa)

> Entregavel: app que orienta, nao so informa. Diferencial validado em pesquisa.

---

## FASE 5 — Polish + Pre-lancamento (Semana 11-12)

> Objetivo: produto pronto para usuarios reais.

### Onboarding
- [ ] Fluxo sem friccao (sem exigir conexao bancaria)
- [ ] Demonstracao de valor antes do paywall (dado real ou ficticio)
- [ ] Calibrar expectativa de esforco/tempo

### Modelo de assinatura
- [ ] Periodo de trial antes de cobrar
- [ ] Integrar gateway de pagamento
- [ ] Pagina de checkout

### Analytics (PostHog)
- [ ] Evento: primeiro lancamento (ativacao)
- [ ] Evento: retorno na semana 2 (retencao)
- [ ] Evento: interacao com alerta/insight (engajamento consultivo)
- [ ] Evento: conversao trial -> pago
- [ ] Feature flags para experimentos futuros

### Conformidade
- [ ] Politica de privacidade (LGPD)
- [ ] Termos de uso
- [ ] Disclaimer: nao e consultoria financeira

---

## FASE 6 — Lancamento + Iteracao (Semana 13+)

> Objetivo: usuarios reais, medir, iterar.

- [ ] Migrar Vercel para Pro (obrigatorio para uso comercial)
- [ ] Migrar Supabase para Pro (backup, SLA, dados reais)
- [ ] Lancamento para primeiros usuarios (beta fechado)
- [ ] Analisar metricas de ativacao, retencao e engajamento
- [ ] Iterar com base em feedback real
- [ ] Conteudo organico (posts, reels sobre educacao financeira)

---

## Metricas de sucesso (do PRD)

| Metrica | O que mede |
| --- | --- |
| Ativacao | % que completa primeiro lancamento na primeira sessao |
| Retencao | % que volta a lancar na semana 2 e mes 2 |
| Engajamento consultivo | % que interage com alerta/insight |
| Conversao trial -> pago | Segmentar por perfil de renda |

---

## Custos

### Desenvolvimento (R$ 0)

| Ferramenta | Custo |
| --- | --- |
| Next.js + Vercel (Hobby) | R$ 0 |
| Supabase (free) | R$ 0 |
| WhatsApp Cloud API (ate 1k conversas) | R$ 0 |
| PostHog (free tier) | R$ 0 |
| Linear (free) | R$ 0 |
| GitHub | R$ 0 |

### Producao (quando lancar com cobranca)

| Item | Custo |
| --- | --- |
| Vercel Pro | ~US$ 20/mes |
| Supabase Pro | ~US$ 25/mes |
| Dominio | ~R$ 40/ano |
| CNPJ + contabilidade | Custo real variavel |
| WhatsApp (>1k conversas) | ~R$ 0,25-0,50 por conversa extra |

---

## Riscos (do PRD)

| Risco | Mitigacao |
| --- | --- |
| Parser de linguagem natural errar com frequencia | Fluxo de confirmacao/correcao rapido e confiavel |
| Camada consultiva sem dados suficientes (usuario novo) | Usar benchmarks de categoria ate ter historico |
| LGPD | Conformidade desde o inicio na modelagem de dados |
| Supabase free pausa apos 7 dias sem uso | Ping automatico ou upgrade pro cedo |

---

## Backlog pos-MVP

- Open Finance via agregador (Pluggy)
- Notificacao proativa (testar formato via A/B)
- Household/gestao de casal (pesquisa propria)
- Gestao de negocios informais (pesquisa propria)
- Audio via WhatsApp (Whisper)
- Foto de nota fiscal (OCR)
