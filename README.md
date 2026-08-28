# Manga

App de financas pessoais que guia o usuario, nao so mostra numeros. Registro via WhatsApp (linguagem natural) + app manual, com camada consultiva que traduz dados em orientacao pratica.

## Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **Hospedagem:** Vercel
- **WhatsApp:** WhatsApp Cloud API oficial (Meta)
- **Analytics:** PostHog
- **Gestao:** Linear + Notion

## Setup

```bash
# Instalar dependencias
npm install

# Configurar variaveis de ambiente
cp .env.example .env

# Rodar em desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
src/          - Codigo fonte
tests/        - Testes
docs/         - Documentacao (PRD, plano de execucao, brand identity)
scripts/      - Scripts utilitarios
```

## Documentacao

- [PRD do MVP](docs/PRD.md)
- [Plano de Execucao](docs/PLANO-DE-EXECUCAO.md)
- [Modulo WhatsApp](docs/MODULO-WHATSAPP.md)
- [Identidade da Marca](docs/BRAND-IDENTITY.md)
