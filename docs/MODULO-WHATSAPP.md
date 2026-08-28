# Modulo WhatsApp — Agente Financeiro

> Via principal de entrada de dados do Manga.
> Canal: WhatsApp Cloud API oficial (Meta) — decisao confirmada.
> Diferencial: registro por linguagem natural com menor friccao possivel.

---

## 1. Visao Geral

### O que o usuario pode fazer pelo WhatsApp

1. **Registrar gastos/receitas** — "gastei 80 no mercado", "recebi 3500 de salario"
2. **Consultar resumo** — "como to esse mes?", "quanto gastei com comida?"
3. **Receber alertas** — "voce gastou X% a mais com iFood esse mes comparado a sua media"

### Fluxo do usuario

```
Usuario envia mensagem no WhatsApp
        |
        v
WhatsApp Cloud API (webhook)
        |
        v
Supabase Edge Function (processamento)
        |
        v
  [Parser de linguagem natural]
        |
   +---------+---------+
   |                   |
   v                   v
Comando direto     LLM (extracao
(regex/keywords)   estruturada)
   |                   |
   v                   v
{valor, categoria, tipo, data}
        |
        v
  [Confirmacao com usuario]
        |
        v
  Supabase DB (grava transacao)
        |
        v
  Responde no WhatsApp (confirmacao)
```

---

## 2. Stack do Modulo

| Componente | Tecnologia | Custo |
|-----------|-----------|-------|
| **API WhatsApp** | WhatsApp Cloud API (Meta) | Gratis ate 1.000 conversas/mes |
| **Webhook** | Supabase Edge Functions | Gratis (free tier) |
| **LLM** | Extracao estruturada (provedor a definir) | A definir |
| **Banco de dados** | Supabase Postgres (ja no projeto) | Gratis |

### Vantagens do caminho oficial vs nao-oficial

- Zero risco de banimento
- Sem sessao WebSocket para gerenciar
- Sem QR code para escanear
- Sem quedas de conexao para monitorar
- Sem container persistente, sem Redis
- Webhook e chamada HTTP comum — serverless resolve

---

## 3. Setup da WhatsApp Cloud API

### Pre-requisitos
- [ ] Conta Meta Business Suite (gratis)
- [ ] Facebook App criado no Meta for Developers
- [ ] Numero de telefone dedicado (Meta fornece temporario para dev)
- [ ] CNPJ para verificacao do negocio (producao)

### Passo a passo
1. Criar conta no [Meta for Developers](https://developers.facebook.com/)
2. Criar Facebook App (tipo: Business)
3. Adicionar produto "WhatsApp" ao app
4. Configurar numero de teste (temporario gratis)
5. Gerar token de acesso permanente
6. Configurar webhook apontando para Supabase Edge Function
7. Verificar o negocio no Meta Business Suite (para producao)

### Variaveis de ambiente
```env
WHATSAPP_TOKEN=         # Token de acesso permanente
WHATSAPP_PHONE_ID=      # ID do numero de telefone
WHATSAPP_VERIFY_TOKEN=  # Token de verificacao do webhook
WHATSAPP_BUSINESS_ID=   # ID da conta business
```

---

## 4. Arquitetura Tecnica

### 4.1 Tabelas no Supabase

```sql
-- Vincular numero WhatsApp ao usuario do app
CREATE TABLE whatsapp_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Historico de mensagens para contexto
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_user_id UUID REFERENCES whatsapp_users(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('incoming', 'outgoing')),
  content TEXT NOT NULL,
  intent TEXT, -- 'expense', 'income', 'query', 'alert'
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_wa_messages_user_date
ON whatsapp_messages (whatsapp_user_id, created_at DESC);
```

### 4.2 Edge Function: Webhook

```
supabase/functions/whatsapp-webhook/
  index.ts        -- Entry point (verificacao + roteamento)
  handlers/
    message.ts    -- Processa mensagens recebidas
    intent.ts     -- Classifica intencao
    expense.ts    -- Registra gasto/receita no banco
    query.ts      -- Consulta resumos financeiros
  lib/
    whatsapp.ts   -- Client para enviar mensagens via API
    llm.ts        -- Client para extracao estruturada
    parser.ts     -- Parse de valores e categorias
```

### 4.3 Classificacao de intencao (sem LLM)

Antes de chamar o LLM, tentar classificar com regex/keywords:

```typescript
// Exemplos de classificacao simples
"gastei 50 no mercado"        -> intent: 'expense', valor: 50, categoria: 'alimentacao'
"recebi 3500"                 -> intent: 'income', valor: 3500
"quanto gastei esse mes"      -> intent: 'query', tipo: 'resumo_mensal'
// Se nao bater em nenhum pattern -> envia pro LLM
```

**Vantagem:** maioria das mensagens resolvidas sem chamar LLM = custo e latencia menores.

### 4.4 Fluxo de confirmacao (critico)

> Ponto mais critico do MVP segundo o PRD: se o agente errar categorizacao ou valor
> com frequencia, recria a mesma friccao que o produto existe para eliminar.

```
Usuario: "gastei 50 no mercado"
Bot: "Registrei: R$50,00 em Alimentacao. Correto? (Sim / Corrigir)"
Usuario: "sim"
Bot: "Pronto! Saldo disponivel este mes: R$1.250,00"
```

Se o usuario corrigir:
```
Usuario: "corrigir"
Bot: "O que precisa ajustar? (Valor / Categoria / Ambos)"
```

---

## 5. Vinculacao WhatsApp <-> Conta do App

### Via PWA (principal)
1. Usuario se cadastra no PWA
2. Vai em Configuracoes > WhatsApp
3. Digita numero de telefone
4. Recebe codigo de verificacao no WhatsApp
5. Digita codigo no PWA — vinculado

### Via WhatsApp (alternativa)
1. Usuario manda "oi" pro numero do bot
2. Bot responde com link para criar conta no PWA
3. Apos criar conta, volta ao WhatsApp com codigo recebido
4. Vinculado

---

## 6. Custos em escala

| Cenario | WhatsApp API | LLM | Total/mes |
|---------|-------------|-----|-----------|
| Ate 1.000 conversas | R$ 0 | A definir | A definir |
| 300 assinantes (~2.000 conv) | ~R$ 250 | A definir | ~R$ 250+ |
| 1.000 assinantes (~7.000 conv) | ~R$ 1.500 | A definir | ~R$ 1.500+ |

> Conversas iniciadas pelo usuario tem janela de 24h gratuita.
> Mensagens proativas (fora da janela) exigem templates aprovados pela Meta.

---

## 7. Evolucoes pos-MVP

- Audio: usuario manda audio, transcreve e processa
- Foto de nota fiscal: OCR para extrair itens e valores
- Relatorio semanal automatico via WhatsApp
- Open Finance como via complementar (nao substitui WhatsApp)
