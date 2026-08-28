# Manga — PRD do MVP

**Status:** Definitivo para inicio de construcao
**Base:** 7 entrevistas de usuario, benchmark competitivo (7 apps), analise final de descoberta

---

## 1. Problema

Pessoas de 22-40 anos no Brasil tentam se organizar financeiramente, mas todo sistema que constroem (planilha, agenda, WhatsApp, extrato do banco) falha — nao por falta de vontade, mas pelo **custo de manter o registro manual**. O resultado nao e falta de dado, e falta de traducao do dado em decisao: as pessoas sabem que gastam mal, mas nao sabem o que fazer com isso, e abandonam o controle quando nao veem resultado rapido o suficiente.

No mercado testado, "informar" e commodity — praticamente todo concorrente entrega grafico e categorizacao. "Orientar" (traduzir dado em direcao pratica) e raro: so 1 dos 7 apps analisados faz isso de forma clara. Esse e o espaco que o Manga ocupa.

---

## 2. Visao do produto

Manga e um app de financas pessoais que **guia** o usuario, nao so mostra numeros — com a menor friccao de registro possivel, funcionando tanto para quem nunca teve controle financeiro quanto para quem ja tem disciplina mas esta exausto de manter isso manualmente.

Essencia de marca: **Orientacao**. Arquetipo: Companion + Caregiver.

---

## 3. Arquetipos de usuario (validados em pesquisa)

| Arquetipo | Quem | Necessidade central |
| --- | --- | --- |
| **O Recomeco** (Luciano, Leonardo) | Nunca teve sistema que funcionou; precisa de educacao financeira basica | Orientacao leve, reforco de progresso visivel cedo |
| **O Exausto** (Bruce, Samuel, Mariana) | Ja tentou se organizar (geralmente por transicao de vida) mas abandonou por friccao | Automacao que substitua o esforco manual sem perder controle |
| **O Avancado** (Vinicius, Lucas) | Ja tem sistema proprio que funciona; cetico a solucoes sem valor claro | Automacao real + camada consultiva que a disciplina manual nao entrega |

O MVP nao escolhe um arquetipo unico — orienta todo mundo por padrao, sem exigir conhecimento previo.

---

## 4. Jobs-to-be-done

1. Quando minha vida financeira parece fora de controle, quero acompanhar meus gastos sem esforco extra de registro, para confiar no numero sem que isso vire mais uma tarefa que abandono.
2. Quando nao sei como investir o que sobra, quero ser guiado de forma simples de acordo com meu perfil e objetivo.
3. Quando ja tenho um habito manual que funciona mas consome tempo, quero uma ferramenta que automatize isso sem perder a visibilidade que ja confio.
4. Quando algo muda na minha vida (casamento, mudanca, morar junto, novo negocio), quero uma forma simples de comecar do zero, sem precisar de conhecimento previo.
5. Quando estou cansado, quero que o app me diga o que importa, em vez de eu ter que interpretar numeros sozinho.

---

## 5. Decisoes de arquitetura (resolvidas)

### 5.1 Entrada de dados: agente via WhatsApp (API oficial) + manual no app

**Decisao:** o MVP nao depende de conexao bancaria (Open Finance) como via principal. A entrada de dados acontece por:

- **Agente conversacional no WhatsApp, via API Oficial (WhatsApp Cloud API da Meta)** — usuario registra gastos/receitas em linguagem natural ("gastei 50 no mercado", "recebi 300 de freela"), o agente interpreta, categoriza e confirma.
- **Entrada manual no app** — complementar, para quem prefere lancar direto na interface ou corrigir/detalhar o que o agente categorizou.

**Por que caminho oficial:** decisao da equipe de construir sobre a via que nao pode ser derrubada por banimento. Como o WhatsApp e a via principal de captura de dado do produto, colocar essa funcionalidade sobre uma conexao que viola os termos de uso da plataforma seria risco estrutural. O processo de verificacao de negocio da Meta tem lead time e exige CNPJ, mas deve ser iniciado cedo (Fase 1) e desenvolvido em paralelo usando o numero de teste que a Meta fornece.

**Vantagens:** zero risco de banimento, sem sessao WebSocket, sem QR code, sem quedas de conexao. Webhook aponta para Supabase Edge Function, sem container persistente, sem Redis.

### 5.2 Motor de orientacao: agnostico a renda fixa

**Decisao:** o motor de orientacao calcula com base em **entradas reais conforme acontecem**, nao em uma expectativa de renda mensal fixa.

**Por que:** Luciano (renda variavel por producao) e Mariana (renda quinzenal totalmente imprevisivel) representam um padrao de renda nao-linear que ferramentas tradicionais nao atendem. Decidir isso de forma agnostica desde o inicio evita retrabalho estrutural.

