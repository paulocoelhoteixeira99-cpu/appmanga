# Estrutura do Workspace Notion — Manga

> Notion e a ferramenta de documentacao do time.
> Linear e a ferramenta de gestao de tarefas/sprints.

---

## Workspace Notion

### Paginas principais

```
Manga/
  PRD do MVP              -- PRD definitivo (espelho do docs/PRD.md)
  Pesquisa de Usuario     -- Sintese das 7 entrevistas + arquetipos
  Benchmark Competitivo   -- Analise dos 7 apps concorrentes
  Brand Identity          -- Identidade visual, tom de voz, manifesto
  Stack de Ferramentas    -- Decisoes de stack com justificativas
  Decisoes de Produto     -- Log de decisoes tomadas e por que
  Reunioes/               -- Notas de reuniao do time
```

### Principios

- Notion para **documentos vivos** (PRD, pesquisa, decisoes, marca)
- Linear para **execucao** (issues, sprints, progresso)
- GitHub para **codigo** (commits linkados a issues do Linear)
- Nao duplicar informacao entre ferramentas — cada uma tem seu papel

---

## Workspace Linear

### Estrutura sugerida

```
Manga (Team)
  Backlog          -- Issues priorizadas aguardando sprint
  Sprint atual     -- Issues em andamento
  Triage           -- Issues novas, nao priorizadas ainda
```

### Labels sugeridas
- `core` — funcionalidades do app (auth, transacoes, dashboard)
- `whatsapp` — agente WhatsApp
- `orientacao` — motor consultivo, alertas, sugestoes
- `infra` — setup, deploy, CI, config
- `design` — UI, UX, identidade visual
- `admin` — CNPJ, dominio, contas, juridico

### Integracao Linear <-> GitHub
- Linkar commits/PRs a issues do Linear
- Issue fecha automaticamente quando PR e mergeado (configuravel)
