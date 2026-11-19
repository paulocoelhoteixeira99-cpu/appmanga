# Manga

## Projeto
PWA de financas pessoais que guia o usuario, nao so mostra numeros — com a menor friccao de registro possivel.
Publico-alvo: brasileiros 22-40 anos que tentam se organizar financeiramente mas abandonam por friccao de registro manual.
Modelo de negocio: assinatura com trial (preco a definir, ancoragem de pesquisa ~R$30/mes).
Essencia de marca: Orientacao. Arquetipo: Companion + Caregiver.

## Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- **UI/DS:** `@matsborges/manga-design-system@0.1.0` (GitHub Packages, mantida pelo Mateus)
- **Backend/DB:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **Hospedagem:** Vercel (Hobby em dev; Pro obrigatorio em producao com cobranca)
- **WhatsApp:** WhatsApp Cloud API oficial (Meta) — via principal de entrada de dados
- **IA/LLM:** Extracao estruturada para parsing de linguagem natural (provedor a definir)
- **Analytics:** PostHog (analytics, feature flags, error tracking)
- **Gestao:** Linear (issues/sprints) + Notion (docs/PRD)
- **PWA:** next-pwa
- **Email:** Decisao adiada (Zoho Mail free ou Google Workspace pago)

## Arquitetura core
- **Entrada de dados:** agente WhatsApp (linguagem natural) + manual no app
- **Motor de orientacao:** agnostico a renda fixa (calcula com entradas reais, nao salario fixo)
- **Camada consultiva:** alertas de desvio, sugestoes praticas, comparacao com media propria

## Estrutura
```
/src          - Codigo fonte principal
/tests        - Testes
/docs         - Documentacao (PRD, plano de execucao, brand identity)
/scripts      - Scripts utilitarios
```

## Convencoes
- Idioma do codigo: ingles (variaveis, funcoes, classes)
- Idioma dos commits: portugues
- Commits seguem o padrao Conventional Commits (feat:, fix:, chore:, docs:, refactor:, test:)
- Branch principal: main

## Comandos uteis
- `npm install` - Instalar dependencias (requer NODE_AUTH_TOKEN para GitHub Packages)
- `npm test` - Rodar testes
- `npm run dev` - Rodar em modo desenvolvimento

## Design System — `@matsborges/manga-design-system`
- **Pacote:** `@matsborges/manga-design-system@0.1.0` via GitHub Packages (privado)
- **Repo:** https://github.com/matsborges/manga-design-system
- **Figma:** file key `wpGrZPa3pUk4W3JMfMc2k1` (Manga — Foundations & DS) — somente leitura, NUNCA editar
- **Referencia de marca:** `docs/BRAND-IDENTITY.md` — cores, tipografia, tom de voz
- **Autenticacao:** `.npmrc` na raiz aponta `@matsborges` para `npm.pkg.github.com`; variavel `NODE_AUTH_TOKEN` necessaria no ambiente local e na Vercel
- **Tokens:** fornecidos pela biblioteca via `tokens.css` e `tailwind.css` — NAO definir tokens manualmente no globals.css
- **Utilitarios Tailwind:** prefixo `manga-`, ex: `bg-manga-background-default`, `text-manga-text-primary`, `p-manga-4`

### Como usar componentes
1. Importar CSS do componente em `layout.tsx`: `import "@matsborges/manga-design-system/button.css"`
2. Importar o componente no arquivo: `import { Button } from "@matsborges/manga-design-system/button"`
3. Cada componente tem export e CSS proprios — consultar `package.json` exports da biblioteca
4. Componentes de produto: `import { GoalCard } from "@matsborges/manga-design-system/product"` + `product.css`

### Regras
- NAO criar componentes UI neste repo — usar a biblioteca
- NAO definir tokens de cor manualmente — tokens vem da biblioteca
- NAO criar novos padroes visuais (cores, fontes, espacamentos) sem aprovacao
- NAO tomar decisoes de design independentes — seguir o Figma e as especificacoes
- NAO recriar logotipos ou elementos de marca com CSS — usar assets oficiais
- Para atualizar a biblioteca: `npm install --save-exact @matsborges/manga-design-system@<nova-versao>`
- Em caso de conflito, prioridade: especificacoes de produto > Design System > handoff > arquitetura existente > boas praticas

## Regra Figma-first (OBRIGATORIO)
NUNCA implementar uma tela sem antes consultar o Figma via API REST. Checklist:
1. Buscar o node-id do frame (`GET /v1/files/<key>?depth=2`)
2. Extrair valores EXATOS do node (`GET /v1/files/<key>/nodes?ids=<id>`): fontSize, fontWeight, lineHeight, letterSpacing, posicoes x/y, width, height, gaps, padding, fills, radius
3. Baixar screenshot (`GET /v1/images/<key>?ids=<id>&format=png&scale=2`) para referencia visual
4. Exportar assets SVG do Figma (`GET /v1/images/<key>?ids=<id>&format=svg`) — NUNCA extrair paths manualmente de SVGs existentes
5. Usar os valores reais no codigo — NUNCA chutar/estimar/aproximar valores
6. Apos implementar, comparar visualmente o resultado com o screenshot do Figma

### Figma — Acesso via API REST
- **Token:** salvo em `~/.claude/settings.json` → `mcpServers.figma.env.FIGMA_API_KEY`
- **NAO depender do plugin MCP do Figma** — ele frequentemente nao carrega. Usar `curl` via Bash.
- **Arquivos:** DS = `wpGrZPa3pUk4W3JMfMc2k1` | Product = `rUsqhiOWcO53esORZaedhg`

## Regras
- Nunca commitar arquivos .env
- Sempre rodar testes antes de fazer push
- Manter o README.md atualizado
- Priorizar stack gratuita ate haver tracao real
- App deve ser PWA (instalavel no celular)
- Conformidade LGPD desde o inicio (dados financeiros + mensagens WhatsApp)