---

## 6. Escopo do MVP

### 6.1 Funcionalidades essenciais (in)

1. **Onboarding sem friccao**
    - Sem exigir conexao bancaria
    - Demonstracao de valor antes de qualquer paywall (dado real ou ficticio)
    - Calibrar expectativa de esforco/tempo logo no inicio

2. **Registro de transacoes via agente WhatsApp**
    - Interpretacao de linguagem natural para valor, categoria e data
    - Confirmacao rapida (usuario valida ou corrige em 1 toque)
    - Suporte a receita e despesa, fixa e variavel

3. **Registro manual complementar no app**
    - Para lancamentos diretos ou correcao/detalhamento

4. **Categorizacao automatica com ajuste manual**
    - Categorias padrao + capacidade de criar/renomear categorias

5. **Motor de orientacao agnostico a renda fixa** (ver 5.2)
    - Saldo disponivel calculado com base em entradas reais
    - Suporte nativo a renda irregular/variavel

6. **Camada consultiva/comparativa (core do diferencial)**
    - Alertas de desvio da media por categoria
    - Sugestoes praticas de proximo passo, nao so exibicao de dado

7. **Visualizacao grafica**
    - Grafico de proporcao (pizza/barra) por categoria, com icones

8. **Reserva de emergencia / metas com "saldo zerado"**
    - Direcionar saldo positivo do mes para reserva/meta automaticamente, comecando o mes seguinte do zero

9. **Orientacao basica opcional** (camada progressiva, nao obrigatoria)
    - Explicacoes simples de conceitos para quem precisa, sem forcar em quem ja sabe

10. **Modelo de assinatura com trial**
    - Periodo de teste antes de cobrar (formato a definir pos-lancamento)

### 6.2 Fora de escopo do MVP (backlog confirmado)

- Household/gestao financeira de casal
- Gestao de pequenos negocios informais
- Conexao bancaria via Open Finance
- Notificacao proativa no momento de pico de dor (testar em A/B)
- Segmentacao de usuario por nivel de conhecimento

---

## 7. Stack tecnica

| Ferramenta | Uso | Custo no MVP |
| --- | --- | --- |
| Next.js 15 + TypeScript + Tailwind CSS 4 + shadcn/ui | Frontend | R$ 0 |
| Supabase | Backend/banco/auth | R$ 0 em dev; Pro (~US$25/mes) em producao |
| Vercel | Hospedagem frontend | R$ 0 em dev; Pro (~US$20/mes) em producao comercial |
| WhatsApp Cloud API (Meta) | Canal do agente | Gratis ate 1.000 conversas/mes |
| PostHog | Analytics, feature flags, error tracking | R$ 0 |
| Linear | Gestao de tarefas/issues | R$ 0 |
| Notion | PRD, docs, pesquisa | R$ 0 |
| GitHub | Codigo, CI | R$ 0 |
| next-pwa | PWA (instalavel no celular) | R$ 0 |

**Custo de desenvolvimento: R$ 0.** Custos reais surgem em: infraestrutura de producao (Vercel/Supabase Pro) e estrutura de empresa (CNPJ, dominio, contabilidade).

---

## 8. Requisitos nao-funcionais

- **LGPD:** modelagem de dados deve considerar conformidade desde o inicio (dados financeiros + mensagens WhatsApp)
- **Seguranca do agente WhatsApp:** tratamento de erro/ambiguidade robusto + confirmacao clara antes de gravar lancamento
- **PWA:** app instalavel no celular, funcional offline para visualizacao

---

## 9. Evolucao pos-MVP

- Open Finance via agregador (Pluggy) como via adicional de automacao
- Notificacao proativa — testar formato e timing via experimento
- Household e negocios informais — pesquisa propria antes de decisao

---

## 10. Metricas de sucesso (MVP)

- **Ativacao:** % de usuarios que completam o primeiro lancamento na primeira sessao
- **Retencao:** % de usuarios que voltam a lancar dados na semana 2 e no mes 2
- **Engajamento consultivo:** % de usuarios que interagem com alerta/insight
- **Conversao trial -> pago:** segmentar por perfil de renda

---

## 11. Riscos conhecidos

- **Interpretacao de linguagem natural** e o ponto tecnico mais critico — se errar com frequencia, recria a friccao que o produto existe para eliminar
- **Camada consultiva depende de volume minimo de dados** — usuarios novos nao tem historico; usar benchmarks de categoria ate haver dado suficiente
- **Tamanho do arquetipo "Avancado"** nao esta dimensionado — nao otimizar para converter esse segmento primeiro
