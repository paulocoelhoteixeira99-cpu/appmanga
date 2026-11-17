# Manga — Instrucoes para Agentes Autonomos

Este arquivo complementa o `CLAUDE.md` com guardrails para execucao autonoma (headless, subagents, CI).
O `CLAUDE.md` continua sendo a referencia principal — tudo que esta la se aplica aqui tambem.

## Principio geral
Agentes autonomos NAO tem um humano revisando cada passo em tempo real.
Por isso: ser conservador, previsivel e rastreavel.

## Git e deploy

- NUNCA fazer `git push` diretamente na branch `main`
- Sempre criar uma branch separada (ex: `feat/nome-da-feature`, `fix/descricao`)
- NUNCA fazer `git push --force` ou `git reset --hard`
- NUNCA fazer merge na `main` — isso e decisao humana
- Commits devem ser atomicos e descritivos (Conventional Commits em portugues)
- NUNCA commitar arquivos `.env`, secrets ou credenciais

## Testes

- Rodar `npm test` antes de qualquer commit
- Se testes falharem, corrigir o problema — NAO pular testes ou usar `--no-verify`
- NAO commitar codigo que quebra testes existentes

## Escopo e limites

- Executar APENAS o que foi explicitamente solicitado na task
- NAO fazer refactors oportunistas ou "melhorias" nao pedidas
- NAO instalar novas dependencias sem que a task exija
- NAO remover ou alterar configuracoes de CI/CD, linting ou formatacao
- NAO modificar `CLAUDE.md`, `AGENT.md`, `package.json` (scripts/config) ou `.github/` sem instrucao explicita

## Design System

- NUNCA criar novos componentes UI — apenas usar os existentes em `src/components/`
- NUNCA inventar cores, espacamentos ou padroes visuais
- Se um componente necessario nao existir, parar e reportar a lacuna
- Consultar `docs/DESIGN-SYSTEM.md` antes de qualquer implementacao visual

## Tokens e Design System (validacao obrigatoria)

Antes de criar ou modificar qualquer componente visual:
1. Verificar se a cor/spacing/radius existe em `src/app/globals.css`
2. Se nao existe, PARAR e reportar — nao inventar valores

Tokens PROIBIDOS (nao fazem parte do DS):
- Qualquer `blue-*`, `gray-*`, `slate-*`, `zinc-*`, `red-*`, `green-*`, `yellow-*` do Tailwind
- `bg-white` hardcoded (usar `bg-[var(--color-surface-default)]`)
- `disabled:opacity-50` (usar cores semanticas)
- `font-bold` (DS usa `font-semibold` para heading/label)
- Sombras inline quando existe `shadow-sm`/`shadow-md`/`shadow-lg`

Focus ring padrao: `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`

## Banco de dados (Supabase)

- NAO executar migrations automaticamente — gerar o SQL e reportar para aplicacao manual
- NAO alterar RLS policies, triggers ou funcoes sem instrucao explicita
- NAO deletar dados ou fazer DROP em tabelas

## Seguranca

- Validar inputs em boundaries do sistema (API routes, formularios)
- NAO expor dados sensiveis em logs ou mensagens de erro
- Manter conformidade LGPD (dados financeiros + WhatsApp)
- NAO fazer requests para URLs externas nao relacionadas ao projeto

## Comunicacao

- Ao concluir a task, reportar: o que foi feito, arquivos alterados, testes rodados
- Se encontrar ambiguidade ou bloqueio, parar e pedir clarificacao — NAO assumir
- Se a task parecer arriscada ou fora do escopo, parar e reportar

## Checklist pre-commit (obrigatorio)

1. Codigo compila sem erros (`npm run build` ou equivalente)
2. Testes passam (`npm test`)
3. Nenhum arquivo sensivel incluido (`.env`, tokens, secrets)
4. Branch correta (nunca `main`)
5. Commit message segue Conventional Commits em portugues
