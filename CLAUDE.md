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
- **Camada consultiva:** Manga Insights (regras, comparacoes, historico; nao necessariamente IA)

## Documentacao de produto (fonte de verdade)
- `docs/Manga-Product-Blueprint-V1.docx` — **Blueprint V1**: definicao funcional completa do MVP (arquitetura, modelo financeiro, features, fluxos, regras, estados, validacoes, escopo do beta). Fonte de verdade para "o que estamos construindo".
- `docs/Checkpoint-Manga.md` — **Checkpoint de produto**: historico de decisoes, CHECKs 01-08, racional e discussoes. Fonte de verdade para "como chegamos as decisoes".
- `docs/Manga-Brand-Product-Foundations.docx` — **Brand & Product Foundations**: personalidade, voz, UX principles, sistema visual, motion, acessibilidade. Fonte de verdade para "como a experiencia deve ser".
- Quando houver conflito: decisao explicita mais recente prevalece. Blueprint > Checkpoint > Foundations > PRD antigo.

## Modelo financeiro (MVP)
- **Formula:** `Disponivel = Saldo Inicial + Entradas - Saidas - Reservas em Metas + Retiradas de Metas`
- Saldo Inicial: posicao inicial, NAO e Entrada nem Transacao. >= R$0 no MVP (negativo proibido). Estabelece marco temporal.
- Disponivel: dinheiro ainda utilizavel conhecido pelo Manga, NAO saldo bancario. Pode ficar negativo.
- Transacao: fato financeiro = Entrada (aumenta Disponivel) ou Saida (reduz Disponivel). Valor sempre positivo.
- Categorias: organizam SOMENTE Saidas. Entradas NAO tem Categoria. Vinculo e opcional.
- Reserva em Meta: reduz Disponivel, NAO cria Saida. Retirada de Meta: aumenta Disponivel, NAO cria Entrada.
- Ajuste/Reconciliamento: fora do MVP (backlog).

## Arquitetura de produto (4 destinos + suporte)
| Destino | Pergunta central |
|---|---|
| Home | "O que importa para mim agora?" — Metas > Contexto financeiro > Manga Insights > Nova Transacao |
| Metas | "Para onde estou levando meu dinheiro?" — M01-M06 + M03.1 |
| Movimentacoes (naming pendente) | "O que aconteceu com meu dinheiro?" — Disponivel, Entradas, Saidas, historico, busca, filtros |
| Categorias | "Como estou distribuindo meus gastos?" — C01-C04 |
| Configuracoes (suporte) | Conta/dados, notificacoes, excluir conta — NAO e deposito de entidades financeiras |

## Onboarding (CHECK 08 — funcionalmente fechado)
Fluxo: Conta/Acesso -> Nome -> Saldo Inicial [obrigatorio] -> Categorias [opcional] -> Limites [opcional] -> Meta [opcional] -> Reserva [opcional] -> Preparacao -> UAU -> Home
- Nome: unico, obrigatorio. Idade e renda fora do MVP.
- Estruturas criadas sao REAIS (categorias, metas, reservas). Features viram fonte de verdade apos onboarding.
- Reserva: > R$0 e <= Disponivel. Nao cria Entrada/Saida.
- Regra: "Onboarding coleta; as features correspondentes passam a ser as fontes de verdade e edicao."

## Product Principles
1. Clareza antes de quantidade — mostrar so o que ajuda a compreender e decidir
2. Dados devem levar a orientacao — dado > informacao > orientacao
3. Simples nao significa superficial — progressive disclosure
4. O usuario mantem o controle — orientar sem decidir por ele
5. Dinheiro sem julgamento — gastar mais que o planejado e informacao, nao falha moral
6. "Bloquear o impossivel; orientar o desfavoravel" — bloquear inconsistencias, permitir realidades desfavoraveis com orientacao

## Estrutura
```
/src          - Codigo fonte principal
/tests        - Testes
/docs         - Documentacao de produto (Blueprint, Checkpoint, Foundations, PRD, migrations)
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
