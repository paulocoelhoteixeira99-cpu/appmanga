# App Financeiro

## Projeto
PWA de controle financeiro pessoal por assinatura (R$19,90/mes).
Modelo de negocio: planner low-ticket (R$49,90) como porta de entrada + assinatura do PWA.
Publico-alvo: brasileiros 25-45 anos que querem sair do endividamento.

## Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- **UI:** shadcn/ui
- **Backend/DB:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **Hospedagem:** Vercel (free tier)
- **Email:** Gmail (empresa) + Resend (transacional)
- **Pagamento:** Mercado Pago
- **PWA:** next-pwa
- **Analytics:** Google Analytics 4

## Estrutura
```
/src          - Codigo fonte principal
/tests        - Testes
/docs         - Documentacao (plano de execucao, checklists, resumo executivo)
/scripts      - Scripts utilitarios
```

## Convencoes
- Idioma do codigo: ingles (variaveis, funcoes, classes)
- Idioma dos commits: portugues
- Commits seguem o padrao Conventional Commits (feat:, fix:, chore:, docs:, refactor:, test:)
- Branch principal: main

## Comandos uteis
- `npm install` - Instalar dependencias
- `npm test` - Rodar testes
- `npm run dev` - Rodar em modo desenvolvimento

## Regras
- Nunca commitar arquivos .env
- Sempre rodar testes antes de fazer push
- Manter o README.md atualizado
- Priorizar stack gratuita (Supabase free, Vercel free, etc)
- App deve ser PWA (instalavel no celular)
