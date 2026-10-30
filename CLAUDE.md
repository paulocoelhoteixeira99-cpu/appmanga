# Manga

## Projeto
PWA de financas pessoais que guia o usuario, nao so mostra numeros — com a menor friccao de registro possivel.
Publico-alvo: brasileiros 22-40 anos que tentam se organizar financeiramente mas abandonam por friccao de registro manual.
Modelo de negocio: assinatura com trial (preco a definir, ancoragem de pesquisa ~R$30/mes).
Essencia de marca: Orientacao. Arquetipo: Companion + Caregiver.

## Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- **UI:** shadcn/ui
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
- `npm install` - Instalar dependencias
- `npm test` - Rodar testes
- `npm run dev` - Rodar em modo desenvolvimento

## Design System
- **Referencia tecnica:** `docs/DESIGN-SYSTEM.md` — tokens, componentes, hierarquia tipografica, divergencias
- **Figma:** file key `wpGrZPa3pUk4W3JMfMc2k1` (Manga — Foundations & DS) — consulta via MCP, somente leitura, NUNCA editar
- **Referencia de marca:** `docs/BRAND-IDENTITY.md` — cores, tipografia, tom de voz
- **Tokens de cor:** definidos em `src/app/globals.css` (bloco `@theme`)
- **Variaveis Figma:** 2 colecoes — Primitives (cores, spacing, radius, opacity, border) e Semantic Colors (surface, text, border, field, action, feedback, chip, overlay)
- Antes de implementar qualquer tela ou componente, SEMPRE:
  1. Consultar `docs/DESIGN-SYSTEM.md` para tokens e padroes existentes
  2. Consultar o Figma via MCP (`create_session` com fileKey `wpGrZPa3pUk4W3JMfMc2k1`, depois `get_metadata`/`search_design_system`/`get_design_context`)
  3. Verificar se ja existe componente React reutilizavel em `src/components/`
  4. Reutilizar componentes e tokens existentes — NUNCA criar duplicatas
  5. Se um componente necessario nao existir, informar a lacuna e aguardar aprovacao
- NAO criar novos padroes visuais (cores, fontes, espacamentos, componentes) sem aprovacao
- NAO tomar decisoes de design independentes — seguir o Figma e as especificacoes
- NAO recriar logotipos ou elementos de marca com CSS — usar assets oficiais
- Em caso de conflito, prioridade: especificacoes de produto > Design System > handoff > arquitetura existente > boas praticas

## Regras
- Nunca commitar arquivos .env
- Sempre rodar testes antes de fazer push
- Manter o README.md atualizado
- Priorizar stack gratuita ate haver tracao real
- App deve ser PWA (instalavel no celular)
- Conformidade LGPD desde o inicio (dados financeiros + mensagens WhatsApp)
