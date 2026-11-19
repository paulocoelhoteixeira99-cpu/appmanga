# Manga — Checkpoint de produto

**Versão:** 1.12 · **Atualizado em:** 24/09/2026 · **Checkpoint inicial:** 23/09/2026  
**Fontes exclusivas:** conversa [Fluxos e mapa do Manga](chatgpt-conversation://6ab3220b-eb44-83e9-9ccd-fb266aac189c) e atualizações fornecidas pelo usuário nesta tarefa: **U01 — Configurações e pendências**, **U02 — UX Principles e Onboarding V1** e **U03 — Architecture Check 01 do Onboarding**.  
**Recorte:** núcleo até H01, Configurações, pendências de recorrência e decisões de experiência do Onboarding V1. Detalhes ainda abertos permanecem classificados como pendentes.  
**Natureza:** fonte de verdade da arquitetura de produto discutida; não representa funcionalidades implementadas ou especificação técnica concluída.

**Fonte adicional:** **U04 — CHECK 02 — METAS**, atualização fornecida pelo usuário nesta tarefa; incorporada nas definições afetadas e na seção 24.

**Fonte adicional:** **U05 — CHECK 03 — SALDO & TRANSAÇÕES**, fornecida pelo usuário nesta tarefa; regras consolidadas na seção 25 e CHECK 03 na seção 26. Decisões novas prevalecem sobre propostas anteriores identificadas como substituídas.

**Fonte adicional:** **U06 — CHECK 04 — CATEGORIAS**, fornecida pelo usuário nesta tarefa; incorporada nas definições afetadas, nas dependências da seção 25 e na seção 27. Arquitetura funcional principal de Categorias validada.

**Fonte adicional:** **U07 — CHECK 05 — HOME & MANGA INSIGHTS**, fornecida pelo usuário nesta tarefa; seção 28 e definições transversais atualizadas. Substitui o limite anterior de um Insight por até três e fecha rankings iniciais, sem definir a arquitetura técnica do Engine.

**Fonte adicional:** **U08 — CHECK 06 — CONTA & CONFIGURAÇÕES**; seção 29 e definições afetadas. Na decisão histórica U08, Ajuste pertencia a Saldo; U10 o move para backlog. Notificações no MVP; Dark Mode no backlog; dados pessoais, autenticação, segurança e requisitos legais/privacidade são prioridade antes do primeiro Beta.

**Fonte adicional: U09 — CHECK 07.1–07.4 — Cross-flow & Regras Globais**, mensagem do usuário nesta tarefa. Integração na seção 30 e nas definições afetadas. **Na revisão U09, CHECK 07.5 ainda não havia sido realizado; foi fechado em U10, com prazo obrigatório pendente.**

**Fonte adicional: U10 — CHECK 07.5 e CHECK 07.6**, texto fornecido pelo usuário, incorporado na seção 31 e nas definições afetadas. Ajuste/Reconciliamento sai do MVP; referências históricas de Categorias excluídas são preservadas; prazo obrigatório de Meta permanece em alinhamento.

**Fonte adicional: U11 — CHECK 07.7 — Limites, validações e prevenção de estados impossíveis**, mensagem do usuário nesta tarefa. Regras integradas e consolidadas na seção 32. **CHECK 07 concluído**, com alinhamentos explicitamente preservados.

**Fonte adicional: U12 — CHECK 08 — Onboarding ↔ App real**, mensagem do usuário nesta tarefa; seção 33 e definições afetadas. Funcionalmente fechado: Nome único, Saldo Inicial obrigatório, Categorias/Meta/reserva opcionais, idade e renda fora do onboarding. UAU e retomada permanecem em exploração/alinhamento.

## 1. Como ler este registro

Este documento preserva as decisões da conversa e distingue o que foi consolidado daquilo que foi apenas sugerido. As formulações entre aspas foram preservadas quando carregam uma distinção de produto. Valores, datas e mensagens dos exemplos não são parâmetros definitivos de cálculo nem copy final aprovada.

| Status | Significado |
|---|---|
| **Definido** | Decisão explícita ou incorporada às consolidações do fluxo, sem reversão posterior. |
| **Preliminar** | Direção conceitual registrada; faltam critérios, comportamento ou validação. |
| **Backlog** | Evolução explicitamente adiada; não é requisito do MVP atual. |
| **Pendente** | Questão que precisa ser resolvida; não equivale automaticamente a feature futura. |
| **Fora do escopo atual** | Exclusão deliberada deste ciclo ou do MVP indicado. |
| **Sugestão não fechada** | Possibilidade levantada na conversa, sem decisão suficiente para virar requisito. |
| **Dependência do Sistema** | Relação funcional entre uma ação e os dados/experiências que precisam mudar; não define implementação de backend. |
| **Pré-lançamento** | Alinhamento/estudo necessário antes do primeiro Beta; não é backlog opcional. |
| **Baixa Prioridade** | Evolução adiada com prioridade explicitamente baixa ou baixíssima; não integra o MVP. |

As referências **F01–F51** identificam as interações em ordem cronológica na [transcrição textual de apoio](/Users/mplayer/.codex/.chatgpt-projects/g-p-6ab33a44854081919383f24a683e4c9c/checkpoint-manga/fonte-conversa.md), que conserva os IDs originais. As imagens dos wireframes não foram usadas para deduzir decisões adicionais. Decisões textuais posteriores prevalecem sobre as primeiras hipóteses.

### Divergências que não devem virar decisões silenciosas

| Registro original | Tratamento neste checkpoint |
|---|---|
| H01 chama “M03 — Detalhes da Meta”. | Referência inconsistente com todo o inventário consolidado de Metas. Neste documento, **M03 = Seu Plano; M04 = Detalhes da Meta**. O destino funcional da Home continua sendo detalhes. |
| U04 cita M03 para detalhes/feedback e M04 para Editar Meta. | Mantido o inventário vigente: **M03 = Seu Plano, M04 = Detalhes, M05 = Editar**. Aplicar os comportamentos ao contexto funcional indicado, sem renumerar telas por suposição. Alterações de prazo continuam em M03.1; mudanças estruturais mostram impacto em qualquer ponto de edição. |
| A consolidação de Metas menciona seis experiências e depois sete. | Existem **seis IDs principais M01–M06 e a experiência de ajuste M03.1**. Etapas, estados e overlays não implicam páginas independentes. |
| S03 inicialmente exigia categoria para toda transação. | U05 remove Categoria de Entradas; **U06 fecha que Categoria é opcional para Saídas**, inclusive no formulário. “Sem categoria” representa ausência de vínculo, não uma entidade; U10 preserva referências históricas das Categorias excluídas. |
| C02 inicialmente avaliava ritmo pelo tempo transcorrido. | U06 substitui por **status factual no MVP: <80%, 80%–100%, >100%**. Tempo do mês pode contextualizar sem mudar status; status dinâmico e inteligência histórica sofisticada ficam no backlog. |
| S01 descrevia saldo acumulado separado do período. | U05 mantém saldo como realidade conhecida, mas reabre o efeito do seletor sobre Saldo e seu significado histórico. Não assumir saldo final, variação líquida ou acumulado histórico antes do alinhamento. |
| U01 classificava recorrências como pendência prioritária / possível backlog. | U05 decide **Backlog, fora do MVP**. Questões de funcionamento permanecem para a evolução futura. |
| C04 inicialmente deixou a vigência pendente. | U03 define efeito a partir do momento/período da alteração, preservando os valores históricos. Exemplo: alteração em outubro vale para outubro em diante; setembro permanece intacto. Implementação temporal precisa de alinhamento com Dev. |
| U02 propôs Despesa fixa declarada no onboarding. | U03 substitui essa proposta por Categorias + planejamento mensal, geridas em C01/C04. Não criar entidade separada apenas para o onboarding; Categoria não é conceitualmente sinônimo de despesa fixa. |
| Onboarding recebeu uma proposta O01–O06. | O roteiro original não é inventário aprovado. U02 registrou experiência V1 e ativação; U12 revisa obrigatoriedades e fluxo (seção 33), sem aprovar retroativamente aqueles IDs/telas. |
| “Ausência de dados nunca deve ser representada como valor zero”, mas categoria sem gastos pode mostrar R$0. | Distinguir desconhecimento de zero conhecido no período. A validação posterior favorece “Nenhum gasto neste mês” com ação contextual. |
| O usuário escreveu “tipo de Metas” ao elogiar Crítico/Oportunidade/Positivo. | O contexto e a resposta preservada identificam **tipos de insights**, não tipos de metas. |

## 2. Visão e tese do produto

**O Manga ajuda pessoas a alcançar seus objetivos e organiza as finanças a serviço disso. Metas é o núcleo da proposta de valor.**

Formulação do usuário: “Vamos trabalhar com o desejo de alcançar o objetivo ao invés de apenas organizar as finanças.”

O encadeamento discutido é:

**Desejo → Meta → Plano → Progresso → Orientação → Conquista.**

> “O usuário não quer gerenciar uma meta. Ele quer sentir que está avançando em direção a algo que deseja.”

O Manga não movimenta nem custodia dinheiro. É uma camada de gestão, acompanhamento e orientação. “Guardado na meta” significa valor declarado pelo usuário como destinado àquele objetivo, não dinheiro mantido pelo Manga.

O registro manual no app e o WhatsApp com IA foram previstos como entradas de dados do MVP do ecossistema. **O desenho de WhatsApp/IA foi separado e adiado para depois da experiência exclusiva do app.** Open Finance é evolução futura.

| Área | Papel / pergunta central |
|---|---|
| Metas | “O que eu quero alcançar e como estão meus objetivos?” |
| Saldo | “Como estão minhas finanças neste período?” |
| Transações | “O que aconteceu com meu dinheiro?” |
| Categorias | “Onde estou gastando?” e “Como estou me comportando neste tipo de gasto?” |
| Home | **“O que importa para mim agora?”** |

> “Saldo registra a realidade financeira. O Manga transforma essa realidade em orientação para os objetivos.”

**Ciclo central:** definir objetivo → receber plano → guardar → registrar → receber feedback → adaptar → continuar → conquistar.  
**Ciclo financeiro:** receber/gastar → registrar → entender → ajustar comportamento.

Fontes: F07–F09, F16, F18–F19, F27, F40–F41, F49.

## 3. Escopo e estado atual

| Área | Estado da definição | Observação |
|---|---|---|
| M01–M06 + M03.1 | Arquitetura funcional principal validada no CHECK 02 | Status inicial por desvio de uma contribuição mensal; exclusão no MVP, arquivamento no backlog, superação permitida. Plano fixo/adaptativo e relevância de feedbacks pendentes. |
| S01–S04 | Refinada no CHECK 03 | Entrada/Saída como fatos, Categorias só em Saídas, filtros definidos; Ajuste especial movido ao backlog em U10. Naming e efeito do período sobre Saldo pendentes. |
| C01–C04 | Arquitetura funcional principal validada no CHECK 04 | Status factual, comparação de três meses, paleta controlada, nomes únicos, planejamento imediato e histórico preservado. Vigência técnica e “Sem categoria” em C01 pendentes. |
| H01 | Arquitetura funcional principal validada no CHECK 05 | Até três Metas ativas e três Manga Insights; contexto atual, sem seletor de período; rankings iniciais definidos. |
| Sistema de orientações | Preliminar | Tipos e prioridades preservados; regras operacionais pendentes. |
| CFG01–CFG03 — Conta & Configurações | Arquitetura funcional validada no CHECK 06 | Conta e dados, notificações, privacidade/segurança após estudos, Sair/Excluir conta e versão quando aplicável. Sem seção Financeiro. IDs individuais ainda não distribuídos. |
| Transações recorrentes | Backlog — fora do MVP | U05 define escopo; funcionamento futuro ainda requer decisões. |
| Onboarding V1 | **U12 — funcionalmente fechado:** Saldo Inicial obrigatório ≥ R$0; Categorias, limites, primeira Meta e reserva opcionais. Sem renda/idade. Estruturas reais → preparação breve e verdadeira → UAU → Home. Detalhes na seção 33. |
| Perfil | Fora do escopo atual | Removido explicitamente por falta de necessidade. |
| WhatsApp + IA | Separado deste ciclo | Último, após consolidar o app; há premissas, não fluxo completo. |
| Open Finance | Futuro | Não integra o MVP atual. |
| Figma / Design System / UI | Etapa posterior | Primeiro mapear e documentar fluxos, interfaces e estados. |

O núcleo catalogado contém **15 IDs principais**: seis de Metas, quatro financeiros, quatro de Categorias e uma Home. M03.1 acrescenta uma experiência de ajuste. A atualização U01 acrescenta a faixa **CFG01–CFG03**, ainda sem definição individual de cada interface. Essa contagem editorial não equivale ao número final de telas.

Fontes: F06, F18, F27, F36, F40–F41, F49.

Atualização de Configurações e recorrências: U01; detalhes nas seções 19–20.

## 4. Metas — inventário, regras e fluxos

### M01 — Suas Metas

**Definido.** Hub dos objetivos e da evolução do usuário.

- Resumo do **total atualmente guardado em todas as metas**, com caráter motivacional/de conquista.
- Cards com nome, imagem/ícone, valor atual × objetivo, percentual, prazo e indicador de andamento.
- Status iniciais do MVP: **Adiantada, No ritmo, Precisa de atenção, Concluída**. U04 usa uma contribuição mensal planejada como unidade de desvio; regra detalhada na seção 24.1. Cores não foram fechadas.
- Criar → M02; abrir card → M04. Edição/exclusão ficam no contexto de detalhes.
- Metas concluídas permanecem em M01 **abaixo das ativas, em seção colapsável**, com quantidade indicada conceitualmente (“Metas concluídas (3)”). A seção pode ficar recolhida; expandir permite abrir detalhes e histórico em M04 Concluída (U04).

**Estados:** sem metas; com metas; com metas concluídas. U10 define taxonomia de estados e resiliência; tratamento visual de loading/erro continua a detalhar. Ativas e concluídas possuem estados independentes.

### M02 — Criar Meta

**Definido.** Fluxo progressivo, leve, com uma decisão principal por vez. Cinco etapas cognitivas, não cinco funcionalidades independentes.

| Etapa | Pergunta preservada | Dado / regra |
|---|---|---|
| M02.1 | “O que você quer conquistar?” | Nome/objetivo livre; não impor categorias de objetivos. |
| M02.2 | “Quanto você precisa?” | Valor objetivo obrigatório e > R$0; editável enquanto ativa. Após conclusão/celebração, fica travado (U10). |
| M02.3 | “Já tem algo guardado?” | Valor inicial; pode ser zero / “Ainda não comecei”. |
| M02.4 | “Quando quer alcançar?” | Obrigatoriedade do prazo ainda pendente; quando informado, data-alvo > hoje (U11). Alinhar impacto em plano, estados e projeções. |
| M02.5 | “Deixe com a sua cara” | Imagem/ícone e etiquetas opcionais; pode haver representação padrão. |

Voltar preserva os dados. Havendo valor inicial positivo, ele gera a primeira movimentação no histórico da meta; valor inicial zero é estado, não evento de reserva de R$0 (U11). O plano considera o **valor que falta**, descontando o já guardado.

O fluxo termina em **“Ver meu plano” → M03**, não em uma tela genérica de sucesso.

**Estados:** preenchimento, validação, voltar e continuar. U11 define data-alvo > hoje quando informada. Detalhes restantes de plano com prazo curto ou restante zero não recebem regras adicionais nesta revisão. Salvar rascunho ao interromper foi sugerido como melhoria não obrigatória do MVP.

### M03 — Seu Plano

**Definido.** Transformar a meta em um plano simples e acionável.

- Resumo do objetivo, valor total, já guardado, restante e prazo.
- Contribuição mensal em destaque; referência semanal secundária.
- Explicação da origem do cálculo e representação da trajetória até a conquista.
- Ações **Começar meu plano** e **Ajustar plano**.
- **[MVP / Regra de UX — U04]** Toda criação, inclusive fora do onboarding, apresenta um plano compreensível antes da confirmação. Pode oferecer recomendação principal, alternativa mais conservadora, mais acelerada e definição manual; sugestões não são obrigatórias e nomes finais ficam para UX Writing/UI.
- Ao aceitar o plano, a meta é efetivamente criada/ativada e o usuário segue para M04. A persistência de rascunhos antes disso não foi especificada.

> “Criar uma meta não termina no cadastro. Termina quando o usuário entende como pode alcançá-la.”

**Estados:** plano sugerido e plano ajustado. O MVP pode calcular a partir do objetivo, valor restante e prazo. Avaliar viabilidade financeira exige dados suficientes; não afirmar que um plano cabe no orçamento sem base.

### M03.1 — Ajustar Plano

**Definido, inclusive no fluxo atual.** Não é backlog.

**Quanto consigo guardar por mês ⇄ Quando alcanço a meta.** Alterar contribuição recalcula prazo; alterar prazo recalcula contribuição. Mostrar consequência imediatamente. Alternativas calculadas também foram incorporadas à arquitetura; sua apresentação visual não foi fixada.

> “O Manga sugere um plano, mas o usuário define o compromisso.”

Pode ser acessada na criação, em M04, por impacto de edição do valor objetivo ou após movimentação significativa. Confirmar o plano leva ao acompanhamento em M04.

### M04 — Detalhes da Meta

**Definido.** “Como estou indo e o que preciso fazer agora para alcançar meu objetivo?”

| Bloco | Conteúdo |
|---|---|
| Identidade | Nome, imagem/ícone, prazo; etiquetas como apoio. |
| Progresso | Valor atual / objetivo, percentual e quanto falta. |
| Andamento | Status e comparação entre previsto e realizado. |
| Plano | Contribuição mensal, guardado no mês, restante no mês, previsão; próximo objetivo foi exemplificado. |
| Orientação | Próxima ação útil, inicialmente com base matemática. |
| Histórico | Movimentações recentes e acesso ao histórico completo. |
| Ações | Atualizar progresso → M06; ajustar plano → M03.1; editar → M05; excluir → confirmação. |

**Estados:** Adiantada, No ritmo, Precisa de atenção e Concluída. “Sem dados suficientes” foi levantado como estado a prever/validar para evitar falsa precisão em metas recém-criadas.

Ao alcançar ou ultrapassar o objetivo, o status é **Concluída**. Há celebração própria; superação tem cenário de comemoração diferente ou mais enfático. **Permitir valores acima de 100%**, sem bloquear movimentações. A barra pode permanecer em 100%, mas valores reais continuam visíveis (ex.: R$15.500 / R$15.000). Repetição e regras operacionais da celebração continuam pendentes; não foi criada M07. O histórico completo também não recebeu novo ID.

> “M04 não deve ser uma tela de relatório. Deve ser uma tela de acompanhamento e ação.”

### M05 — Editar Meta

**Definido.** Alterar nome, imagem/ícone, etiquetas e valor objetivo.

**U10:** após conclusão e celebração, valor objetivo e prazo/data-alvo ficam travados. Novo objetivo exige nova Meta; edições simples como nome podem continuar quando fizer sentido. Meta ativa pode reduzir objetivo abaixo do reservado e concluir acima de 100%, mostrando impacto antes de confirmar. Obrigatoriedade do prazo ainda está em alinhamento.

**Prazo e contribuição pertencem ao ajuste do plano em M03.1.** A sugestão inicial de prazo no formulário convencional foi substituída por essa separação.

- Mudança de identidade: salvar → M04.
- Mudança estrutural (valor objetivo, prazo ou outro elemento que altere o plano): **recalcular e mostrar consequência antes da confirmação**, inclusive comparação de referência anterior e nova. Reutilizar M03.1 quando aplicável; nome, imagem/ícone e etiquetas podem ser salvos normalmente.
- **[MVP — U04] Excluir Meta:** confirmação explícita, deixando claro que devolve todo o valor reservado ao Disponível, sem criar Entrada/Saída ou alterar Transações existentes. Arquivar/abandonar/cancelar preservando histórico é **backlog**, não alternativa obrigatória do MVP. Detalhes técnicos de retenção/exclusão não foram especificados.

### M06 — Atualizar Progresso

**Definido.** Um fluxo com duas modalidades: **“Guardei dinheiro”** e **“Precisei usar dinheiro”**.

Campos: **valor + data (Hoje por padrão) + observação opcional**. **U09:** são eventos de reserva/retirada com efeito no Disponível, sem gerar Entrada/Saída. Reserva limitada ao Disponível; Meta nunca negativa. Mesmo evento aparece nos históricos financeiro e da Meta, sem duplicação.

Registrar atualiza valor atual, percentual, restante e andamento/status; acompanhamento e impacto no plano devem refletir a movimentação. **U04 reabre explicitamente a decisão sobre recalcular automaticamente a referência mensal: plano fixo × adaptativo permanece em alinhamento PD/PM ↔ Dev.** Não assumir qualquer dos modelos ao especificar previsão/contribuição.

| Consequência | Comportamento |
|---|---|
| Mudança normal | Voltar a M04 com valores atualizados e feedback contextual. |
| Retirada com impacto significativo | Explicar impacto; oferecer **Rever meu plano → M03.1**, com possibilidade de adiar. |
| Avanço significativo | Mostrar antecipação possível; permitir manter plano ou ajustar contribuição. |
| Meta alcança ou supera objetivo | Celebração de conclusão ou cenário próprio de superação → M04 Concluída; valores acima do objetivo são permitidos. |

Não interromper toda pequena movimentação. O limiar de impacto significativo permanece pendente.

**U04 — [Pendente / Sistema de Orientações]:** a tabela descreve intenções, não thresholds fechados. Distinguir confirmação, feedback contextual, reforço positivo, alerta/orientação e celebração. Avaliar uma lógica compartilhada de relevância; não estender automaticamente o limiar de status aos feedbacks.

### Mapa de Metas

```text
M01 → criar → M02 → M03 → aceitar → M04
                         └→ ajustar → M03.1 → confirmar → M04
M01 → abrir meta → M04
M04 → atualizar progresso → M06 → feedback / celebração → M04
M06 → impacto relevante → oferecer M03.1
M04 → ajustar plano → M03.1 → M04
M04 → editar → M05 → M04 ou impacto no plano → M03.1
M04/M05 → excluir → confirmação → reserva devolvida ao Disponível [sem Entrada]
```

**Distinção central:** objetivo = M05; plano = M03.1; progresso = M06.  
Fontes: F07–F18; consolidação principal F18.

## 5. Saldo e Transações — inventário, regras e fluxos

### S01 — Saldo

**Definido.** Situação financeira, movimentações do período e acesso ao que forma os valores.

- Período explícito.
- **Saldo acompanhado:** realidade financeira conhecida pelo Manga, diferente de disponibilidade bancária garantida. **U05:** efeito do seletor de período sobre esse valor e significado em períodos passados permanecem em alinhamento; não assumir cálculo histórico definitivo.
- **Entradas, Saídas e Resultado:** movimentações e diferença no período.
- Evolução financeira do período, transações recentes e “Ver todas”.
- Nova transação → S03; transação recente → S04.
- Entradas → S02 com tipo Entrada + período; Saídas → S02 com tipo Saída + período; Ver todas → S02 com Todas + período.

Na S01, Saldo é informativo, não um filtro equivalente a Entradas/Saídas; U05 deixa em aberto sua relação com o período selecionado. Na Home, tocar no saldo abre S01: são contextos diferentes.

### S02 — Transações

**Definido.** Uma única experiência com **Todas | Entradas | Saídas**, período, busca e filtros.

- Preserva tipo e período recebidos da origem; permite alternar tipo sem voltar.
- Movimentações agrupadas por data; item com identificação/descrição, categoria e valor com sinal. Ícone pode apoiar.
- Origem, observação e outros detalhes não precisam ocupar a lista; ficam em S04.
- Abrir transação → S04; nova transação → S03.
- Busca e resultados são estados de S02, não uma nova tela.
- **[MVP — U05] Busca textual e filtros por Tipo, Categoria e Período.** Tipos: Todos/Entradas/Saídas. Valor e origem permanecem possibilidades sem inclusão definida.

**Estados:** padrão/todas, entradas, saídas, busca, filtrada, sem transações no contexto, sem resultados de busca/filtro.

### S03 — Nova Transação

**Definido.** Entrada e Saída são modalidades da mesma experiência. Prioridade: rapidez, valor em destaque e tipo claramente visível.

| Informação | Definição registrada |
|---|---|
| Tipo | Entrada ou Saída; pode vir do contexto. |
| Valor | Obrigatório, > R$0, magnitude positiva e até centavos na experiência (U11). |
| Descrição | **Obrigatória no MVP**; “Com o que você gastou?” / “De onde veio esse dinheiro?”. U11 mantém a decisão até revisão com Dev sobre fricção e qualidade do histórico. |
| Categoria | **Opcional para Saída; não aplicável a Entrada (U06).** Saída → Entrada remove vínculo. Saída sem vínculo aparece como “Sem categoria”. |
| Data | Obrigatória; Hoje como padrão; marco do Saldo Inicial ≤ movimentação ≤ hoje, inclusive edição retroativa. |
| Observação | Opcional; não precisa estar aberta por padrão. |

Sugestão de categoria foi discutida como redução de esforço; confiança mínima e confirmação da IA não estão especificadas. U09 mantém escolha opcional, sem inferência automática no fluxo de conversão Entrada → Saída; não aprovar automação por esta hipótese anterior.

**[MVP / Regra de UX — U05]** Entrar pela Categoria pré-seleciona Saída + Categoria, mas **Tipo permanece visível e editável**. Se mudar para Entrada, remover associação à Categoria. U10 remove Ajuste especial do MVP; correção de divergência pode usar Entrada/Saída normal e participa das respectivas métricas.

Salvar atualiza dados dependentes e retorna ao contexto de origem, sem página genérica de sucesso. Home, Saldo e Categoria reutilizam S03.

**Receber dinheiro não significa reservá-lo automaticamente para uma meta.** Um lembrete após entrada foi sugerido como oportunidade, não requisito fechado.

### S04 — Detalhes da Transação

**Definido.** Identificação, valor, tipo, categoria, data, observação e origem informativa — Manual/App, WhatsApp; Open Finance no futuro.

- Editar os campos da S03; edição é estado/experiência de S04, sem novo ID S05.
- Corrigir categoria. U09 não autoriza inferência automática ao converter Entrada em Saída; inteligência/categorização futura permanece separada.
- Excluir com confirmação; recalcular os valores dependentes e retornar ao contexto financeiro.
- Mudança de data precisa atualizar os períodos afetados; mudança de categoria atualiza os agrupamentos envolvidos.
- **[MVP / Regra de UX — U05]** Editar Tipo exige confirmação explícita explicando o impacto antes de efetivar; Dialog/Modal/Sheet a definir na UI. Saída → Entrada remove Categoria e recalcula mudança de sinal e derivados.

> “O usuário sempre deve conseguir corrigir aquilo que o Manga inferiu.”

### Regras financeiras fundamentais

**U10: Saldo Inicial + Entradas − Saídas − reservas em Metas + retiradas/devoluções de Metas = Disponível.** Eventos de devolução são contabilizados uma única vez. Saldo representa dinheiro ainda utilizável conhecido pelo Manga, não patrimônio total.

1. Saldo inicial é posição inicial, **não entrada**.
2. **U10:** Ajuste/Reconciliamento especial fica no backlog. No MVP, divergência pode ser corrigida por Entrada/Saída normal, compondo métricas; limitação aceita para reduzir escopo.
3. Resultado do período e saldo acumulado têm significados distintos.
4. Sem ponto inicial conhecido, não apresentar a diferença entre entradas e saídas como saldo confiável. O detalhamento de “Definir depois” e “Corrigir saldo” ficou para onboarding/configuração.
5. Saldo negativo é suportado; não é erro técnico.
6. Criar, editar ou excluir transação recalcula saldo, entradas/saídas, categorias, gráficos e insights. São leituras dos mesmos dados financeiros.
7. Origem do registro muda; seu significado financeiro não. App e WhatsApp compartilham o modelo de transação; Open Finance deverá reutilizá-lo futuramente.
8. Reservar R$600 para uma meta não cria saída de R$600. O dinheiro continua existindo; o registro de reserva pertence à meta.

**Complementos U05:** **U09 substitui a relação anterior com Saldo:** retirar valor da Meta aumenta o Disponível sem criar Entrada; reservar reduz o Disponível sem criar Saída. Saída é permitida mesmo com saldo conhecido insuficiente. **U10 substitui a decisão anterior de Ajuste especial:** recurso fora do MVP; Entrada/Saída corretiva afeta métricas. Não editar silenciosamente Saldo Inicial. Transações futuras e recorrentes ficam no backlog. Dependências completas na seção 25.

### Mapa financeiro

```text
S01 → Entradas / Saídas / Ver todas → S02 [tipo + período]
S01 → transação recente → S04
S02 → transação → S04 → editar ou excluir → recalcular
S01/S02 → nova transação → S03 → salvar → origem atualizada
```

Fontes: F19–F27; consolidação principal F27; entry points F37 e F49.

## 6. Categorias — inventário, regras e fluxos

**Definição:** “Categoria é um agrupamento personalizado de gastos que pode, opcionalmente, ter um limite mensal definido pelo usuário.”

**Refinamento U06 — [Regra de Negócio]:** Categoria é uma estrutura criada pelo usuário para **organizar e planejar suas Saídas**. Não possui dinheiro, não é Transação e não altera Saldo diretamente; organiza Saídas que alteram Saldo. Só se vincula a Saídas, e esse vínculo é opcional.

O usuário decide o que quer acompanhar: Rolê, Cafés, Locomoção, Games etc. **“O Manga não impõe uma taxonomia de categorias, mas pode sugerir um ponto de partida editável.”** U03 inclui no MVP sugestões durante o onboarding, como Alimentação, Moradia, Transporte e Lazer. O usuário pode manter, editar nome, personalizar, remover ou adicionar outras. Não são categorias obrigatórias.

**Categoria = acompanhamento. Limite = planejamento opcional sobre uma categoria.** O limite foi explicitamente incorporado ao MVP após a primeira hipótese sem orçamento.

### C01 — Categorias

**Definido.** Período → total gasto → distribuição proporcional → cards das categorias → criar/acessar.

- Total, distribuição e valores dos cards referem-se ao mesmo período.
- **[MVP — U06]** C01 abre no mês atual; outro mês mostra total/distribuição/realizado daquele mês e planejamento então válido. Distribuição usa exclusivamente gastos realizados, nunca valores planejados.
- Cards: nome, ícone, cor, gasto atual e limite quando existir.
- Com limite: gasto / limite, barra com significado explícito, restante ou valor acima do planejado.
- Sem limite: gasto e quantidade de gastos; sem barra de progresso contra um teto inexistente.
- Abrir → C02; criar → C03.
- Tipo de gráfico e solução para muitas categorias ficam para UI.

### C02 — Detalhes da Categoria

**Definido, refinado por U06.** Identidade (nome, ícone, cor), realizado do período, planejamento quando houver, progresso factual, histórico recente, transações, adicionar movimentação e editar Categoria.

- Com limite: gasto, teto, percentual utilizado e restante/excedente.
- Sem limite: gasto e histórico; opção de definir limite, sem avaliação contra teto.
- **Status factual MVP:** abaixo de 80% → Dentro do planejado; de 80% a 100% → Atenção/próximo do planejamento; acima de 100% → Acima do planejado. Naming final em UX Writing. Sem planejamento, sem percentual/restante/status de limite.
- Percentual do mês transcorrido pode aparecer como contexto, **sem alterar automaticamente o status no MVP**. Avaliação dinâmica de ritmo fica no backlog.
- **Comparação simples dos últimos três meses**, com gastos realizados e contexto do planejamento vigente. Exemplo de U06: setembro, agosto e julho. Dados podem alimentar Manga Insights.
- Manga Insights oferece compreensão a partir de regras/comparações; não exige IA. Inteligência histórica sofisticada e conexão personalizada permanecem evoluções dependentes de dados.
- Lista de gastos → abrir S04. “Ver todos” foi mencionado, sem destino final explicitamente fechado.
- Adicionar gasto → S03 como Saída + categoria preenchida, ainda editável.
- Editar → C04. Edição direta do limite em C02 foi proposta; sua forma final não foi fechada.

### C03 — Criar Categoria

**Definido.** Nome válido obrigatório, ícone e cor; limite mensal opcional, mas > R$0 quando informado (U11). Ausência de limite não é limite zero.

**U06 — [MVP / Regra Global]:** impedir nomes duplicados no mesmo tipo de entidade (inicialmente Categorias e Metas). Cores vêm de **paleta controlada do Manga**, sem seleção totalmente livre; paleta exata em DS Gap Analysis/UI.

Formulação preservada: **“Quanto você pretende gastar por mês?”**  
Apoio: “Vamos acompanhar seus gastos e avisar quando estiver se aproximando desse valor.”

Criar → C01, com confirmação simples (“Categoria Cafés criada.”). Não exige tela de sucesso nem revisão de transações antigas. **C03.1 — sugestões de gastos antigos é backlog**, apesar de ter aparecido em um diagrama exploratório.

Sugestão automática de ícone/cor foi levantada como possibilidade, sem compromisso de entrega no MVP.

### C04 — Editar Categoria

**Definido.** Nome válido, ícone, cor e limite opcional (> R$0 quando existe). Salvar → C02. U11 permite reduzir limite abaixo do realizado, comunicando impacto antes de confirmar e preservando fatos. **U06: alteração do planejamento no mês atual vale imediatamente**, preservando valor anterior, novo valor e quando mudou. Meses anteriores não são reinterpretados; granularidade/versionamento ainda em alinhamento Dev. C04 também edita Categorias do onboarding.

**Alterar limite não reescreve o histórico.** Se o limite de agosto era R$300, a comparação histórica continua usando R$300.

Excluir → confirmação de impacto → C01. **Excluir categoria nunca exclui transações:** **U10:** registros e classificação histórica são preservados; Categoria deixa de estar ativa e disponível para novos vínculos. Saldo não muda. Não transformar automaticamente fatos passados em “Sem categoria”.

C04 não gerencia transações. Corrigir vínculo é **C02 → S04 → alterar categoria**.

### Regras de Categorias

1. Limite é opcional e mensal; pertence à categoria, com avaliação mensal.
2. Limite orienta, **não bloqueia gastos**.
3. Sem limite, não mostrar restante, percentual de teto ou avaliação de ritmo contra um teto inventado.
4. Novo período reinicia a apuração mensal; o anterior permanece no histórico.
5. Alterações de planejamento/limite mudam o presente e o futuro a partir do momento/período da alteração; períodos anteriores mantêm o valor então vigente. Modelo de vigência precisa de alinhamento com Dev (U03).
6. Exclusão preserva transações.
7. Vínculo acontece em S03, por correção em S04 ou, futuramente no fluxo separado, por interpretação de WhatsApp/IA.
8. Sugestão de redefinir limite respeita a intenção: **manter para reduzir gastos** ou **ajustar à realidade**. Não aumentar automaticamente porque o usuário costuma ultrapassar.
9. O Manga interpreta padrões e orienta; não julga transações individuais.
10. **[Regra de Negócio] Planejado ≠ Realizado.** O planejamento mensal não cria transação; gasto realizado é calculado exclusivamente das transações efetivamente registradas.
11. **[MVP]** Categorias configuradas no onboarding existem normalmente em C01 e são editáveis em C04; não criar Despesa fixa declarada como entidade separada apenas para atender ao onboarding.
12. **[Regra de UX]** Informar que o planejamento é uma referência ajustável: “Use esse valor como referência para o seu mês. Você poderá ajustá-lo quando quiser.”
13. **[Regra de UX — U06]** Acima do planejamento, informar o excedente sem julgar; não sugerir automaticamente aumentar o planejamento apenas por ter ultrapassado.

```text
C01 → abrir → C02 → editar → C04 → salvar → C02
C01 → criar → C03 → C01
C02 → gasto → S04 → corrigir vínculo → recalcular
C02 → adicionar gasto → S03 [Saída + categoria]
C04 → excluir → confirmação → C01 [transações preservadas]
```

Fontes: F30–F37; consolidação principal F36.

## 7. H01 — Home

**Definido.**

> “A Home não é um dashboard financeiro. É uma superfície de prioridade que mostra onde o usuário quer chegar, o que merece atenção agora e sua situação financeira essencial.”

**Arquitetura V1 atualizada por U07:** **Metas → Contexto financeiro → Manga Insights → Ação rápida → Navbar**. Ordem inicial refinável em wireframes/testes; os cinco blocos estão fechados. Não adicionar/remover módulos sem nova decisão explícita. Home representa o período atual, sem seletor de período no MVP.

| Bloco | Conteúdo e comportamento |
|---|---|
| Metas | Protagonismo; uma meta em card único, duas ou mais com possibilidade de carrossel; máximo três e “Ver todas”. Nome, imagem/ícone, progresso, status e informação do plano/próximo passo. |
| Manga Insights | Até **três** no MVP (substitui limite de um). P1 → P2 → P3, depois recência dentro da prioridade. Sem conteúdo relevante, seção ausente. |
| Seu dinheiro | Saldo acompanhado como posição atual; Entradas/Saídas referentes a “Neste mês”. |
| Registrar | Ação rápida de Entrada/Saída, reutilizando S03. |
| Navegação | Acesso às áreas do app; configuração visual final não detalhada. |

**Destinos:** card de meta → M04; Ver todas → M01; saldo → S01; Entradas/Saídas → S02 com tipo + período; insight de categoria → C02; primeira meta → M02.

Categorias não têm bloco permanente. Aparecem quando produzem informação relevante via insight. A Home não lista todas as metas, todas as categorias ou histórico financeiro.

**Meta Principal / Meta Foco permanece no backlog. U07 define até três Metas ativas**, priorizando: precisam de atenção → mais próximas da conclusão financeira (percentual de progresso) → criadas mais recentemente. Proximidade do prazo pode desempatar quando necessário; sem ranking sofisticado. A hipótese anterior de insight crítico acima das Metas não substitui a ordem inicial V1 definida por U07.

### Estados de H01

| Estado | Comportamento |
|---|---|
| Sem metas | Empty state de valor + criar primeira meta → M02. |
| Uma meta | Card único, sem carrossel desnecessário. |
| Duas ou mais | Até três metas; acesso à lista completa. |
| Com insights relevantes | Até três, ordenados por prioridade e recência; vários P1 podem ocupar todas as posições. |
| Sem insight relevante | Não renderizar bloco nem placeholder “Nenhum insight”. |
| Sem dados financeiros | Orientar registro; não mostrar saldo zero como se conhecido. |
| Saldo conhecido, sem movimentações no mês | Mostrar saldo + “Nenhuma movimentação neste mês” + registrar. |
| Dados financeiros disponíveis | Saldo + Entradas/Saídas do mês. |
| Meta concluída | Estado positivo/celebração; detalhamento na Home pendente. |

Esses estados podem coexistir. A Home pode ficar menor quando não houver insight.

Fontes: F42–F49; consolidação principal F49.

## 8. Entry points e preservação de contexto

**U12 — entrada inicial:** Conta/Acesso → Nome → Saldo Inicial → Categorias/limites opcionais → Meta/reserva opcionais → preparação → UAU → Home. Entidades confirmadas são reais e editadas nas features; reserva segue fluxo financeiro global. Sem renda/idade, Transação obrigatória ou barreira push.

> “O contexto muda a porta de entrada, mas não deve criar uma nova experiência de cadastro.”

| Origem | Ação | Destino / contexto |
|---|---|---|
| Home | + Registrar | S03; escolher Entrada/Saída. |
| Saldo | + Nova transação | S03; Entrada/Saída. |
| Transações | Nova transação | S03, acessível sem voltar a S01. |
| Categoria | + Adicionar gasto | S03, Saída + categoria pré-selecionada; pode corrigir. |
| Meta | Adicionar/retirar | M06, com a meta conhecida; não abre S03. |
| Home / S01 | Tocar em Entradas ou Saídas | S02 com tipo e período da origem. |
| C02 | Abrir gasto | S04; reaproveita a experiência financeira. |
| WhatsApp, depois | Mensagem | Mesmo modelo financeiro ou de progresso conforme intenção; experiência ainda separada. |

> “Quanto mais contexto o Manga possui, menos perguntas faz.”

As origens novas não acrescentam telas principais. O retorno após cadastro preserva o contexto, com dados atualizados.

Fontes: F20–F23, F37, F46–F49.

## 9. Estados vazios e confiança nos dados

**U10 — taxonomia global:** Empty State = entidade/informação ainda não existe; Zero State = estrutura existente com zero legítimo; Insufficient Data = dados insuficientes para análise de qualidade; Error State = falha em informação que deveria estar disponível. R$0 não é ausência; ausência não é R$0. Definições e integridade na seção 31.2.

Categoria existente sem movimentos continua na lista; seu histórico pode oferecer “Adicionar transação”. Sem Categorias criadas, preservar gastos em “Sem categoria” e incentivar criação sem escondê-los. Metas ativas e concluídas têm estados independentes. Falhas isoladas devem afetar só o bloco relacionado quando tecnicamente possível; preservar preenchimento após falha ao salvar, permitir nova tentativa e impedir execução duplicada.

> “Quando faltar informação, o Manga explica o valor de fornecê-la e oferece o próximo passo mais simples.”

**Estrutural:** contexto → valor → ação; ensina e incentiva.  
**Contextual:** informa o resultado da situação atual, sem transformar toda ausência em mensagem promocional.

| Contexto | Formulação registrada / comportamento |
|---|---|
| H01 sem metas | “Qual é a sua próxima conquista?” → “Crie uma meta e o Manga ajuda você a transformar seu objetivo em um plano.” → Criar minha primeira meta. |
| M01 sem metas | “Transforme um objetivo em um plano.” → explicar valor → Criar primeira meta. |
| S02 sem transações | “Seu histórico começa aqui.” → incentivar registro de entrada/gasto → Registrar movimentação. |
| S02 sem resultados | Informar que não encontrou o termo; permitir tentar outro ou ajustar filtros. |
| C01 sem categorias | “O que você gostaria de acompanhar?” → categorias pessoais como Rolê, Cafés, Games → Criar primeira categoria. |
| C02 sem gastos no mês | “Nenhum gasto neste mês.” → explicar valor de registrar → Adicionar gasto, com contexto preenchido. |
| C02 com pouco histórico | “Ainda estamos conhecendo seus gastos com Cafés.” → explicar possibilidade futura de comparação. Não inventar tendência nem gráfico inútil com um ponto. |
| H01 sem informação financeira | “Comece a acompanhar seu dinheiro” → registrar movimentação. Configurar saldo como ação secundária depende do onboarding. |
| H01 sem insight | Nenhum bloco. |

**Ausência de informação ≠ zero.** Um valor inicial de meta explicitamente zero e nenhum gasto registrado num período são diferentes de saldo desconhecido. O texto não autoriza o Manga a concluir que conhece toda a vida financeira do usuário.

U10 define resiliência por bloco, preservação do preenchimento, proteção contra duplicidade e atomicidade. Visuais e mecanismos técnicos ainda não estão definidos; não inventar política de offline ou sincronização.

Fontes: F10, F18, F21, F24, F33, F36, F48–F49.

## 10. Princípios de UX e linguagem

**U12:** “O primeiro UAU do Manga vem de transformar informação em clareza, não de simular inteligência sem dados.” Coletar só o que tem finalidade clara; configurações opcionais não impedem começar; onboarding gera planejamento, não histórico/comportamento artificial. Reserva confirmada é fato real, sob regras globais.

**U11 — “Bloquear o impossível; orientar o desfavorável.”** Bloquear inconsistências e violações estruturais; permitir realidades válidas mesmo desfavoráveis, informando e orientando. Retirada maior que reserva é bloqueada com alternativa válida; Saída maior que Disponível é permitida sem confirmação adicional por esse motivo; redução de limite abaixo do gasto é permitida com comunicação do impacto. Relaciona-se a oferecer caminhos possíveis, comunicar consequências e interpretar apenas o que os dados sustentam.

**U10:** “Confirmações devem comunicar consequências, não apenas pedir certeza.” Ações destrutivas/relevantes exigem confirmação; alterações simples de nome/cor/ícone não precisam de confirmação além de Salvar. “O usuário informa o valor; o tipo da operação determina seu efeito financeiro”: magnitude positiva, sem exigir sinais. Integridade: uma intenção não pode gerar fatos duplicados; operações entre contextos são atômicas do ponto de vista do usuário.

Os princípios desta seção permanecem vigentes. A seção **21 — UX Principles** acrescenta e consolida as formulações de U02, como decisões transversais para a V1 e futuras evoluções, não como backlog.

| Princípio preservado | Aplicação |
|---|---|
| “O Manga pede apenas aquilo que ainda não sabe.” | Pré-preencher contexto; inferir apenas com segurança; reduzir perguntas. |
| “O usuário sempre deve conseguir corrigir aquilo que o Manga inferiu.” | Correção acessível em S04 e nos cadastros. |
| “O plano deve se adaptar à vida do usuário, e não exigir que a vida do usuário se adapte ao plano.” | Renegociação em M03.1, inclusive após imprevistos. |
| “O Manga sugere um plano, mas o usuário define o compromisso.” | Aceitação explícita; sem julgamento de contribuição/prazo escolhido. |
| **Mudança → consequência → decisão.** | Explicar impactos de objetivo/plano antes de comprometer a alteração; depois de movimentação, explicar impacto e oferecer ajuste. |
| “O app sempre tenta traduzir números em significado.” | Progresso contextualizado, próximo passo, prazo e contribuição compreensíveis. |
| Uma decisão principal por vez | Criação progressiva de meta; cadastro financeiro enxuto. |
| Não transformar tudo em página | Busca, edição de transação, confirmação e feedback podem ser estados; forma final pertence à UI. |
| Feedback proporcional | Confirmação discreta para rotina; celebração para conquista; renegociação quando impacto relevante. |
| “O Manga não julga o comportamento; interpreta e orienta.” | Evitar repreensão por um café ou aprovação/reprovação moral de planos. |
| “A Home prioriza; não resume o produto inteiro.” | Conteúdo limitado ao que importa agora. |
| “Ausência de informação relevante é melhor que informação de baixa relevância.” | Não fabricar dicas para preencher espaço. |
| Metas têm prioridade sobre informação financeira isolada | Orientação vinculada ao motivo de organizar as finanças. |
| Assertividade acompanha confiança nos dados | Separar fato, comparação, tendência e recomendação. |
| Empty state ajuda a produzir o próximo dado útil | Contexto, valor e ação; ausência não vira zero fictício. |

Fontes: F08, F11–F18, F22–F23, F32–F38, F44–F49.

## 11. Sistema preliminar de insights e orientações

**Nome da camada/experiência definido em U06: Manga Insights.** Transforma dados financeiros e de planejamento em informações relevantes e acionáveis. Pode usar regras, comparações matemáticas, histórico e comportamento observado; futuramente IA. **Não significa necessariamente Inteligência Artificial.** Sofisticação acompanha dados e confiança disponíveis.

**Status:** definições conceituais preservadas; mecanismo operacional ainda não especificado.

**Insight é conteúdo/interpretação. Superfície é onde ele aparece.** Toast, Home e modal não são tipos equivalentes de insight.

### 11.1 Tipos e hierarquia

| Tipo | Formulação preservada |
|---|---|
| **Crítico — precisa de atenção** | “Algo está comprometendo uma meta, plano ou decisão.” |
| **Oportunidade — existe algo útil a fazer** | “O Manga identificou uma ação que pode melhorar a situação ou acelerar um objetivo.” |
| **Positivo — reforço de progresso** | “Reconhece avanços, bons comportamentos e conquistas.” |

**Registro histórico:** Crítico → Oportunidade → Positivo era a hierarquia conceitual original. **U07 a operacionaliza no MVP como P1 — Requer atenção; P2 — Oportunidade; P3 — Positivo**, com ordenação por prioridade e depois recência. Não define score sofisticado. As formulações originais acima permanecem como contexto, não uma classificação concorrente.

### 11.2 Prioridade preliminar entre acontecimentos

**Contexto anterior preservado:** a lista abaixo registra a priorização preliminar discutida na conversa original. U07 define a regra operacional vigente **P1 → P2 → P3 e recência dentro da mesma prioridade**; a lista não adiciona critérios ocultos de desempate. Relevância por impacto/contexto/importância fica como evolução futura.

1. Algo comprometendo uma Meta.
2. Meta que exige ação agora.
3. Categoria em situação relevante.
4. Oportunidade financeira relacionada a uma Meta.
5. Progresso/conquista positiva.

> “Insights relacionados aos objetivos possuem maior peso que informações financeiras isoladas.”

A lista anterior expressa a tese de objetivos; **U07 define o desempate vigente por recência dentro da prioridade**. Os exemplos originais não instituem score oculto. Relevância sofisticada fica como evolução futura.

### 11.3 Maturidade conforme os dados

| Base disponível | O que sustenta | Exemplo registrado |
|---|---|---|
| Poucos dados | Fatos e status | “Você utilizou 80% do limite.” |
| Histórico | Comparações | “Você gastou 25% mais que no mês passado.” |
| Padrões | Tendências | “Seus gastos com Cafés estão aumentando.” |
| Contexto | Sugestões | “Seu limite tem sido difícil de manter.” |
| Contexto + metas | Recomendações personalizadas | “Reduzir R$60 em Cafés ajudaria no plano da sua viagem.” |

> “A assertividade do Manga deve acompanhar a quantidade e qualidade dos dados disponíveis.”

**U09 propõe, ainda para validação com Dev, pelo menos dois meses anteriores de coleta para Insights de comparação histórica.** Mês válido, meses vazios, categorias posteriores, retroatividade e suficiência por tipo seguem abertos. Não aplicar essa proposta a Insights sem dependência histórica. A comparação visual de três meses de C02 continua uma decisão distinta. Não afirmar sobra disponível para gastar quando só se conhecem renda e parte das despesas.

### 11.4 Estrutura da mensagem e superfícies

**O que aconteceu → por que importa → o que posso fazer, quando houver ação útil.** Celebração pode existir sem CTA.

| Superfície | Heurística preliminar |
|---|---|
| Toast | Confirma ação concluída: “Categoria criada.” |
| Inline / card | Orienta no contexto: “Você já utilizou 70% do seu limite.” |
| Home | Prioriza entre áreas; até três Manga Insights relevantes no MVP, conforme U07. |
| Sheet / modal | Solicita decisão importante; confirmação destrutiva ou rever plano. |
| WhatsApp / notificação | Reengajamento ou informação temporal; a definir no ciclo separado. |

A heurística não resolve sozinha frequência, persistência ou escolha de superfície. A taxonomia global ainda precisa ser especificada.

### 11.5 Catálogo de cenários recuperados

Esta tabela consolida os cenários discutidos; **não atribui regras finais de frequência, score ou superfície onde não foram definidas**.

| Cenário / gatilho conceitual | Conteúdo / ação discutida | Estado da definição |
|---|---|---|
| Meta abaixo do plano | Explicar diferença e o que falta; acompanhar/ajustar plano. | Orientação matemática no escopo; limiar pendente. |
| Meta no ritmo ou adiantada | Reconhecer progresso e possível antecipação. | Conceito definido; critérios pendentes. |
| Movimento comum em meta | Confirmar valor e atualizar M04. | Definido; proporcional e discreto. |
| Retirada significativa | Mostrar contribuição necessária ou mudança de previsão; rever plano / agora não. | Definido conceitualmente; “significativo” pendente. |
| Aporte significativo | Mostrar antecipação; manter plano ou reduzir contribuição. | Definido conceitualmente; gatilho exato pendente. |
| Meta atinge 100% | Celebrar conquista e abrir estado Concluída. | Definido; apresentação, repetição e retirada posterior pendentes. |
| Marco de progresso, como 50%/75% | Insight positivo, sem CTA obrigatório. | Exemplo; não constitui lista de marcos aprovada. |
| Edição do valor objetivo | Explicar impacto antes de decidir o novo plano. | Definido. |
| Categoria próxima/acima do planejamento | Informar quanto resta/excede; abrir categoria. | U06 define status factual em faixas de 80% e 100%; isso não define automaticamente regras de exibição de insights. |
| Consumo rápido no começo do mês | Relacionar percentual gasto ao tempo restante. | U06: tempo pode aparecer como fato; interpretação dinâmica fica no backlog. |
| Limite repetidamente difícil de manter | Histórico pode apoiar orientação futura. | Inteligência histórica sofisticada no backlog; não sugerir automaticamente aumentar planejamento. |
| Tendência/comparação de gastos | Comparar realizado com histórico. | Comparação simples de três meses no MVP; padrões sofisticados no backlog (U06). |
| Economia possível conectada à meta | Mostrar contribuição possível para o plano. | Evolução personalizada; depende de contexto. |
| Recebimento de renda / resultado positivo | Lembrar plano e permitir registrar reserva, sem movimentar automaticamente. | Sugestão não fechada. |
| Criar/editar/excluir | Confirmação de ação; exclusões pedem confirmação prévia. | Padrão conceitual; catálogo final de mensagens pendente. |
| IA incerta | Permitir confirmar/corrigir interpretação. | Direito de correção definido; política de confiança pendente. |
| Poucos dados | Explicar o que ainda será possível aprender. | Definido como princípio. |
| Categoria recém-criada com gastos antigos compatíveis | Oferecer revisão e vínculo com decisão do usuário. | Backlog explícito. |

Fontes: F15–F18, F22–F23, F32–F36, F44–F45, F48–F49.

## 12. Decisões do MVP

| Domínio | Compromisso atual de produto |
|---|---|
| Metas | Criar progressivamente; considerar valor inicial; gerar e aceitar plano; negociar contribuição × prazo; acompanhar progresso/status/histórico; adicionar/retirar; editar e ação de exclusão com confirmação; celebração de conclusão. |
| Financeiro | Registro manual de Entrada/Saída; visão de saldo e período; lista, busca e filtros básicos; detalhes, correção e exclusão; Saldo Inicial distinto de receita; Entrada/Saída corretiva compõe métricas; Ajuste especial fora do MVP (U10). |
| Categorias | Categorias pessoais com nome, ícone e cor; limite mensal opcional; criar/editar/excluir; vincular gastos; distribuição, detalhes, histórico, comparação e insights simples sustentados por dados. |
| Home | Cinco blocos V1; até três Metas ativas e três Insights; prioridade + recência dos Insights; contexto financeiro atual; ação rápida exclusiva Entrada/Saída; sem seletor de período nem bloco permanente de Categorias. |
| Experiência | Contexto reduz preenchimento; empty states úteis; dados desconhecidos não viram zero; usuário corrige inferências. |
| Onboarding V1 | **U12 — funcionalmente fechado:** Saldo Inicial obrigatório ≥ R$0; Categorias, limites, primeira Meta e reserva opcionais. Sem renda/idade. Estruturas reais → preparação breve e verdadeira → UAU → Home. Detalhes na seção 33. |
| Configurações | Conta e dados, Nome único obrigatório na identificação, editável em Conta e dados, preferências de notificação, logout e exclusão; privacidade/segurança após estudos. Sem Perfil, gestão financeira ou ajuste de saldo. Dark Mode no backlog (U08). |

“Conceito no MVP” não significa que uma regra pendente esteja resolvida. Status e detalhes técnicos das exclusões ainda requerem especificação. Ajuste de Saldo foi retirado do MVP em U10.

## 13. Backlog explicitamente separado

### 13.1 Itens adiados / evoluções registradas

| Item | Intenção preservada | Fonte |
|---|---|---|
| **Meta Principal / Meta Foco** | Usuário escolhe meta prioritária; pode influenciar Home, insights e recomendações. Não bloqueia MVP. | F43, F49 |
| **Sugerir transações antigas ao criar categoria** | Revisar gastos compatíveis e vincular por decisão do usuário; antigo C03.1. Fora do MVP por decisão explícita. | F34–F36 |
| Open Finance | Reduzir dependência de entrada manual e ampliar contexto. | F08, F23, F27 |
| Prazo obrigatório / opcional de Meta | **Reclassificado em U10 como alinhamento do MVP**, não backlog fechado. Avaliar valor e perdas de recursos sem prazo. | F11–F12, U10 |
| Recomendações personalizadas com histórico financeiro | Relacionar padrões de gasto à viabilidade e aceleração das metas. | F13, F15, F36, F49 |
| Priorização mais sofisticada e personalizada | Evoluir além da hierarquia preliminar. | F49 |
| Categorização progressivamente automática | Aprender com comportamento e correções do usuário. Sem promessa de aprendizado automático no MVP. | F23, F36 |
| Registro por linguagem natural dentro do app | Preencher transação a partir de “Gastei 85 no sushi”. | F22 |
| **Exportação de dados** | Permitir exportar informações do usuário; definir abrangência, formatos e representação de Metas, Categorias e Transações quando retomado. Fora do MVP atual. | U01 |
| **Separar gasto habitual de gasto pretendido** | Futuramente distinguir quanto normalmente gasto, quanto quero gastar e quanto efetivamente gastei. No MVP, perguntar apenas quanto pretende gastar por mês como planejamento/limite da Categoria. | U03 |
| **Gasto habitual observado** | Com histórico suficiente, distinguir habitual declarado, habitual observado, planejado e realizado; respeitar confiança nos dados. Não fixar janela de cálculo a partir dos exemplos. | U03 |
| **Arquivar / abandonar Meta** | Encerrar a busca de um objetivo sem excluir seu histórico; conceitos futuros arquivada, abandonada ou cancelada. Pode apoiar análises/inteligência; fora do MVP atual. | U04 |
| **Transações futuras/agendadas** | Definir realizada × prevista, impacto no saldo atual, previsão de saldo, edição/cancelamento, recorrências e comunicação visual. Não implementar simplesmente permitindo data futura. | U05 |
| **Transações recorrentes** | Fora do MVP: definir criação automática × confirmação, passagem a fato real, ocorrência × série, previsões, notificações, encerramento e relação com transações futuras. Substitui “possível backlog” de U01. | U05 |
| **Status dinâmico/contextual de Categorias** | Combinar percentual usado, tempo do mês, histórico, médias, padrão da Categoria e comportamento individual; validar necessidade/valor com usuários. MVP usa faixas factuais. | U06 |
| **Inteligência histórica sofisticada de Categorias / Manga Insights** | Identificar excesso recorrente, redução/aumento consistente, habitual, diferença entre planejamento e realidade e concentração de gastos no mês. Não inferir agressivamente no MVP. | U06 |
| **Relevância × recência de Manga Insights** | Futuramente considerar impacto, contexto e importância dentro da mesma prioridade. MVP usa prioridade → recência, sem ranking sofisticado. | U07 |
| **Resetar dados financeiros** | Apagar dados financeiros e começar novamente sem necessariamente excluir a conta. Fora do MVP; exige especificação cuidadosa das consequências destrutivas. | U08 |
| **Dark Mode** | Tema escuro fora do MVP; evolução futura do aplicativo e do Design System. | U08 |
| **Notificações granulares** | Futuramente avaliar preferências por Metas, alertas, Manga Insights, lembretes e recorrências. Controle inicial pode ser simples; não equivale a desligar Insights internos. | U08 |
| **Outros idiomas — baixa prioridade** | MVP em Português Brasileiro. Internacionalização permanece no backlog. | U08 |
| **Outras moedas — baixíssima prioridade** | MVP em BRL / R$. Evolução envolve histórico, metas, transações, conversão, câmbio, formatação e planejamento. | U08 |
| **Editar/corrigir Saldo Inicial — baixa prioridade** | Recalcular histórico posterior; MVP permite Entrada/Saída corretiva, com impacto nas métricas; sem experiência específica de edição do marco inicial (U10). | U09 |
| **Saída diretamente da reserva de Meta** | MVP exige retirar → Disponível → registrar Saída. | U09 |
| **Intenção de gasto separada de limite mensal** | Evolução de Categorias, sem nova entidade no MVP. | U09 |
| **Sugestão automática de redefinição de limite** | Evolução de inteligência/recomendação. | U09 |
| **Feedback inteligente após movimentações de Meta** | Definir relevância e comunicação, além da confirmação básica. | U09 |
| **Plano dinâmico de Meta** | Evolução; não assumir recálculo adaptativo como regra do MVP. | U09 |
| **Tratamento após retirada significativa** | Recomendações e orientação futura; limiar não definido. | U09 |
| **Undo/recuperação de Transações excluídas** | Avaliar caso se mostre necessário; fora da exclusão confirmada do MVP. | U09 |
| **Requisitos futuros de internacionalização** | Evolução vinculada aos idiomas e moedas já classificados. | U09 |
| **Ajuste/Reconciliamento de Saldo** | Fora do MVP em U10; investigar reconciliação sem Entrada/Saída, experiência/local, histórico, edição/exclusão, período, sugestões e Insights. | U10 |
| **Revalidação financeira após inatividade** | Investigar confirmação/correção do Disponível ao retornar; relacionar à reconciliação futura. Sem mecanismo automático no MVP. | U10 |

**U11:** Ajuste/Reconciliamento continua exclusivamente no backlog; moedas mantêm baixíssima prioridade. Rever descrição e Saldo Inicial negativo é alinhamento de decisões atuais, não aprovação de novos recursos. Nenhum outro item de backlog foi removido.

### 13.2 Sugestões mencionadas, sem compromisso de backlog priorizado

- Rascunho da criação de meta: melhoria não obrigatória, condicionada à simplicidade técnica (F18).
- Sugestão de imagem/ícone e cor a partir do nome/contexto (F11, F34).
- Lembrete após receita ou sobra do período para atualizar meta, sempre por declaração do usuário (F19, F22).
- Ação rápida de atualizar meta na Home (F42); o fluxo final mantém Entrada/Saída e movimentação no contexto da meta.

Essas possibilidades não devem ser incorporadas ao MVP por aparecerem neste documento.

## 14. Pendências e open questions

| ID | Tema | O que permanece aberto |
|---|---|---|
| P01 | Status das metas | **Regra inicial definida em U04:** desvio de aproximadamente uma contribuição mensal separa atenção/adiantamento de No ritmo; Concluída ao alcançar/superar objetivo. Detalhes de progresso esperado no tempo não foram especificados; não inventar regra diária, arredondamento ou cálculo intramês. |
| P02 | Movimentações significativas | Limiar que justifica orientação/renegociação ou feedback de avanço. |
| P03 | Retroatividade em metas | Detalhar retroatividade dos eventos de Meta sem duplicação e preservando planejamento histórico. U09 fixa o marco para Transações; não presumir regra técnica adicional para eventos de Meta. |
| P04 | Excluir × arquivar meta | **Escopo resolvido em U04:** excluir no MVP, com confirmação e devolvendo reservas ao Disponível sem gerar Entrada; arquivar/abandonar preservando histórico no backlog. Detalhes técnicos de exclusão/retenção ainda não especificados. |
| P05 | Conclusão e retirada posterior | Meta volta a ativa? Como tratar a conquista e nova celebração? |
| P06 | Validações do plano | Prazos passados/curtos demais e restante zero; critérios exatos não fechados. |
| P07 | Ajuste/Reconciliamento | **Backlog em U10.** Não existe no MVP; investigar experiência/local, histórico, edição/exclusão e impactos. Correção por Entrada/Saída normal participa das métricas. |
| P08 | Recorrência | **Backlog, fora do MVP (U05).** Pendências de criação, frequência, confirmação, ocorrência/série, previsões, notificações, encerramento e categorias permanecem para evolução. |
| P09 | Categorias e S03 | **Resolvido em U06:** Categoria opcional para Saídas; Entradas sem Categoria; U10: exclusão preserva Transações e classificação histórica sem alterar Saldo, impedindo novos vínculos. Representação em C01 separada em P35. |
| P10 | Confiança da IA | Quando sugerir, vincular automaticamente ou pedir confirmação; como lidar com ambiguidade. |
| P11 | Filtros adicionais | **MVP definido por U05:** texto + Tipo + Categoria + Período. Valor/origem continuam sem inclusão decidida. |
| P12 | Status de Categorias | **MVP definido por U06:** <80%, 80%–100%, >100%, sem status de limite quando não há planejamento. Status dinâmico no backlog; naming em UX Writing. |
| P13 | Vigência do planejamento | **U06:** alteração vale imediatamente, registrando anterior/novo/quando; meses anteriores preservados. Granularidade técnica em P34. |
| P14 | Manga Insights | U07 define prioridade + recência no MVP. Fila, consumo, exposição/substituição e ciclo de vida permanecem em alinhamento; relevância sofisticada é backlog. |
| P15 | Superfícies de comunicação | Quando usar Home, inline/card, toast, sheet/modal; WhatsApp/notificação no ciclo próprio. |
| P16 | Dados suficientes | Critérios de quantidade, qualidade e confiança para comparações, tendências e recomendações. |
| P17 | Home com muitas metas | **Resolvido por U07:** até três ativas; atenção → proximidade financeira da conclusão → recência de criação; prazo pode desempatar. Meta Foco permanece backlog. |
| P18 | Celebrações | Comportamento global e apresentação de meta concluída na Home. |
| P19 | Configurações e Onboarding | U12 fecha arquitetura funcional; detalhar UI, CFG01–CFG03, Conta/Acesso, retomada e três cenários de UAU. Saldo obrigatório; Meta/Categorias/reserva opcionais. |
| P20 | Decisões de UI | Páginas × sheets, gráficos, separação de metas ativas/concluídas e navegação final. |
| P21 | Estados sistêmicos | **U10:** taxonomia Empty/Zero/Insufficient Data/Error definida; resiliência, preenchimento, duplicidade e atomicidade são diretrizes. Visuais e implementação permanecem em alinhamento. |
| P22 | Autenticação e segurança | **[Pré-lançamento / Alinhamento PD/PM ↔ Dev]** Antes do Beta, definir autenticação/login/recuperação, proteção, sessão, credenciais e mecanismos necessários; não antecipar PIN, biometria, senha, dispositivos ou login social. |
| P23 | Notificações | **MVP confirmado em U08:** controle inicial pode ser simples; sem liga/desliga próprio de Manga Insights. Gatilhos Push, prioridade, relevância e frequência continuam em alinhamento com CHECK 05. |
| P24 | Aparência / Dev e DS | **Backlog em U08:** Dark Mode fora do MVP. Adequação futura de temas/variáveis permanece para a evolução, não decisão necessária para validar V1. |
| P25 | Exclusão de conta | Solicitação e confirmação forte no MVP; alinhar reautenticação, execução no backend e requisitos legais/de privacidade aplicáveis. |
| P26 | Realizado × previsto | Definir como previsões recorrentes influenciam planejamento/análises sem serem apresentadas como recebimentos/gastos realizados. |
| P27 | Contexto financeiro declarado | **Parcialmente resolvido em U03:** gastos planejados persistem em Categorias, com edição em C04; não criar entidade Despesa fixa declarada apenas para onboarding. **Alinhamento Dev:** persistência da renda e histórico temporal do planejamento; contexto não é evento realizado. |
| P28 | Renda estimada | **U12: fora do onboarding MVP.** Primeiro justificar uso concreto/valor; só então definir influência, consulta/edição e renda variável/desconhecida. |
| P29 | Persistência/retomada do onboarding | [Pendente / Alinhamento PD/PM ↔ Dev] Definir persistência e retomada; comportamento ainda não decidido. |
| P30 | Plano fixo × adaptativo | [Alinhamento PD/PM ↔ Dev] Decidir se mantém referência mensal ou recalcula automaticamente para preservar prazo. Nenhum modelo escolhido. |
| P31 | Relevância unificada das Metas | [Pendente — Sistema de Orientações / Insight Engine] Compartilhar critérios para avanço, desvio, retirada, motivação, alerta, renegociação e Home; thresholds de feedback/retirada não definidos. |
| P32 | Naming de Saldo | [Pendente — Naming / UX Writing] Avaliar Saldo, Meu dinheiro, Disponível, Saldo acompanhado ou alternativas; não renomear agora. |
| P33 | Período em S01 / Saldo histórico | [Alinhamento PD/PM ↔ Dev] Definir efeito do seletor e significado do saldo passado: final do período, variação líquida ou acumulado até então; nenhum escolhido. |
| P34 | Granularidade da vigência | [Alinhamento PD/PM ↔ Dev] Data exata, competência, versionamento e impacto em consultas históricas; preservar decisão de aplicação imediata e registro de quando ocorreu. |
| P35 | “Sem categoria” em C01 | [Alinhamento PD/PM ↔ Dev] Agrupamento visual junto às Categorias × ação separada de revisão; nenhuma opção escolhida. |
| P36 | Fila, consumo e ciclo de vida de Insights | [Alinhamento PD/PM ↔ Dev] Geração, elegibilidade, exposição, visto/consumido, substituição, duração, persistência, reaparecimento e períodos anteriores. Nenhuma arquitetura técnica escolhida. |
| P37 | Manga Insights × Push / comunicação global | [Pendente / Alinhamento PD/PM ↔ Dev] Insight não gera Push automaticamente; definir eventos, frequência, repetição, urgência, preferências e comunicação dominante entre superfícies. |
| P38 | Dados pessoais necessários | [Pré-lançamento / Alinhamento PD/PM ↔ Dev] Antes do Beta, avaliar necessidade, finalidade, obrigatoriedade, armazenamento, uso, onboarding e requisitos legais; não coletar todos os campos cogitados por padrão. U12 define Nome único obrigatório; idade fora do onboarding. |
| P39 | LGPD, privacidade e requisitos legais | [Pré-lançamento / Alinhamento PD/PM ↔ Dev] Levantamento adequado antes do primeiro Beta; não backlog opcional nem análise jurídica concluída. |
| P40 | Prazo obrigatório de Meta | **U10 — Alinhamento PD/PM ↔ Dev:** decidir obrigatoriedade no MVP e impacto em plano, contribuição, estados e inteligência. Valor objetivo obrigatório já definido. |
| P41 | Integridade e referências históricas | **U10 — Alinhamento Dev:** atomicidade, proteção contra duplicidade, resiliência e preservação das referências a Metas/Categorias excluídas, sem mantê-las ativas. |

**Recorrência foi pendência prioritária em U01 e passou ao backlog, fora do MVP, em U05.** As questões de funcionamento seguem abertas para essa evolução. U08 exige resolver dados pessoais necessários, autenticação, segurança, privacidade e requisitos legais antes do primeiro Beta. Não há datas de calendário ou responsáveis individuais atribuídos neste checkpoint.

**Atualização U09 das pendências:** P14/P36 passam a alinhamento prioritário do Engine (consumido ≠ resolvido, fila, persistência, reaparecimento e consolidação). P16 inclui validar proposta de dois meses anteriores. P13/P34 têm regra de produto fechada: último planejamento vigente no mês, com indicação da alteração, sem proporcionalização diária; modelagem ainda aberta. P18 fecha celebração seguida da saída do ranking normal, mas duração/exposição continuam abertas. P30 e tratamentos inteligentes de P02/P31 ficam como evoluções de backlog, sem aprovar plano dinâmico no MVP. Exclusão técnica/auditoria de Transações requer alinhamento prioritário. P22/P38/P39 continuam requisitos antes do primeiro Beta.

**U10 — alinhamentos adicionais:** prazo obrigatório de Meta (impacto em plano/contribuição/status/projeções); resiliência por bloco; preservação de preenchimento; proteção contra duplicidade; atomicidade; referência histórica de Categorias/Metas excluídas; retenção técnica de Transações; ausência de dados ≠ zero na validação dos dois meses. Ajuste especial deixa de ser pendência de implementação do MVP e passa ao backlog.

**U11 — alinhamentos:** descrição de Transação permanece obrigatória até revisão de fricção, histórico sem descrição e criação rápida pela Home; Saldo Inicial negativo permanece proibido até avaliar necessidade futura; definir armazenamento monetário, centavos, arredondamento, formatação BRL, máximo suportado e prevenção de erros de precisão. Prazo obrigatório continua aberto; quando houver prazo, data-alvo > hoje já é regra. Não criar limites financeiros arbitrários para resolver limitações visuais.

**U12 — CHECK 08:** alinhar Conta/Acesso e finalidade de dados, necessidade futura de idade/renda (fora do onboarding), persistência/retomada e momento de criação de entidades, finalização sem duplicidade/atômica quando necessário e viabilidade do UAU. Exploração de design A/B/C na seção 33.6, não backlog.

## 15. Alinhamento PD/PM ↔ Dev

O usuário atua como **PD/PM**; seu amigo cuida de **desenvolvimento, backend e banco de dados**. Meta Foco e os tópicos de U01 foram explicitamente marcados para alinhamento. A tabela reúne regras e lacunas de implementação; não estabelece novas decisões técnicas.

| Tópico | Levar como decidido | Decidir / especificar juntos |
|---|---|---|
| Modelo de metas | Objetivo, plano e progresso são conceitos separados. | Cálculos, histórico temporal, ativação e eventual rascunho. |
| Movimentação de meta | Evento próprio altera Disponível sem Entrada/Saída; um evento refletido em Saldo e Meta. | Modelagem sem duplicação, retroatividade e feedback; conclusão não gasta reserva. |
| Saldo | Saldo Inicial não é Entrada. U10 permite Transações corretivas normais, que participam das métricas; Ajuste especial é backlog. | Captura inicial e fluxo de reconciliação. |
| Recalcular dados | Transações alimentam saldo, períodos, categorias, gráficos e insights. | Garantir atualização coerente ao mudar valor, data, tipo e vínculo. |
| Categoria pessoal | Vínculo opcional só em Saídas; Entradas sem Categoria; excluir preserva fatos/Saldo. | Representação de “Sem categoria” em C01. |
| Histórico de planejamento | Alteração vale a partir do momento/período; não recalcular passado com configuração atual. | Preservar vigência/histórico, não apenas último valor; considerar outras configurações temporais que afetem análises. |
| Meta Foco | Backlog; não condiciona MVP. | Uma por vez? Propriedade da meta? Conclusão/exclusão? Manga pode sugerir troca? |
| Manga Insights | Até três na Home; P1/P2/P3 + recência; não repetir dados nem gerar Push automaticamente. | Fila, consumo, ciclo de vida, substituição e comunicação global; relevância sofisticada futura. |
| Onboarding e recorrência | Deve gerar valor inicial; metas protagonistas; não criar recorrências implicitamente. Cancelar recorrência preserva histórico. | Modelo de criação, frequência, previsto × realizado, edição de ocorrências, categorias e análises. |
| Canais | Mesmo significado dos registros no app e WhatsApp. | Ambiguidade e dupla contabilização; detalhar WhatsApp/IA por último. |
| Exclusões | Excluir Meta no MVP, com confirmação, devolvendo reservas ao Disponível sem gerar Entrada; arquivar no backlog. Categoria preserva transações. | Detalhes técnicos de exclusão/retenção de histórico. |
| Plano fixo × adaptativo | Usuário mantém controle; comunicar consequências sem punição. | Manter referência mensal ou recalcular automaticamente para preservar data final; decisão aberta. |
| História temporal global | Mudanças de planejamento/configuração/condição preservam contexto anterior, inclusive objetivo da Meta. | Modelo de vigência/histórico, sem armazenar apenas valor atual. |
| Relevância das Metas | Status inicial usa contribuição mensal como unidade de desvio. | Critérios compartilhados de feedback e retirada; não reutilizar limiar de status automaticamente. |
| Saldo e período | Realidade conhecida pelo Manga; manter nomenclatura atual. | Significado histórico do Saldo e alcance do seletor; priorizar simplicidade/previsibilidade. Naming em UX Writing/UI. |
| Dependências financeiras | CRUD de transações atualiza Saldo e derivados; mudança de Tipo exige confirmação; Ajuste especial fora do MVP; Transações corretivas participam das métricas (U10). | Implementar coerência funcional descrita na seção 25 sem confundir fato, planejamento e correção. |
| Vigência dentro do mês | Planejamento muda imediatamente; preservar anterior, novo e quando ocorreu. | Granularidade/versionamento e consultas históricas; não simplificar a decisão de Produto sem alinhamento. |
| Sem categoria em C01 | Ausência de vínculo não é entidade; Saída sem Categoria é válida. | Agrupamento visual × ação de revisão separada. |
| Configurações | Conta, preferências e manutenção; não gerencia Metas/Categorias/Transações. | Detalhamento de CFG01–CFG03 e capacidades reais disponíveis no MVP. |
| Autenticação | Conta deve refletir o método de acesso real. | Métodos, criação, retorno, dados próprios/editáveis; alteração de senha apenas quando aplicável. |
| Notificações | Preferências no MVP; notificações externas respeitam escolhas; Manga Insights sem configuração própria. | Granularidade inicial simples; eventos, frequência e relevância conforme CHECK 05. Preferências avançadas no backlog. |
| Aparência / DS | Dark Mode no backlog, fora do MVP. | Suporte/variáveis e temas quando a evolução for retomada. |
| Exclusão da conta e dados | Solicitação no MVP, confirmação forte e comunicação dos dados afetados. | Reautenticação, execução no backend e compatibilidade com obrigações legais/de privacidade aplicáveis. |
| Contexto financeiro do onboarding | U12: Saldo Inicial obrigatório; Categorias/limites, Meta e reserva opcionais e reais. Sem renda estimada. | Retomada, momento de criação das entidades, finalização sem duplicidade e UAU. |
| Persistência/retomada do onboarding | Necessidade registrada no Architecture Check 01. | Comportamento ainda pendente; não presumir salvamento/retomada automáticos. |

## 16. O que NÃO entra / o que não foi decidido

| Exclusão ou limite | Delimitação |
|---|---|
| Movimentar dinheiro real | Manga não é carteira/banco nem custodia valores. |
| Perfil | Fora do escopo atual por decisão explícita. |
| Open Finance | Futuro. |
| Meta Foco | Fora do MVP atual; backlog. |
| Sugestão de gastos antigos na criação de categoria | Fora do MVP atual; backlog. |
| Categorias obrigatórias universais | Não impor taxonomia ao contexto pessoal do usuário. |
| Limite que bloqueia despesa | Não existe; limite orienta. |
| Home como painel completo | Sem bloco permanente de categorias, todas as metas, histórico de transações, gráficos financeiros grandes, análises detalhadas ou filtros complexos. |
| Resultado completo do período na Home | Está em S01; H01 usa saldo + Entradas/Saídas. |
| “Disponível para gastar” com falsa precisão | Não afirmar no MVP manual sem contexto suficiente. |
| Dica genérica para preencher Home | Não gerar; sem relevância, omitir insight. |
| Guardar automaticamente após receita | Recebimento não é reserva em meta; requer declaração. |
| S03/S04 ampliadas | Anexos/comprovantes, localização, estabelecimento detalhado, conta bancária, cartão, parcelamento, tags adicionais, divisão de despesa e recorrência não entram no fluxo atual. Recorrência segue questão separada do onboarding, não uma decisão global de impossibilidade. |
| Agregação patrimonial detalhada inicial | Não foi adotada captura por conta corrente, poupança, carteira e investimentos no MVP discutido. |
| Telas independentes para cada estado | Sem novas telas obrigatórias para Entradas, Saídas, resultado de busca, editar transação, exclusão ou feedback de rotina. |
| Recomendações sofisticadas sem histórico | Não fazer inferências além do que os dados sustentam. |
| Gestão de transações dentro de C04 | Corrigir a transação em S04. |
| Gestão financeira duplicada em Configurações | Metas, Categorias e Transações permanecem nas próprias áreas. |
| Preferências para capacidades inexistentes | Configurações deve refletir capacidades reais. U08 confirma preferências iniciais de notificações; regras de comunicação externa seguem em alinhamento. Aparência/Dark Mode fica no backlog. |
| Exportação de dados | Backlog; fora do MVP atual. |
| Recorrências implícitas no onboarding | Não criar enquanto o comportamento de recorrências não estiver definido. Informação de contexto não é instrução de lançamento. |
| Lançamentos automáticos a partir de contexto/planejamento no onboarding | Renda declarada e planejamento de Categorias não criam automaticamente Entradas, Saídas ou Transações Recorrentes. |
| Entidade Despesa fixa declarada para onboarding | Não criar por enquanto; U03 utiliza Categorias + planejamento mensal e gestão existente em C01/C04. |

Não foram definidos nesta conversa: arquitetura técnica, banco, APIs, cronograma, metas de negócio, monetização ou critérios completos de aceitação. Nenhum desses elementos é preenchido por suposição aqui.

## 17. Próximos fluxos e continuidade

**Sequência de continuidade:** concluir detalhamento e alinhamentos de Configurações e do Onboarding V1 → consolidação geral do app → WhatsApp/IA, separadamente e por último. Recorrências e transações futuras permanecem no backlog. **Check 04 validou Categorias**, inclusive exclusão; vigência intramês e representação de “Sem categoria” em C01 continuam em alinhamento.

### Configurações

Arquitetura validada em U08 (seção 29): Conta e dados, notificações, privacidade/segurança após estudos, Sair/Excluir conta e versão quando aplicável. Ajuste de saldo é backlog em U10; sem Financeiro ou Perfil. U12: Nome único obrigatório, sem apelido separado; outros dados, autenticação, segurança e privacidade em alinhamento antes do Beta. CFG01–CFG03 ainda sem distribuição individual de funções.

### Onboarding

Premissas anteriores preservadas, com atualização explícita de U02:

- Existirá; será iterado com frequência e desenhado depois dos fluxos centrais.
- Coletar informações suficientes para chegar à Home com contexto e valor inicial.
- O usuário citou salário, despesas fixas/aluguel e metas como exemplos.
- Deve dar protagonismo a Metas e aproveitar as experiências existentes.
- Há necessidade de ponto de partida financeiro; captura exata não foi fechada.
- Diferenciar renda/despesas previstas de movimentações realizadas.
- **Não criar recorrências implicitamente:** salário/aluguel declarados podem fornecer apenas contexto. Separar informação declarada de instrução para criar movimentações financeiras (U01).
- Não chamar renda menos fixos conhecidos de “dinheiro livre” sem conhecer variáveis e demais compromissos.

**U12 substitui a sequência e obrigatoriedades anteriores:** Conta/Acesso → Nome → Saldo Inicial obrigatório → Categorias/limites opcionais → primeira Meta/reserva opcionais → preparação → UAU → Home. Sem renda/idade; não exigir primeira Transação ou push. Categorias e Metas confirmadas são reais. Seção 33 contém referência vigente.

O roteiro O01–O06 e a ordem “Meta → renda → despesas → saldo → plano” foram sugestões exploratórias. Não são decisões finais nem adicionam telas ao inventário atual.

### WhatsApp / IA

Fora deste ciclo de desenho, mas preservando premissas já discutidas:

- Interpretar entradas/saídas e movimentações de metas conforme a intenção.
- Usar os mesmos modelos e refletir registros no app.
- Pedir esclarecimento quando houver ambiguidade, como duas metas de viagem.
- Permitir corrigir interpretações.
- Evitar dupla contabilização se uma mensagem mencionar retirada de meta e gasto real; o comportamento combinado não foi resolvido.
- Open Finance permanece futuro.

### Depois do mapeamento

Consolidar inventário final, fluxos, estados, regras, backlog e sistema de orientações. A sequência de trabalho discutida segue para wireframes/fluxos visuais, auditoria do Design System no Figma, componentes necessários e UI. As variáveis primárias e semânticas existentes foram relatadas pelo usuário como concluídas; não foram auditadas neste checkpoint.

Fontes: F04–F06, F24–F28, F34–F41, F49–F51.

## 18. Índice de evidências

Os IDs Fxx são localizadores da transcrição de apoio, não novos códigos do produto.

| Tema | Interações principais |
|---|---|
| Método: arquitetura antes de Figma | F04–F06 |
| Tese, acompanhamento sem dinheiro real | F07–F09 |
| M01 e M02 | F10–F12 |
| M03 e negociação | F13–F14 |
| M04, M06 e M05 | F15–F17 |
| Consolidação de Metas | F18 |
| S01, drill-down e S02 | F19–F21 |
| S03 e S04 | F22–F23 |
| Saldo inicial, onboarding e consolidação financeira | F24–F27 |
| Correção do conceito de Categoria | F30 |
| C01, limite, C02, C03 e C04 | F31–F35 |
| Consolidação de Categorias | F36 |
| Entry points | F37 |
| Ordem do trabalho e exclusão de Perfil | F40–F41 |
| Home e Meta Foco | F42–F43 |
| Tipos, prioridade e maturidade de insights | F44–F45 |
| Seu dinheiro e retirada do bloco permanente de Categorias | F46–F47 |
| Empty states | F48 |
| Consolidação da Home | F49 |
| Necessidade de registro persistente e checkpoint | F50–F51 |
| Configurações, autenticação, temas, notificações, exclusão/exportação, recorrências e onboarding | U01 — atualização fornecida pelo usuário nesta tarefa; incorporada nas seções 19–20 e tabelas transversais. |
| UX Principles, Onboarding V1, UAU Moment, Activation Moment e primeiro plano | U02 — texto fornecido pelo usuário no anexo “Texto colado.txt”; incorporado nas seções 21–22 e tabelas transversais. |
| Categorias/planejamento no onboarding, preservação temporal e Architecture Check 01 | U03 — novo texto fornecido pelo usuário; seção 23 e atualizações nas definições afetadas. |
| CHECK 02 — Metas | U04 — atualização fornecida pelo usuário; seção 24 e definições afetadas de Metas, regras, backlog e alinhamentos. |
| CHECK 03 — Saldo & Transações | U05 — atualização fornecida pelo usuário; seções 25–26 e definições afetadas. |
| CHECK 04 — Categorias | U06 — texto fornecido pelo usuário; seção 27, dependências da seção 25 e definições afetadas. |
| CHECK 05 — Home & Manga Insights | U07 — texto fornecido pelo usuário; seção 28 e definições transversais atualizadas. |
| CHECK 06 — Conta & Configurações | U08 — texto fornecido pelo usuário; seção 29 e atualizações de escopo, regras, backlog e pré-lançamento. |
| CHECK 07.1–07.4 — Cross-flow & Regras Globais | U09 — mensagem do usuário nesta tarefa; seção 30 e definições afetadas. CHECK 07.5 ainda não realizado à época de U09; fechado em U10, com pendência de prazo obrigatório. |
| CHECK 07.5–07.6 e revisão de Ajuste | U10 — anexo do usuário; seção 31 e definições afetadas. Checks fechados; prazo obrigatório pendente. |
| CHECK 07.7 — Limites e validações | U11 — mensagem do usuário; seção 32 e definições afetadas. CHECK 07 concluído com alinhamentos explícitos. |
| CHECK 08 — Onboarding ↔ App real | U12 — mensagem do usuário; seção 33 e definições afetadas. Funcionalmente fechado, UAU em exploração e alinhamentos preservados. |

**Documentos deste checkpoint:** este registro consolidado e a transcrição textual de apoio. Os arquivos sincronizados do projeto em `sources/` permanecem como referências e não foram alterados.

## 19. CFG01–CFG03 — Configurações do Manga

**Fonte: U01 — atualização fornecida pelo usuário.** A faixa CFG01–CFG03 identifica o agrupamento informado. Não foram definidos nomes, responsabilidades ou fronteiras individuais para cada um desses três IDs; este registro não inventa essa distribuição.

### 19.1 [MVP] Papel e estrutura inicial

Configurações concentra **conta, preferências e manutenção do próprio Manga**. Não é um local alternativo para administrar o conteúdo financeiro do usuário. Metas, Categorias e Transações têm experiências próprias e não devem ser duplicadas aqui.

| Grupo | Estrutura inicial considerada | Condição / status |
|---|---|---|
| Conta e dados | Nome único obrigatório e demais dados necessários após alinhamento. | Sem Perfil; coleta/autenticação avaliadas antes do Beta. |
| Notificações | Preferências iniciais, possivelmente simples. | MVP; granularidade avançada no backlog; sem liga/desliga próprio de Insights. |
| Privacidade e segurança | Estrutura após estudos pré-lançamento. | Não antecipar controles técnicos. |
| Conta | Sair e Excluir conta. | MVP; confirmação adequada; requisitos a estudar. |
| Informações do aplicativo | Versão, quando aplicável. | Estrutura atual de U08. |

**Contexto da mudança:** U01 cogitava Financeiro/Ajuste e Ajuda/Sobre. U08 retira Financeiro/Ajuste e define a estrutura acima. Feedback/suporte permanecem como proposta anterior, não módulos confirmados por U08; localização de termos/política depende do estudo pré-lançamento. Exportação segue no backlog.

Não há necessidade identificada para uma página separada de **Perfil**. Informações básicas podem ser administradas em Conta.

### 19.2 [Regra] Configurações não gerencia Metas ou Categorias

Não criar **Configurações → Gerenciar Categorias** nem **Configurações → Gerenciar Metas**. A mesma separação se aplica às Transações: o conteúdo financeiro continua nas áreas funcionais.

Configurações permite configurar o funcionamento do Manga e a conta. Essa separação evita duplicação e mantém claro onde cada ação acontece.

> **Configurações deve refletir capacidades reais do Manga, e não antecipar funcionalidades do roadmap.**

### 19.3 [Backlog — revisão U10] Ajuste de saldo

**Decisão anterior substituída:** U01/U05 distinguiam Ajuste de Entrada/Saída, para preservar análises de renda/gasto; U08 propunha acesso em Saldo. U10 retira esse evento especial do MVP porque falta experiência/local adequado e implementá-lo ampliaria desnecessariamente o escopo.

No MVP, divergência pode ser corrigida por Entrada/Saída normal, **incluída nas métricas correspondentes**. Exemplo: Disponível R$2.350 versus R$2.500 percebidos → Entrada de R$150. No caso inverso, Saída. Limitação aceita para simplificar escopo.

Reconciliação especial sem contaminar métricas passa ao backlog; localização, histórico, edição, exclusão e efeitos ainda não definidos. Ver seção 31.1.

### 19.4 [Alinhamento Dev] Autenticação

Antes de finalizar Conta, definir como a conta é criada, como o usuário entra novamente, quais informações pertencem ao Manga e quais podem ser alteradas.

Possibilidades em discussão, sem método escolhido:

- E-mail e senha.
- Google.
- Apple.
- Combinação desses métodos.

Não desenhar **Alterar senha** como opção universal: se o acesso for exclusivamente Google/Apple e o Manga não administrar senha própria, essa opção não se aplica.

### 19.5 [MVP / Alinhamento Dev] Notificações — atualizado por U08

**Preferências de notificação entram no MVP**, com controle inicial possivelmente simples. Manga Insights não tem configuração própria de ativação/desativação. Notificações externas de eventos/Insights respeitam as preferências. Gatilhos, relevância, frequência e relação com Push continuam em alinhamento conforme CHECK 05.

Possíveis usos: lembrar ações de Metas, informar situações relevantes, alertar sobre categorias próximas do limite, comunicar progresso e reforçar planos que precisam de atenção. Esses exemplos não constituem gatilhos aprovados. U08 confirma preferências de notificações no MVP; os gatilhos e as regras de push seguem em alinhamento.

Conectar ao **Sistema de Insights e Orientações**, definindo quais informações justificam interromper ou reengajar o usuário fora do app e respeitando suas preferências de notificações.

### 19.6 [Backlog] Aparência / Dark Mode — atualizado por U08

**Dark Mode está no backlog e não é necessário para validar o MVP.** A discussão anterior sobre claro/escuro/acompanhar sistema fica como contexto da evolução futura, sem criar preferência de tema na V1 por suposição.

Dark mode impacta o Design System: as **variáveis semânticas devem funcionar adequadamente nos diferentes temas**. Não é apenas uma opção visual acrescentada à tela de Configurações.

### 19.7 [MVP / Pendente técnico] Exclusão da conta e dos dados

O usuário deve conseguir **solicitar a exclusão da própria conta e dos dados associados**, com confirmação forte por se tratar de ação destrutiva e potencialmente irreversível.

A experiência deve comunicar claramente que **Metas, Categorias, Transações, histórico e demais informações vinculadas à conta serão afetados**.

Alinhar com desenvolvimento possíveis requisitos de reautenticação e execução no backend. O comportamento deve ser compatível com as obrigações legais e de privacidade aplicáveis ao Manga; esta atualização não especifica prazos legais, retenção, exclusão imediata ou mecanismo técnico.

Essa operação é distinta da exclusão de uma categoria ou meta isolada. As regras desses objetos não definem, por si, o comportamento da exclusão da conta inteira.

### 19.8 [Backlog] Exportação de dados

> **Exportação de dados permanece no backlog.**

Permitir exportar dados financeiros e informações armazenadas pode trazer valor, mas não foi identificado como necessário para validar a proposta central do MVP.

Quando retomado, definir quais informações serão exportadas, formatos disponíveis e representação de Metas, Categorias e Transações.

## 20. Transações recorrentes e relação com Onboarding

**Fonte original: U01. Status atualizado por U05: [Backlog], fora do MVP atual.** U01 havia registrado pendência prioritária/possível backlog; U05 fecha o adiamento. As questões abaixo ficam preservadas para estudo do fluxo futuro, sem solução presumida.

### 20.1 Necessidade

O modelo atual trabalha principalmente com **transações efetivamente registradas**. Recorrências podem reduzir esforço manual e ajudar a entender compromissos futuros.

Exemplos fornecidos: salário de R$6.500 por mês; aluguel de R$1.500/mês; academia de R$120/mês; Spotify de R$27,90/mês. Valores e frequência desses exemplos não limitam o modelo.

### 20.2 Questões a resolver

| Tema | Questão / distinção preservada | Status |
|---|---|---|
| Criação | Marcar uma transação como “Repetir mensalmente?” ou criar experiência própria de recorrência? | Pendente. |
| Frequência | Semanal, mensal, anual, personalizada etc.; **não assumir que toda recorrência é mensal**. | Frequências suportadas pendentes. |
| Transação real × previsão | Na data prevista, criar automaticamente uma Entrada/Saída ou gerar previsão com confirmação de recebimento/pagamento? | Pendente; nenhuma alternativa escolhida. |
| Edição | Distinguir “Alterar somente esta transação” de “Alterar esta e as próximas”. | Necessidade identificada; comportamento e modelo de dados a definir. |
| Cancelamento | Encerrar recorrência preserva as transações anteriores; apenas novas ocorrências deixam de ser esperadas/criadas. | Regra definida; execução a detalhar. |
| Categorias | Recorrência provavelmente carrega categoria; exemplo Academia → Saúde. Definir efeitos de alterações sobre ocorrências passadas e futuras. | Proposta e regras pendentes; não institui categoria padrão. |
| Análises e insights | Definir se e como previsões influenciam planejamento antes de acontecer, distinguindo **realizado × previsto**. | Questão de produto pendente. |

No exemplo “Salário de R$6.500 todo dia 5”, as alternativas permanecem:

**A)** criar automaticamente uma Entrada de R$6.500;  
**B)** mostrar “Salário previsto — R$6.500” com **Confirmar recebimento**.

A atualização aponta que a segunda alternativa preserva maior confiabilidade, porque o evento pode não ocorrer como planejado. Isso é uma avaliação da alternativa, **não uma decisão de adotá-la**.

Cancelar academia após 12 meses não apaga as 12 transações anteriores. Uma mudança de aluguel de R$1.500 para R$1.600 precisa distinguir edição daquela ocorrência de alteração das próximas.

Um aluguel de R$1.500 previsto para daqui a cinco dias pode oferecer contexto de planejamento. Sua previsão não deve ser apresentada como prova de que o usuário já gastou R$1.500. O uso desse dado nas análises e insights precisa ser definido.

### 20.3 [Regra / Pendente] Onboarding não cria recorrências implicitamente

> **O onboarding não deve criar recorrências implicitamente enquanto o comportamento de Transações Recorrentes não estiver definido.**

Informar “Salário: R$6.500” pode significar apenas renda mensal aproximada; não significa “Crie automaticamente uma entrada todo dia 5”. Informar aluguel de R$1.500 pode apenas contextualizar compromissos financeiros.

Ao desenhar o onboarding, separar:

- **Informação declarada para contexto:** a proposta original citava renda, aluguel e despesas fixas. U03 propôs renda declarada + Categorias/planejamento; U12 retira renda e torna Categorias/Meta opcionais, mantendo Saldo Inicial obrigatório; não criar entidade separada de despesas fixas apenas para onboarding.
- **Instrução para criar movimentações financeiras:** exige comportamento próprio, ainda não definido para recorrências.

### 20.4 Quadro de status da atualização

| Tema | Classificação |
|---|---|
| Ajuste/Reconciliamento especial | **Backlog (U10); no MVP, correção por Entrada/Saída normal compõe métricas** |
| Perfil fora do escopo | **Decisão definida** |
| Configurações não gerencia Metas/Categorias | **Regra definida** |
| Autenticação | **Pré-lançamento + alinhamento PD/PM ↔ Dev, antes do primeiro Beta (U08)** |
| Notificações | **MVP: preferências iniciais; gatilhos e regras de comunicação externa em alinhamento (U08)** |
| Dark mode | **Backlog — fora do MVP (U08)** |
| Exclusão de conta | **MVP + definição técnica necessária** |
| Exportação de dados | **Backlog** |
| Transações recorrentes | **Backlog — fora do MVP, conforme atualização U05** |
| Realizado × previsto | **Questão de produto decorrente das recorrências** |
| Onboarding gerar recorrências | **Não fazer implicitamente até decisão futura** |

### 20.5 Registro da revisão

**v1.1 — U01:** acrescentadas Configurações e recorrências; atualizados escopo, decisões do MVP, backlog, pendências, alinhamentos PD/PM ↔ Dev, exclusões e próximos passos. A transcrição F01–F51 permanece como registro da conversa original; U01 é uma fonte adicional desta tarefa, não uma alteração retroativa daquela conversa.

## 21. UX Principles

**Regra Global de UX acrescentada em U06:** visualizações financeiras baseadas em período abrem no mês atual, salvo contexto que exija outra referência. Aplicações: Saldo/Transações, Categorias e históricos mensais; Metas têm referência própria. Isso não fecha a semântica histórica de Saldo.

**Fonte: U02 — decisões fornecidas pelo usuário durante a definição do Onboarding.** Todos os itens desta seção são **[Princípio de UX]**, decisões transversais que orientam **a V1 e futuras evoluções**. Não são backlog. Complementam os princípios da seção 10, que permanece preservada.

### 21.1 [Princípio de UX] Problemas devem virar caminhos, não becos sem saída

Quando o Manga identificar que uma meta, plano ou comportamento financeiro está difícil de sustentar, não deve se limitar a apontar o problema. **Sempre que existirem alternativas possíveis**, deve explicar a situação, mostrar a consequência, apresentar alternativas compreensíveis e permitir que o usuário escolha como seguir.

**Situação → Consequência → Alternativas → Decisão do usuário.**

Evitar: “Sua meta é inviável”, “Seu plano não funciona” ou “Você está gastando demais”.

Preferir uma descrição objetiva: “Para alcançar essa meta no prazo escolhido, seria necessário reservar R$2.100 por mês.” Em seguida, oferecer caminhos possíveis:

- Aumentar o prazo e reduzir o valor mensal.
- Ajustar o valor da meta.
- Manter o plano atual.
- Futuramente, identificar oportunidades de redução de gastos, respeitando o estágio de inteligência e os dados disponíveis.

**O Manga não toma a decisão pelo usuário.** Torna consequências compreensíveis e oferece caminhos para a pessoa escolher o que se adapta à sua realidade. A possibilidade futura de recomendar redução de gastos não é promovida a requisito do MVP por este princípio.

Aplicar transversalmente em **Metas, Categorias, Home, Insights, Onboarding e futuras recomendações da inteligência do Manga**. Este princípio amplia o padrão já registrado de “Mudança → consequência → decisão”, incluindo explicitamente as alternativas.

### 21.2 [Princípio de UX] O Manga orienta sem julgar

A comunicação apresenta **fatos, consequências e possibilidades**, sem assumir que determinado gasto é certo ou errado.

| Evitar | Preferir |
|---|---|
| “Você gastou demais com Rolê.” | “Você ultrapassou em R$120 o valor que pretendia gastar com Rolê.” |

O primeiro texto julga o comportamento. O segundo informa objetivamente em relação a uma intenção definida pelo próprio usuário. Esse princípio orienta **copies, insights, alertas e recomendações**.

### 21.3 [Princípio de UX] O Manga pede apenas aquilo que ainda não sabe

Quanto mais contexto sobre a ação, menos informações o Manga deve pedir novamente.

| Origem | Contexto disponível e comportamento |
|---|---|
| Home | Ainda precisa perguntar Entrada ou Saída ao registrar movimentação. |
| Categoria Cafés | Adicionar gasto já fornece Saída + categoria Cafés como associação inicial. |
| Meta | Adicionar/retirar progresso já identifica a meta movimentada. |

**O contexto muda a porta de entrada, mas não deve criar novos fluxos desnecessários.** Preservam-se os fluxos compartilhados S03 e M06, suas diferenças e o direito de correção.

### 21.4 [Princípio de UX] A Home prioriza; não resume o produto inteiro

A Home responde **“O que importa para mim agora?”**, priorizando Metas, até três Manga Insights relevantes e uma leitura financeira essencial (U07). Não é um dashboard com versões reduzidas de todas as áreas.

Categorias, transações, gráficos e demais informações são acessados nas áreas específicas ou ganham presença contextual quando relevantes, respeitando o escopo já definido de H01. Este princípio não adiciona bloco permanente de Categorias, histórico ou gráficos à Home V1.

### 21.5 [Princípio de UX] Ausência de informação relevante é melhor que informação de baixa relevância

Não preencher espaços apenas porque estão disponíveis. Sem insight realmente relevante na Home, **o bloco simplesmente não aparece**. Evitar dicas do dia genéricas ou informações que não ajudam a entender ou decidir algo.

### 21.6 [Princípio de UX] Ausência de dados não significa zero

Quando o Manga não possui determinada informação, não representá-la como R$0 ou outro valor que implique conhecimento.

Se não conhece o saldo, evitar “Saldo: R$0”; preferir **“Comece a acompanhar seu dinheiro.”** Continua válida a distinção da seção 9 entre informação desconhecida e zero conhecido/declarado.

### 21.7 [Princípio de UX] Empty states devem orientar o próximo comportamento útil

Empty states estruturais seguem **Contexto → Valor → Próxima ação**.

Exemplo preservado:

> Qual é a sua próxima conquista?
>
> Crie uma meta e o Manga ajuda você a transformar seu objetivo em um plano.
>
> Criar minha primeira meta.

Empty states contextuais, como busca sem resultados, podem ser mais simples. O objetivo é ajudar a agir, não transformar todo estado vazio em promoção.

### 21.8 [Princípio de UX] A assertividade do Manga acompanha sua confiança nos dados

Não fazer recomendações sofisticadas quando ainda conhece pouco sobre o usuário.

| Base disponível | Maturidade esperada | Exemplo |
|---|---|---|
| Poucos dados | Fatos e status | “Você utilizou 80% do limite.” |
| Histórico | Comparações | “Você gastou 25% mais que no mês anterior.” |
| Padrões | Tendências | “Seus gastos com Cafés estão aumentando.” |
| Contexto suficiente | Sugestões | “Seu limite parece difícil de manter.” |
| Contexto + comportamento + Metas | Recomendações personalizadas | “Reduzir R$60 em Cafés poderia ajudar a acelerar sua viagem.” |

A progressão reforça a seção 11.3; não define novos limiares de dados nem antecipa funcionalidades de backlog. Um primeiro plano personalizado usa as informações declaradas, mas não implica conhecimento completo do comportamento financeiro.

### 21.9 [Princípio de UX] Toda pergunta do onboarding deve justificar seu custo gerando valor posteriormente

Não perguntar informações apenas porque podem ser interessantes. Antes de incluir uma pergunta, deve ser possível responder:

> **“Como essa informação melhora a experiência que o Manga devolve ao usuário?”**

Sem resposta clara, a pergunta não deve fazer parte do onboarding.

## 22. Onboarding V1 — decisões de experiência e ativação

**Fonte: U02.** Esta seção acrescenta decisões de V1 às premissas anteriores sem substituir o histórico, aprovar o roteiro exploratório O01–O06 ou inventar um novo inventário de telas. Valores e copies abaixo são exemplos de experiência, não constantes de cálculo.

### 22.1 [MVP — atualizado por U12] Primeira Meta opcional

U02 exigia Meta antes das perguntas financeiras. **U12 substitui essa decisão:** incentivar, mas permitir “Agora não”; Home sem Meta usa Empty State. Não impedir quem quer apenas organizar finanças. O onboarding não é formulário extenso; cada pergunta precisa preparar valor real.

### 22.2 [MVP — atualizado por U12] Saldo Inicial obrigatório

U12 substitui opcionalidade de U02: **Saldo Inicial ≥ R$0 é o mínimo financeiro obrigatório**. Zero é válido, negativo proibido. Marco inicial, não Entrada. Explicar perto do campo que Disponível exclui valores já destinados a objetivos; microcopy final pendente.

### 22.3 [MVP — atualizado por U12] Categorias reais; renda fora do onboarding

Categorias opcionais, sugerindo Alimentação, Moradia, Transporte e Lazer; usuário mantém, edita, remove, adiciona ou pula. Confirmadas viram entidades reais em C01/C04. Limite opcional, positivo quando presente, alterável depois. Planejamento não cria gasto.

Renda estimada removida até justificar uso concreto e valor inicial. Não cria Entrada/recorrência. Permanece a distinção entre contexto e fato; não criar entidade separada Despesa fixa declarada. Persistência/retomada e momento de criação das entidades continuam em alinhamento.

### 22.4 [MVP] UAU Moment como requisito oficial de experiência

**U12 atualiza abrangência:** entregar clareza antes da Home mesmo sem Meta, inclusive Saldo R$0. As formulações de plano nas seções 22.4–22.8 aplicam-se ao caminho em que o usuário cria Meta; não são etapa obrigatória para todos. O design final é exploração A/B/C na seção 33, não uma estrutura visual fechada.

O usuário não deve terminar o onboarding sentindo que apenas concluiu um cadastro. O Manga deve usar as informações fornecidas para devolver algo que ele não possuía antes: **um primeiro plano concreto para alcançar seu objetivo**.

O UAU Moment não depende apenas de animações ou acabamento visual. O principal valor percebido é:

> **“Eu contei o que quero e o Manga transformou isso em um caminho.”**

### 22.5 [MVP] Activation Moment

> **Activation Moment = o usuário vê seu desejo transformado em um plano personalizado e aceita ou ajusta esse plano.**

Progressão psicológica desejada:

| Momento | Exemplo preservado |
|---|---|
| Desejo | “Quero viajar para a Colômbia.” |
| Clareza | “Para isso, minha referência inicial é guardar R$650 por mês.” |
| Compromisso | “Esse plano funciona para mim.” |
| Ação | “Começar meu plano.” |

Esta é uma definição de experiência. Eventos técnicos de analytics ou métricas de ativação não foram especificados por U02.

### 22.6 [Referência do caminho com Meta] Estrutura de ativação — design final em exploração U12

**Manga calcula o primeiro plano → Revelação → Decisão → Compromisso → Home.**

Na revelação, o Manga pode apresentar nome da Meta, valor total, valor já possuído, percentual conquistado, valor restante, prazo e referência mensal necessária.

Exemplo:

> **Colômbia começa aqui.**
>
> Meta: R$8.000  
> Já conquistado: R$1.500  
> Faltam: R$6.500  
> Prazo: 10 meses
>
> **Referência inicial: R$650/mês.**

A linguagem deve deixar claro que é **um plano inicial**, que ficará mais preciso conforme o Manga conhecer o comportamento financeiro. Não afirmar viabilidade completa apenas com renda declarada e planejamento de Categorias.

### 22.7 [MVP / Regra] Negociação do primeiro plano

Depois da revelação, o usuário deve poder reagir ao plano. Exemplo:

> **“Como esse plano parece para você?”**

- **Parece bom.**
- **Quero guardar menos.**
- **Quero chegar mais rápido.**

Guardar menos permite recalcular o prazo. Chegar mais rápido permite recalcular o esforço mensal. A experiência aplica **Situação → Consequência → Alternativas → Decisão**: o usuário participa da definição, em vez de receber apenas um cálculo.

Essa negociação preserva o conceito já definido em M03/M03.1 — contribuição mensal ⇄ prazo — sem criar um modelo de plano concorrente. A integração visual entre essas experiências e o onboarding ainda não recebeu novo ID.

### 22.8 [Regra / Princípio de UX] Quando o plano for muito agressivo

Não apresentar “Meta impossível”. Mostrar objetivamente o esforço necessário e oferecer caminhos.

Exemplo:

> “Para alcançar R$20.000 em três meses, seria necessário reservar aproximadamente R$6.667 por mês.”

Alternativas: **aumentar o prazo, ajustar o valor da meta ou manter o plano original**. A intenção é transformar dificuldade em negociação; o Manga não escolhe pelo usuário.

**[Pendente]** Não foi definido um limiar matemático para classificar um plano como agressivo. Não transformar o exemplo em regra universal nem interpretar renda declarada como capacidade integral de poupança.

### 22.9 [MVP / Regra] Home após o onboarding

O resultado deve se materializar imediatamente no produto. A Home não deve estar completamente vazia: a Meta criada aparece com **progresso, valor atual, valor necessário, plano mensal e status inicial quando aplicável**.

| Informação | Home após conclusão |
|---|---|
| Meta criada | Exibir acompanhamento e plano assumido. |
| Status inicial | Exibir quando aplicável, respeitando suficiência de dados e regras de status ainda pendentes. |
| Saldo inicial informado | Exibir em “Seu dinheiro”. |
| Saldo inicial | U12: obrigatório; mostrar Disponível resultante, inclusive zero. Ausência não é conclusão válida do onboarding. |
| Categorias e reserva confirmadas | U12: Categorias reais em C01/C04; reserva é evento real. Renda fora do fluxo; planejamento não cria Entrada/Saída. |

A sensação desejada é:

> **“Meu Manga já começou.”**

O UAU Moment e a Home preenchida pela Meta não exigem fabricar insight. Mantém-se a regra de omitir o bloco quando não houver informação relevante.

### 22.10 Quadro de status de U02

| Tema | Classificação / decisão |
|---|---|
| Problemas viram caminhos; orientar sem julgar | **[Princípio de UX]** Transversal à V1 e evoluções; não é backlog. |
| Contexto, prioridade, relevância, ausência de dados, empty states e confiança | **[Princípio de UX]** Formulações consolidadas na seção 21. |
| Custo das perguntas | **[Princípio de UX]** Cada pergunta precisa justificar o valor devolvido. |
| Primeira Meta | **U12:** opcional, “Agora não”; se criada, entidade real com regras globais. |
| Saldo inicial | **U12:** obrigatório ≥ R$0, marco conhecido, não Entrada. |
| Renda e contexto de gastos | **U12:** renda fora do onboarding; Categorias/limites opcionais e reais, sem gastos automáticos. |
| Persistência do contexto declarado | **[Alinhamento PD/PM ↔ Dev]** Renda e implementação histórica do planejamento a definir; não criar entidade separada de despesas fixas para onboarding. |
| UAU Moment e Activation Moment | **U12:** clareza antes da Home em cenários completo, mínimo e zero; plano quando houver Meta. Design final em exploração. |
| Negociação | **[MVP / Regra]** Apresentar consequências e alternativas; usuário decide. |
| Plano agressivo | **[Regra]** Linguagem objetiva e caminhos; **[Pendente]** limiar matemático. |
| Home inicial | **U12:** Disponível conhecido; Meta se criada, senão Empty State; Insights somente relevantes; Nova Transação disponível. |
| Recorrências | **[Backlog]** U02 não havia decidido o escopo; U05 define fora do MVP. Funcionamento continua aberto. |
| Recomendações sofisticadas de redução de gastos | **[Backlog / evolução já registrada]** Não antecipadas pelos novos princípios. |

### 22.11 Registro da revisão

**v1.2 — U02:** preservado o conteúdo existente e acrescentadas as seções UX Principles e Onboarding V1; atualizadas as referências de escopo, MVP, pendências, alinhamentos e continuidade que dependem dessas decisões. A faixa O01–O06 continua exploratória. Backlog e demais pendências não foram resolvidos por suposição.

Fonte primária de U02: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/f3091c44-c616-4322-a29a-3f8964d66dd0/Texto colado.txt>).

## 23. Architecture Check 01 — Categorias e planejamento no Onboarding

**Fonte: U03, com revisão U12:** preserva Categorias/planejamento reais e negociação quando há Meta; Meta passa a opcional, saldo obrigatório e renda fora do onboarding. Recorrências e retomada continuam sem nova decisão.

### 23.1 [Regra de Negócio] Alterações não devem reescrever o histórico

Informações de planejamento com efeito temporal devem preservar **o valor válido em cada período**. Uma alteração passa a valer a partir daquele momento/período, sem recalcular retroativamente o passado com a configuração atual.

> **“Uma alteração muda o presente e o futuro; não reescreve o contexto histórico em que as decisões anteriores aconteceram.”**

| Período | Exemplo de planejamento de Alimentação |
|---|---|
| Setembro | R$800; continua sendo a referência histórica de setembro. |
| Outubro, quando ocorre a alteração | R$1.000. |
| Períodos seguintes | R$1.000 até nova alteração. |

A regra protege análises, comparações e insights históricos. Refere-se a **informações de planejamento temporais**; não revoga as regras de correção de transações ou de movimentações retroativas já documentadas.

**[Alinhamento PD/PM ↔ Dev]** Preservar vigência/histórico das informações temporais relevantes, em vez de armazenar apenas o último valor configurado. A primeira necessidade identificada é o planejamento mensal das Categorias; considerar o princípio sempre que outra configuração temporal afetar análises históricas. A estrutura técnica e os detalhes de implementação não foram definidos.

### 23.2 [MVP] Categorias sugeridas e editáveis

> **“O Manga não impõe uma taxonomia de categorias, mas pode sugerir um ponto de partida editável.”**

Durante o onboarding, pode sugerir **Alimentação, Moradia, Transporte e Lazer**. São sugestões, não categorias obrigatórias. O usuário pode **manter, editar nome, personalizar, remover e adicionar outras**.

Cafés, Rolê, Games, Dates, Cachorro e outros agrupamentos pessoais continuam válidos. O objetivo é reduzir esforço inicial e deixar partes reais do produto configuradas. A lista exemplificada não é uma taxonomia universal nem uma lista fechada de categorias.

### 23.3 [MVP] Planejamento mensal por Categoria

O usuário poderá informar quanto pretende gastar por mês em cada Categoria. Esse valor é o **planejamento/limite mensal da Categoria no MVP**, mantendo o limite opcional já definido.

Pergunta conceitual:

> **“Quanto você pretende gastar por mês?”**

Evitar apresentar apenas o campo técnico “Limite”. O texto comunica intenção e planejamento, não restrição imposta pelo Manga.

| Categoria | Exemplo de planejamento mensal |
|---|---:|
| Moradia | R$1.500 |
| Alimentação | R$800 |
| Transporte | R$400 |
| Lazer | R$300 |

O limite **não impede transações**; serve de referência para acompanhamento e orientação. Exemplo de acompanhamento com dados registrados: **Alimentação — R$520 de R$800; 65% utilizado; restam R$280**.

### 23.4 [Regra de UX] O planejamento pode ser alterado

Deixar claro, inclusive durante o onboarding, que o valor não é definitivo:

> **“Use esse valor como referência para o seu mês. Você poderá ajustá-lo quando quiser.”**

Planejamento se adapta à realidade do usuário, em coerência com a renegociação de Metas. Edição posterior de planejamento de Categoria ocorre em **C04**, preservando o histórico.

### 23.5 [Regra de Negócio] Planejamento não significa gasto realizado

**Planejado ≠ Realizado.** Informar Alimentação com planejamento de R$800 **não cria** Saída de R$800.

Gasto realizado deve ser calculado **exclusivamente a partir das transações efetivamente registradas**. Planejamento fornece intenção/contexto; não comprova pagamento nem cria recorrência.

### 23.6 [Arquitetura / MVP] Categorias substituem despesas fixas declaradas

Não criar por enquanto uma entidade separada **Despesa fixa declarada** apenas para atender ao onboarding. Usar **Categorias + planejamento mensal** para obter contexto inicial sobre como o usuário pretende distribuir parte dos gastos.

A decisão resolve a lacuna de coletar informações que depois não têm experiência de gestão no produto. As Categorias configuradas durante o onboarding passam a existir normalmente em **C01** e são editáveis pelo fluxo existente, em **C04**.

**Categoria e despesa fixa não são a mesma coisa.** A escolha evita uma nova entidade no MVP antes de haver necessidade suficiente; não redefine o conceito de despesa fixa nem decide o futuro fluxo de recorrências.

### 23.7 [Resultado do Onboarding / MVP] Categorias já devem estar vivas no produto

As informações do onboarding alimentam diretamente as áreas existentes. Se o usuário configurar Moradia, Alimentação, Transporte e Lazer, elas já estarão disponíveis ao acessar Categorias.

| Momento | Exemplo em Alimentação |
|---|---|
| Categoria configurada, sem transações registradas | R$0 de R$800 planejados. |
| Após registro de gastos | R$520 de R$800 planejados. |

O zero inicial representa **nenhum gasto registrado naquela Categoria**, não conhecimento de que o usuário não gastou na vida real. Preservam-se os empty states contextuais e a distinção entre desconhecimento e zero conhecido.

O onboarding configura o produto real: suas informações não desaparecem ao concluir. Isso não adiciona um bloco permanente de Categorias à Home; o acesso e o acompanhamento continuam nas áreas já definidas.

### 23.8 [Backlog] Separar gasto habitual de gasto pretendido

No MVP, perguntar apenas **“Quanto você pretende gastar por mês?”**, usando a resposta como planejamento/limite da Categoria. Não acrescentar pergunta de gasto habitual ao MVP por causa desta evolução.

Futuramente, distinguir:

| Conceito | Significado | Exemplo futuro: Alimentação |
|---|---|---:|
| Gasto habitual | “Quanto normalmente gasto.” | R$1.050 |
| Gasto planejado/pretendido | “Quanto quero gastar.” | R$800 |
| Gasto realizado | “Quanto efetivamente gastei.” | R$870 |

Isso permite reconhecer progresso além de ultrapassar ou não o limite:

> “Você gastou R$180 menos do que costumava gastar, embora tenha ficado R$70 acima do que havia planejado.”

### 23.9 [Backlog / Inteligência] Gasto habitual observado

Com histórico suficiente de transações, o Manga poderá calcular comportamento habitual observado, sem depender apenas da percepção declarada.

Exemplo futuro: **“Média dos últimos 3 meses com Alimentação: R$1.020.”** Três meses é exemplo, não janela de cálculo aprovada.

| Conceito futuro | Origem / significado |
|---|---|
| Habitual declarado | Percepção inicial do usuário. |
| Habitual observado | Comportamento identificado pelo Manga a partir do histórico. |
| Planejado | Intenção do usuário. |
| Realizado | Comportamento efetivo no período, a partir dos registros. |

Respeitar **“A assertividade do Manga acompanha sua confiança nos dados.”** Essa evolução não elimina comparações e insights simples já no escopo; registra a distinção futura entre os quatro conceitos, sem torná-la requisito de V1.

### 23.10 [Pendente] Renda declarada após o Onboarding

**Revisão U12:** renda estimada fora do onboarding MVP. Regras anteriores sobre zero/variabilidade são antecedentes; primeiro demonstrar finalidade e valor para eventual retorno. Saldo Inicial obrigatório resolve a antiga lacuna de omissão.


A antiga questão “onde renda e despesas fixas são gerenciadas depois do onboarding?” está **parcialmente resolvida**:

- Planejamento de gastos: Categorias, com edição em C04.
- Renda declarada: ainda é necessário definir onde visualizar e alterar a renda mensal informada.

**Não criar uma nova interface apenas para resolver a renda agora.** Manter a questão no Architecture Check e verificar se existe local conceitualmente adequado no restante do produto. Persistência da renda também permanece em alinhamento com Dev.

### 23.11 Architecture Check 01 — quadro atualizado

| Item | Status | Encaminhamento |
|---|---|---|
| Categorias/planejamento de gastos após onboarding | **Resolvido** | Informações existem nas Categorias em C01. |
| Edição do planejamento | **Resolvido — C04** | Reutilizar fluxo de Categorias. |
| Persistência histórica do planejamento | **[Regra de Negócio] definida / [Alinhamento PD/PM ↔ Dev]** | Preservar vigência/histórico; alinhar implementação. |
| Renda declarada | **Fora do onboarding (U12)** | Justificar uso antes de retorno; então definir gestão posterior. |
| Persistência/retomada do onboarding | **[Pendente / Alinhamento PD/PM ↔ Dev]** | Comportamento ainda não decidido. |

### 23.12 Registro da revisão

**v1.3 — U03:** atualizadas as definições afetadas de Categorias, vigência e Onboarding; substituída a proposta de entidade Despesa fixa declarada por Categorias + planejamento mensal. Acrescentados backlog habitual/pretendido/observado e status do Architecture Check 01. Preservadas as demais decisões e as pendências de renda, retomada e recorrências.

Fonte primária de U03: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/24d24463-19e3-416f-b9a6-1e6f16ed4ab9/Texto colado.txt>).

## 24. CHECK 02 — METAS

**Fonte: U04. Status: arquitetura funcional principal do fluxo de Metas validada.** Esta atualização refina as regras anteriores sem resolver as pendências de plano fixo/adaptativo, feedbacks, retiradas significativas ou relevância compartilhada.

**Correspondência de IDs:** U04 usa M03 para detalhes e M04 para edição. O checkpoint mantém **M03 — Seu Plano; M03.1 — Ajustar Plano; M04 — Detalhes; M05 — Editar; M06 — Atualizar Progresso**. Os comportamentos abaixo foram incorporados pelo significado da experiência, sem renumerar o inventário.

### 24.1 [MVP / Regra de Negócio] Estados iniciais de andamento

As Metas ativas possuem **No ritmo, Precisa de atenção e Adiantada**. Ao alcançar ou ultrapassar o valor objetivo, passam a **Concluída**.

A unidade inicial do MVP é o equivalente a **uma contribuição mensal planejada**, para tornar o desvio compreensível como “aproximadamente um mês atrasado” ou “aproximadamente um mês adiantado”.

| Estado | Regra inicial |
|---|---|
| No ritmo | Progresso dentro da margem equivalente a **menos de uma contribuição mensal** de diferença em relação ao esperado naquele momento. |
| Precisa de atenção | Aproximadamente **uma contribuição mensal ou mais atrás** do progresso esperado. |
| Adiantada | Aproximadamente **uma contribuição mensal ou mais à frente** do progresso esperado. |
| Concluída | Valor reservado **alcança ou ultrapassa** o objetivo. |

Exemplo: objetivo de **R$1.000**, prazo de **4 meses**, referência de **R$250/mês**. Ao final do segundo mês, esperado de R$500 e realizado de R$250 produzem diferença de R$250: aproximadamente uma contribuição mensal atrás, portanto **Precisa de atenção**.

Essa é a **regra inicial do MVP**, sujeita a refinamento conforme uso real. U04 não especifica interpolação diária do esperado, arredondamento ou demais detalhes intramês. Não utilizar automaticamente essa unidade como threshold de feedback, retirada ou insight.

### 24.2 [MVP / Regra de UX] Criar Meta sempre apresenta planejamento

Mesmo **fora do onboarding**, a criação não termina apenas coletando nome, valor, prazo e valor já reservado. **Antes da confirmação**, o Manga transforma os dados em um plano compreensível, explicando como foi planejado e o esforço necessário.

Preserva-se a sequência conceitual já definida em M02 → M03: desejo e dados → planejamento → confirmação. O princípio de valor do primeiro plano também vale para novas Metas durante o uso recorrente.

### 24.3 [MVP] Recomendações e plano próprio

O Manga pode apresentar diferentes possibilidades:

- Uma recomendação principal.
- Uma alternativa mais conservadora.
- Uma alternativa mais acelerada.
- Definição manual do próprio plano.

O usuário pode escolher um valor mensal maior ou diferente do sugerido.

> **“O Manga recomenda caminhos, mas o usuário mantém controle sobre o próprio plano.”**

Sugestão calculada não é obrigatória. Os nomes “recomendado”, “conservador” e “acelerado” são conceituais e podem ser refinados em UX Writing/UI. Não foram definidas fórmulas de geração dessas alternativas nem sua quantidade obrigatória na interface.

### 24.4 [Pendente — Sistema de Orientações / Feedback] Após movimentações

Definir quando apenas confirmar e quando orientar, motivar ou alertar. A classificação abaixo preserva os cenários discutidos, **sem thresholds finais**.

| Tipo | Intenção e exemplo | Superfície discutida |
|---|---|---|
| Confirmação | Movimento normal: “R$500 adicionados à sua meta.” | Toast ou feedback simples. |
| Feedback contextual | Significado para o andamento: “Você chegou a 92% do planejado para este período.” | Pode ser inline junto à Meta, nos detalhes, sem interromper com modal/sheet. |
| Reforço positivo | Avanço relevante: “Você está um mês à frente do seu plano.” | Não definida. |
| Alerta/orientação | Movimento ou ausência de progresso com impacto: “Seu ritmo ficou abaixo do planejado.” | Não definida. |
| Celebração | Meta alcançada ou superada. | Experiência própria; formato e regras operacionais não fechados. |

Precisamos de uma **lógica compartilhada de relevância**, evitando thresholds arbitrários diferentes em cada parte do produto. O percentual de 92% é exemplo de mensagem, não gatilho aprovado.

### 24.5 [Alinhamento PD/PM ↔ Dev] Plano fixo × adaptativo

**Decisão aberta:** ainda não foi definido se a referência mensal será recalculada automaticamente conforme o progresso real. Esta pendência substitui qualquer leitura anterior de que o modelo fixo já estivesse aprovado.

| Modelo | Comportamento | Benefício / risco discutido |
|---|---|---|
| A — Plano fixo | Referência de R$650/mês permanece R$650 mesmo após reservar só R$300 em um mês. Manga explica impacto e oferece alternativas. | Maior previsibilidade. |
| B — Plano adaptativo | Recalcula esforço para preservar a data final; por exemplo, R$650 passa a R$690 após progresso abaixo do esperado. | Mantém alinhamento matemático ao prazo; pode parecer punição e mudar frequentemente. |

Levar a discussão PD/PM ↔ Dev antes de fechar o comportamento final. Não escolher automaticamente nenhum dos modelos ao implementar status, previsão ou atualização de progresso.

### 24.6 [Regra de UX] Progresso menor não gera punição automática

Independentemente do modelo escolhido, uma movimentação menor não deve ser tratada como falha. Quando o desvio for relevante, comunicar a consequência:

> “Seu ritmo ficou abaixo do planejado.
>
> Mantendo esse ritmo, sua Meta pode levar aproximadamente dois meses a mais.”

Quando apropriado, oferecer **manter o plano atual, compensar posteriormente, ajustar o prazo ou renegociar**. Aplicar **Situação → Consequência → Alternativas → Decisão do usuário**. O exemplo não define fórmula de previsão nem obrigação automática de compensação.

### 24.7 [Pendente — Sistema de Relevância das Metas] Retiradas significativas

Pequenas retiradas não exigem necessariamente alerta. Retirar R$20 de uma Meta de R$20.000 pode demandar apenas confirmação. Uma retirada que altere significativamente o andamento deve gerar orientação sobre impacto e possibilidade de rever o plano.

Exemplo: **“Essa retirada deixa sua Meta aproximadamente um mês atrás do plano.”**

Critérios possíveis a avaliar, sem seleção ou threshold aprovado:

- Quantidade de contribuições mensais afetadas.
- Impacto no prazo.
- Percentual do valor já reservado.
- Percentual do valor total da Meta.

Não criar percentual arbitrário antes da discussão de produto.

### 24.8 [MVP / Regra de Negócio] Alterações estruturais mostram impacto antes de confirmar

**U10 restringe à Meta ativa:** após conclusão/UAU, objetivo e prazo ficam travados; novo objetivo exige nova Meta. Reduzir objetivo ativo abaixo do reservado é permitido e dispara conclusão/superação normal: R$8.000 / R$6.000 ≈ 133%. Antes de confirmar, mostrar impacto e novo planejamento. Nome e outras edições simples podem continuar quando fizer sentido.

**Cosméticas:** nome, imagem, ícone e etiquetas podem ser salvos normalmente.

**Estruturais:** valor objetivo, prazo e outros elementos que alterem o plano devem provocar **recálculo e apresentação da consequência antes de confirmar**.

Exemplo:

> “Com o novo valor da Meta, seu planejamento também muda.
>
> Antes: R$650/mês.
>
> Novo planejamento: R$820/mês.”

O usuário confirma depois de compreender o impacto. No inventário vigente, identidade/valor objetivo são editados em M05 e prazo/contribuição em M03.1; a regra vale em ambos os contextos. U04 não exige duplicar prazo no formulário de M05.

### 24.9 [Regra Global de Negócio] O Manga não reescreve o passado

Promovida a **regra global**: quando uma configuração, planejamento ou condição muda, a alteração passa a valer a partir daquele momento/período. O histórico preserva as informações válidas no contexto anterior.

> **“Uma mudança atual altera o presente e o futuro; não reescreve o contexto histórico em que o passado aconteceu.”**

Exemplo: de janeiro a maio, objetivo de **R$15.000**; em junho, alteração para **R$18.000**. Janeiro–maio continua representando objetivo de R$15.000; de junho em diante vale R$18.000. A mesma regra se aplica ao planejamento mensal de Categorias.

**[Alinhamento PD/PM ↔ Dev]** Preservar vigência/histórico das informações temporais relevantes no modelo de dados. A regra trata mudanças de configuração/planejamento/condição; não elimina a correção de registros financeiros errados ou a pendência de movimentações retroativas.

### 24.10 [MVP] Excluir Meta

Permitir exclusão de Meta com **confirmação explícita**. A interface deve deixar claro que excluir **devolve todo o valor reservado ao Disponível, sem criar Entrada/Saída ou alterar Transações existentes**.

**Atualizado por U09:** a exclusão devolve o reservado ao Disponível. Substitui a regra de U04 de não alterar Saldo; permanece sem gerar Entrada/Saída. **U10 exige preservar o histórico financeiro e referência legível da Meta excluída.** Implementação técnica dessa preservação segue em alinhamento.

### 24.11 [Backlog] Arquivar / abandonar Meta

Futuramente, permitir encerrar a busca de um objetivo **sem excluir seu histórico**. Conceitos possíveis: **arquivada, abandonada ou cancelada**; nomenclatura/estados ainda não fechados.

Preservar esse contexto pode apoiar análises e inteligência futuras. **Não faz parte do MVP atual.**

### 24.12 [MVP] Conclusão e superação

**Concluída:** valor reservado alcança ou ultrapassa objetivo. Conclusão requer celebração própria, pois alcançar objetivos é o resultado central do Manga; não apenas uma troca silenciosa de status.

**Superação:** permitir reserva acima de 100% e não bloquear movimentações porque a Meta foi alcançada. Exemplo: objetivo R$15.000; reservado R$15.500. A barra **pode** permanecer em 100%, mas mostrar os valores reais **R$15.500 / R$15.000**.

Superação tem cenário próprio de comemoração, diferente ou mais enfático que alcançar exatamente o objetivo. Não foi criado um status separado chamado “Superada”: o status definido continua Concluída. Frequência/repetição da celebração e efeito de retirada posterior continuam pendentes.

### 24.13 [MVP] Metas concluídas permanecem acessíveis

M01 mantém ativas em primeiro plano e **concluídas abaixo, em seção colapsável**. Estrutura conceitual:

```text
Metas ativas
[...]

Metas concluídas (3)
[seção colapsável]
  Meta concluída A
  Meta concluída B
  Meta concluída C
```

A seção pode ficar recolhida para não competir com objetivos ativos. Ao abrir uma concluída, acessar **M04 em estado Concluída**, com detalhes e histórico da conquista (U04 chamou esse destino de M03; ver correspondência de IDs).

### 24.14 [Pendente — Sistema de Orientações / Insight Engine] Relevância unificada

Avanço acima do esperado, progresso abaixo, retirada, motivação, alerta, renegociação e insight na Home dependem de avaliar relevância. **Evitar thresholds independentes por cenário.**

Avaliar um modelo compartilhado baseado principalmente no **impacto sobre o planejamento da Meta**. A contribuição mensal já foi escolhida como unidade inicial para status; avaliar se também ajuda nos feedbacks, **sem assumir que serve para todos**.

### 24.15 Status do CHECK 02

| Item | Classificação / status |
|---|---|
| Arquitetura funcional principal de Metas | **Validada** |
| Status e contribuição mensal como unidade inicial de desvio | **[MVP] Definido** |
| Criação sempre apresenta plano; usuário pode definir o próprio | **[MVP / Regra de UX] Definido** |
| Meta não representa dinheiro transacionado | **[Regra de Negócio] Mantida** |
| Alterações estruturais apresentam impacto | **[MVP / Regra de Negócio] Definido** |
| Preservação do contexto histórico | **[Regra Global de Negócio] Definida / [Alinhamento PD/PM ↔ Dev] implementação** |
| Excluir Meta devolve reservas ao Disponível, sem Entrada (U09) | **[MVP] Definido** |
| Arquivar/abandonar preservando histórico | **[Backlog]** |
| Concluídas acessíveis abaixo das ativas, em seção colapsável | **[MVP] Definido** |
| Permitir ultrapassar 100%; celebrar conclusão e superação | **[MVP] Definido** |
| Plano fixo × adaptativo | **[Alinhamento PD/PM ↔ Dev] Em aberto** |
| Thresholds de feedback após movimentações | **[Pendente]** |
| Retirada significativa | **[Pendente]** |
| Sistema unificado de relevância | **[Pendente — Sistema de Orientações / Insight Engine]** |

### 24.16 Registro da revisão

**v1.4 — U04:** incorporado CHECK 02 — METAS; atualizados estados, criação/alternativas, alterações estruturais, exclusão, histórico temporal, conclusão/superação e acesso às conquistas. Arquivamento registrado no backlog. Plano fixo/adaptativo e thresholds de relevância continuam abertos. Preservadas as definições anteriores não afetadas.

Fonte primária de U04: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/4c72e8a8-7ff3-4434-8f67-bf475348b1fa/Texto colado.txt>).

## 25. Regras de Negócio & Dependências do Sistema

**U08 — Onboarding coleta; features são fontes de verdade e edição.** Meta → Metas; Categoria/planejamento → Categorias; saldo inicial → Saldo; dados pessoais → Conta e dados. Não duplicar dados nem exigir retorno ao onboarding. Renda estimada seria contexto, não Entrada; U12 retira coleta até justificar finalidade e valor. Ajustes e históricos financeiros não pertencem a Configurações. Notificações externas respeitam preferências; Insights internos não têm liga/desliga próprio.

**U07 — Home como agregadora:** features produzem fatos; Manga Insights interpreta; Home prioriza/apresenta. Transação pode mudar Saldo/Categoria/Insights e Home; movimento de Meta pode mudar progresso/status/Insights e ranking; planejamento de Categoria pode mudar status/Insights/Home. Home não mantém versão independente dos dados. Fila e ciclo de vida continuam em alinhamento.

**Complementos globais U06:** nomes duplicados não são permitidos dentro do mesmo tipo de entidade, inicialmente Metas e Categorias; tipos diferentes podem compartilhar nome. Planejamento de Categoria muda imediatamente, preservando valor anterior, novo e data da mudança; granularidade técnica continua pendente.

**Referência funcional compartilhada entre Produto/Design e Desenvolvimento.** Esta seção responde: **“Quando X acontece, quais outras informações do sistema precisam mudar?”** Descreve comportamento esperado do produto, sem determinar backend, tabelas, APIs ou estratégia de implementação. Consolida U05 e regras anteriores; próximos Architecture Checks devem ampliar este registro.

**U11 — validações transversais:** Transação > R$0; reserva/retirada > R$0; retirada ≤ reservado e reserva ≤ Disponível. Saída pode exceder Disponível sem confirmação extra apenas por resultar negativo. Saldo Inicial informado ≥ R$0, não excluível no MVP; renda estimada foi retirada do onboarding em U12; distinções entre zero e ausência permanecem válidas. Valores na experiência em BRL com duas casas decimais. Matriz consolidada na seção 32.

### 25.1 [MVP / Regra de Negócio] Significado de Saldo e tipos financeiros

Sem integração bancária/Open Finance, Saldo representa o **dinheiro conhecido pelo Manga ainda disponível para utilização**, construído com informações fornecidas e eventos registrados. U09 exclui as reservas de Metas desse Disponível e dispensa métrica de patrimônio total no MVP.

**Saldo conhecido pelo Manga ≠ necessariamente dinheiro real disponível em todas as contas bancárias.** A distinção permanece na documentação mesmo se a UI usar um nome simples.

| Tipo conceitual do MVP | Significado | Efeito |
|---|---|---|
| Entrada | Movimentação positiva que efetivamente ocorreu. | Aumenta Saldo; não possui Categoria. |
| Saída | Movimentação negativa que efetivamente ocorreu. | Reduz Saldo; pode possuir Categoria de gasto. |

**U10: não existe Ajuste especial no MVP.** Reconciliação sem Entrada/Saída fica no backlog. Correções por Transações normais entram nas métricas. Entrada/Saída representam fatos financeiros. Saldo pode ser negativo; **não impedir Saída por saldo conhecido insuficiente**, pois Manga não movimenta dinheiro real.

### 25.2 [Regra Global de Negócio] Correção factual × alteração de planejamento

Refinamento de “O Manga não reescreve o passado”:

| Situação | Regra | Exemplo |
|---|---|---|
| Mudança de intenção/configuração/planejamento | Preservar valores válidos no contexto anterior; mudança vale a partir do momento/período. | Alimentação passa de R$800 para R$1.000 em outubro; setembro permanece R$800. |
| Correção factual | Pode corrigir o histórico para representar o que realmente aconteceu. | Compra registrada em agosto ocorreu em setembro: retirar dos agregados de agosto e incluir nos de setembro. |

Não usar preservação histórica para impedir correção de um fato errado. Não usar correção factual para recalcular planejamento passado com a configuração atual. A mesma preservação temporal continua aplicável a objetivos e planos de Metas.

### 25.3 [Dependência do Sistema] Transação → Saldo

Toda criação, edição e exclusão de Transação atualiza Saldo e informações dependentes quando aplicável.

| Ação | Efeito em relação ao estado anterior |
|---|---|
| Criar Entrada de R$500 | Saldo +R$500. |
| Criar Saída de R$500 | Saldo −R$500. |
| Editar Saída de R$100 para R$150 | Saldo −R$50 adicionais. |
| Excluir Saída de R$150 | Saldo +R$150. |

Esses efeitos não resolvem a pendência de como apresentar Saldo em períodos históricos.

### 25.4 [Dependência do Sistema] Saída → Categoria e derivados

**Refinamento U06:** criar Saída categorizada atualiza Saldo e realizado, recalcula percentual e pode mudar o **status factual** e alimentar Manga Insights. Editar valor de R$50 para R$80 adiciona **diferença de R$30** ao realizado. Excluir Transação remove seu valor do realizado e recalcula indicadores. Se não houver planejamento, não inventar percentual/status de limite.

**Período + planejamento + realizado:** combinar Transações daquele período com planejamento válido no contexto temporal consultado. Não aplicar automaticamente a configuração atual ao passado. Mudanças intramês devem respeitar aplicação imediata e preservação de quando ocorreram; modelo técnico ainda depende de alinhamento.

Saída categorizada alimenta o **realizado da Categoria no período em que aconteceu**. Exemplo: café de R$20 em Alimentação adiciona R$20 ao realizado de Alimentação naquele período.

Isso pode alterar progresso da Categoria, relação planejado × realizado, status e insights derivados. Planejamento/limite continua sendo referência: não vira gasto automaticamente.

**Troca de Categoria:** retirar valor do realizado anterior e adicioná-lo à nova Categoria, no período correspondente. Exemplo R$50 de Alimentação → Lazer: Alimentação −R$50 realizados; Lazer +R$50 realizados; **Saldo não muda**.

### 25.5 [MVP / Dependência do Sistema] Retroatividade e mudança de data

**U09:** permitir registro retroativo apenas quando **data do Saldo Inicial ≤ data da movimentação ≤ hoje**, sem limite arbitrário de dias. A competência é definida pela movimentação, não pelo cadastro. Data de criação pode ser preservada internamente. Um Mercado de R$200 registrado em outubro com data de 20 de setembro compõe **Saídas, realizado da Categoria e derivados de setembro**.

Ao corrigir a data de 30/08 para 01/09, remover o valor dos agregados correspondentes de agosto e acrescentar aos de setembro. Recalcular quando aplicável **Entradas, Saídas, Categorias, indicadores e comparações** dos períodos envolvidos e efeitos financeiros posteriores dependentes. Insights ativos podem ser reavaliados; comunicações passadas não são reescritas (U09).

O saldo total atual permanece coerente com a movimentação real; mudar apenas a data não cria um segundo fato financeiro. O significado do Saldo exibido em cada período continua pendente.

### 25.6 [MVP / Regra de UX / Dependência do Sistema] Alterar Tipo

O Tipo pode ser editado. Como troca de Entrada/Saída é estrutural, **pedir confirmação explícita explicando o impacto antes de efetivar**. Dialog, Modal ou Sheet será escolhido em UI/Component Mapping.

Exemplo conceitual:

> “Alterar esta movimentação de Saída para Entrada mudará seu Saldo e removerá a Categoria vinculada.
>
> Deseja continuar?”

| Alteração | Dependências obrigatórias |
|---|---|
| Saída → Entrada | Remover valor do realizado da Categoria anterior; remover vínculo; recalcular Saldo com mudança de sinal; recalcular agregados do período, indicadores e insights. |
| Entrada → Saída | Começar sem Categoria, sem inferência automática; permitir seleção opcional (U09); recalcular Saldo e Entradas/Saídas; alimentar Categoria escolhida quando houver; recalcular derivados; não deixar estado inválido. |

**Exemplo:** Saída R$500 → Entrada R$500 produz impacto líquido de **+R$1.000** no Saldo em relação ao estado anterior. Não confundir a mudança de sinal com um simples acréscimo de R$500.

**[Regra de Negócio — atualização U06]** Categoria é opcional em Saídas, inclusive novas/convertidas. Entradas não possuem Categoria e devem ter qualquer vínculo removido. Ausência de Categoria não torna uma Saída inválida.

### 25.7 [MVP / Dependência do Sistema] Excluir Transação

Permitir exclusão com confirmação, pois muda o acompanhamento financeiro.

> “Excluir transação?
>
> Essa movimentação será removida do seu histórico e seu acompanhamento financeiro será atualizado.”

Depois, recalcular **Saldo, Entradas/Saídas, Categoria quando houver e indicadores dependentes**, incluindo insights quando aplicável. Não confundir exclusão de um fato com exclusão de sua Categoria organizadora.

### 25.8 [Backlog — revisão U10] Ajuste/Reconciliamento de Saldo

Não existe tipo especial Ajuste no MVP. U10 substitui a proposta auditável de U05/U08/U09. No MVP, Entrada/Saída corretiva é uma Transação normal, com efeitos nas métricas e regras de Categoria do respectivo tipo.

Recurso futuro poderá reconciliar Disponível sem criar receita/despesa, mas experiência, localização, histórico, edição/exclusão e impacto temporal/Insights precisam de estudo. Nenhuma regra técnica foi escolhida. Ver seção 31.1.

### 25.9 [Regra de Negócio / Dependência do Sistema] Excluir Categoria

Categoria organiza; Transação representa fato. Ao excluir Categoria, **as Transações e a classificação histórica permanecem**; Categoria e planejamento deixam de estar ativos e novos vínculos são impedidos. **Saldo fica inalterado. U10 substitui o envio automático do histórico para “Sem categoria”.**

O comportamento foi validado no **Check 04 (U06)**: U10 atualiza a confirmação: Categoria indisponível para novas Transações, histórico/classificação preservados; não apagar fatos financeiros. A apresentação de “Sem categoria” em C01 ainda exige alinhamento.

### 25.10 [Regra de Negócio] Meta × Transação × Saldo

**U09:** adicionar R$500 à Meta reduz Disponível em R$500 e **não cria Saída**. Retirar R$500 aumenta Disponível em R$500 e **não cria Entrada**.

**Movimentação de Meta tem natureza própria e altera Disponível, sem compor Entradas/Saídas.** Excluir Meta devolve toda a reserva ao Disponível, com confirmação. U09 substitui as definições anteriores de U04/U05 sobre ausência de impacto em Saldo. Ver taxonomia e limites na seção 30.3.

### 25.11 [Dependência do Sistema] Cadeia funcional consolidada

```text
TRANSAÇÃO → SALDO

SAÍDA CATEGORIZADA
  → REALIZADO DA CATEGORIA NO PERÍODO
  → PLANEJADO × REALIZADO
  → STATUS / INDICADORES
  → INSIGHTS, quando aplicável
```

| Evento já definido no produto | Dependência preservada |
|---|---|
| Movimentação de Meta | Atualiza progresso/status, leitura do plano e Disponível sem gerar Entrada/Saída; mesmo evento nos dois históricos (U09). Modelo fixo/adaptativo segue aberto. |
| Alteração estrutural da Meta | Mostra impacto antes da confirmação e preserva vigência histórica. |
| Alteração do planejamento de Categoria | Afeta presente/futuro desde a vigência; preserva planejamento passado e não cria transações. |
| Onboarding configura Categorias | Elas existem em C01 e são editáveis em C04; planejamento não é realizado. |
| Renda no onboarding | U12 remove coleta do MVP; não produz Entrada/recorrência. |
| Informações alimentam insights/Home | Até três Insights relevantes, prioridade + recência, sem fabricação de conteúdo; Home agrega e não mantém versão independente dos dados (U07). |

As relações indicam efeitos esperados. Não definem implementação, score, thresholds ou novas capacidades de inteligência.

**Complementos U09 às dependências:** “Sem categoria” agrega ausência de vínculo e não tem planejamento, edição, cor personalizada, ícone ou exclusão. A soma de todas as Categorias + Sem categoria deve reconciliar com Saídas do mesmo período; U10 exige preservar nessa leitura as referências históricas a Categorias excluídas. Excluir Categoria libera o nome; uma nova homônima é outra entidade, sem religar Transações antigas. Excluir Transação reverte todos os efeitos; retenção técnica/auditoria segue em alinhamento. Saldo Inicial é marco, não Entrada; sua edição fica no backlog. Virada de mês reinicia métricas periódicas, nunca Disponível ou reservas. Taxonomia oficial e regras completas na seção 30.

## 26. CHECK 03 — SALDO & TRANSAÇÕES

**Fonte: U05.** Consolidação do escopo e das pendências da área; dependências funcionais na seção 25.

### 26.1 [MVP] Busca e filtros de S02

Permitir **busca textual, filtro por Tipo, Categoria e Período**.

- Tipo: **Todos, Entradas, Saídas** (a denominação anterior “Todas” expressa o mesmo estado).
- Categoria: transações de uma Categoria específica; no MVP, Categorias pertencem apenas a Saídas.
- Período: movimentações do intervalo selecionado.

Filtros por valor/origem não passam a ser requisitos por terem sido cogitados anteriormente. Comportamentos detalhados de combinação de filtros não foram fechados; apresentação de Ajustes pertence ao backlog (U10).

### 26.2 [MVP / Regra de UX] Contexto preenche, sem necessariamente bloquear

**“O Manga pergunta apenas aquilo que ainda não sabe.”**

Categoria → Cafés → Adicionar movimentação abre **Tipo: Saída** e **Categoria: Cafés** pré-selecionados. **Tipo continua visível e editável**; se o usuário mudar para Entrada, aplicar regras de Entrada e remover Categoria.

Contexto não elimina comportamentos inesperados do usuário. Mantém-se S03 compartilhada; a mudança de Tipo em transação existente exige a confirmação descrita na seção 25.6.

### 26.3 [MVP / Regra de Negócio] Categorias apenas para Saídas

**Saída → pode possuir Categoria. Entrada → não possui Categoria.** Não criar categorias de renda no MVP. Uma transação convertida de Saída para Entrada perde seu vínculo.

Classificação de tipos/fontes de renda é possibilidade futura, não requisito atual. U05 não havia fechado obrigatoriedade no formulário; **U06 define Categoria opcional para Saídas**. “Sem categoria” também vale quando o usuário não classifica.

### 26.4 [Pendente — Naming / UX Writing] Termo “Saldo”

Avaliar se Saldo transmite expectativa indevida de sincronização bancária. Possibilidades: **Saldo, Meu dinheiro, Disponível, Saldo acompanhado ou outras**.

**Não alterar a nomenclatura atual até a discussão.** A opção “Disponível” é apenas candidata de naming; não autoriza afirmar quanto o usuário pode gastar com segurança.

### 26.5 [Alinhamento PD/PM ↔ Dev] Período de S01 e Saldo histórico

Ainda não foi fechado como o seletor impacta os indicadores. Uma possibilidade considerada simples é que **Saldo, Entradas, Saídas, Transações e gráficos/indicadores respondam ao mesmo período**. Isso continua sendo uma possibilidade, não decisão final.

Antes de fechar, definir o significado de Saldo em período passado:

- Saldo ao final daquele período?
- Variação líquida daquele período?
- Saldo acumulado até aquele momento?

Nenhuma alternativa escolhida. Levar ao sócio/Dev e priorizar **previsibilidade e simplicidade**. A regra de preservar tipo/período ao navegar para S02 continua válida; a semântica histórica de Saldo não é resolvida por ela.

### 26.6 [Backlog] Transações futuras/agendadas

No MVP, Transações são movimentações **que já aconteceram**, inclusive registradas retroativamente desde o marco do Saldo Inicial até hoje (U09). Futuras/agendadas ficam fora do MVP.

Antes de implementar, definir **realizada × prevista, impacto ou não no saldo atual, previsão de saldo, edição/cancelamento, relação com recorrências e comunicação visual**.

Não implementar como simples Transação com data futura sem essas regras.

### 26.7 [Backlog] Transações recorrentes

**Fora do MVP atual.** Exemplos: salário, aluguel, academia, assinaturas e mensalidades. Esta decisão substitui a classificação anterior de “pendente prioritário / possível backlog”.

Antes da implementação, decidir criação automática × confirmação; quando recorrência vira transação real; edição de ocorrência × série; impacto nas previsões; notificações; encerramento; relação com transações futuras. Preservam-se também as perguntas da seção 20 sobre frequências e associação de Categorias, agora limitadas a Saídas no modelo vigente.

### 26.8 Status do CHECK 03

| Item | Classificação / status |
|---|---|
| Saldo representa realidade conhecida, sem garantia de espelhar bancos | **[MVP / Regra de Negócio] Definido** |
| Saldo negativo e Saída com saldo insuficiente | **[MVP / Regra de Negócio] Permitidos** |
| Texto + Tipo + Categoria + Período | **[MVP] Definido** |
| Categoria só em Saídas | **[MVP / Regra de Negócio] Definido** |
| Contexto pré-seleciona; Tipo continua editável | **[MVP / Regra de UX] Definido** |
| Registro retroativo no período efetivo | **[MVP] Definido** |
| Edição de Tipo com confirmação e explicação | **[MVP / Regra de UX] Definido; componente a definir em UI** |
| Ajuste/Reconciliamento especial | **[Backlog] Fora do MVP em U10** |
| Exclusão de Categoria preserva Transações e Saldo | **[Regra de Negócio] Validado no Check 04; apresentação de “Sem categoria” em C01 pendente** |
| Meta altera Disponível sem gerar Entrada/Saída (U09) | **[Regra de Negócio] Definido** |
| Cadeias de recálculo financeiro e de Categorias | **[Dependência do Sistema] Registradas na seção 25** |
| Futuras/agendadas e recorrentes | **[Backlog] Fora do MVP** |
| Nomenclatura final de Saldo | **[Pendente — Naming / UX Writing]** |
| Seletor de período e significado histórico de Saldo | **[Pendente / Alinhamento PD/PM ↔ Dev]** |

### 26.9 Registro da revisão

**v1.5 — U05:** criada a referência Regras de Negócio & Dependências do Sistema; incorporado CHECK 03 e atualizadas definições afetadas de S01–S04, Categorias, Ajuste, backlog e pendências. Recorrências e futuras/agendadas fora do MVP. Preservadas questões abertas de naming, período e regras ainda não decididas do formulário.

Fonte primária de U05: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/c82637ff-8f8e-4a7a-aa52-3ffc61bc3abc/Texto colado.txt>).

## 27. CHECK 04 — CATEGORIAS

**Fonte: U06. Arquitetura funcional principal de Categorias validada.** Esta atualização substitui a interpretação dinâmica de ritmo no MVP por status factual e fecha a opcionalidade de Categoria para Saídas. As demais decisões não afetadas permanecem vigentes.

### 27.1 [Regra de Negócio] Organização e planejamento

Categoria é uma estrutura criada pelo usuário para **organizar e planejar suas Saídas**: agrupa gastos relacionados e permite planejamento mensal opcional. Exemplos: Alimentação, Moradia, Transporte, Lazer, Cafés e Rolê.

Categoria **não possui dinheiro, não é Transação e não altera Saldo diretamente**. Organiza Saídas que alteram Saldo. Só se vincula a Saídas, e esse vínculo é opcional.

### 27.2 [Regra Global de UX] Período padrão

> **“Toda visualização financeira baseada em período deve abrir, por padrão, no mês atual, salvo quando o contexto da funcionalidade exigir outra referência temporal.”**

Aplicar inicialmente a Saldo/Transações, Categorias e históricos financeiros mensais. Permitir outros períodos quando a funcionalidade suportar. Metas têm referência própria de objetivo/prazo e não precisam seguir a regra.

Um período herdado de navegação contextual continua válido. O padrão de abertura **não resolve o significado do Saldo histórico em S01**, ainda pendente.

### 27.3 [MVP] C01 — estrutura e período

C01 abre no mês atual e apresenta **total gasto, distribuição, listagem das Categorias, realizado, planejamento quando houver, percentual utilizado, nome/ícone/cor, acesso aos detalhes e criação**.

Ao selecionar agosto, usar gastos, distribuição e realizado de agosto, junto ao **planejamento válido em agosto** e contexto correspondente. Não reinterpretar o passado com a configuração atual.

**Total e distribuição representam gastos efetivamente realizados.** Não usar valores planejados para simular distribuição. A apresentação dos gastos sem Categoria em C01 permanece em alinhamento.

### 27.4 [MVP] Planejamento opcional, progresso e status factual

Sem planejamento, mostrar normalmente **“Cafés — R$180 gastos neste mês”**, sem inventar percentual utilizado, restante ou status relacionado ao limite. Pode oferecer **Definir planejamento**, sem obrigar.

Com planejamento, apresentar realizado, planejado, percentual e mês. Exemplo: **Alimentação — R$520 de R$800; 65% utilizado**. Pode mostrar **40% do mês transcorrido** como contexto factual.

| Percentual utilizado | Status inicial do MVP |
|---|---|
| Abaixo de 80% | Dentro do planejado. |
| De 80% a 100%, inclusive | Atenção / próximo do planejamento. |
| Acima de 100% | Acima do planejado. |

Naming final pode ser refinado em UX Writing. Tempo do mês **não precisa alterar automaticamente o status no MVP**. Essas faixas não determinam por si a frequência ou prioridade dos insights.

### 27.5 [Backlog] Status dinâmico/contextual

Futuramente combinar percentual usado, tempo do mês, histórico, média, padrão da Categoria e comportamento individual. **70% no dia 5 pode significar algo diferente de 70% no dia 28**, mas gastos não são necessariamente lineares: aluguel no início do mês, mercado em determinados dias, lazer em finais de semana.

Evitar interpretações simplistas no MVP. **Validar necessidade e valor com usuários** antes de evoluir essa inteligência.

### 27.6 [MVP] C02 e comparação dos últimos três meses

Pergunta: **“Com o que estou gastando nesta Categoria e como esse comportamento está evoluindo?”**

Estrutura: nome, ícone, cor, realizado no período, planejamento opcional, progresso, histórico recente, transações associadas, adicionar movimentação e editar Categoria.

Apresentar comparação simples dos **últimos três meses**, usando realizado. Exemplo de U06:

| Mês | Gasto realizado |
|---|---:|
| Setembro | R$620 |
| Agosto | R$760 |
| Julho | R$840 |

Isso oferece contexto sem análise avançada e pode alimentar Manga Insights. Não inventar histórico quando faltarem dados; preservar os estados de histórico insuficiente.

### 27.7 [Definição de Produto] Manga Insights

**Manga Insights** nomeia a camada/experiência que transforma dados financeiros e de planejamento em informações relevantes e acionáveis. **Não significa necessariamente IA.**

Pode usar regras de negócio, comparações matemáticas, histórico, comportamento observado e futuramente modelos de IA. Exemplo: **“Você gastou R$140 menos com Alimentação do que no mês passado.”**

Transformar dados em compreensão e, quando apropriado, próxima ação. Complexidade deve acompanhar dados e confiança; não tornar inteligência sofisticada requisito do MVP.

### 27.8 [MVP / Regra de UX] Adicionar movimentação pela Categoria

Cafés → Adicionar movimentação abre S03 com **Saída + Cafés**, mantendo **Tipo visível e editável**. Mudança para Entrada remove a associação e torna Categoria inaplicável. Respeitar as regras estruturais do CHECK 03; não criar experiência de cadastro duplicada.

### 27.9 [MVP] C03 e cores controladas

Criar com **nome, ícone, cor e planejamento mensal opcional**. Pergunta: **“Quanto você pretende gastar por mês?”** Apoio: **“Você poderá alterar esse valor quando quiser.”**

**[MVP / DS]** Usar gama de cores fornecida pelo Manga, em **paleta controlada**, sem seleção totalmente livre. Objetivos: contraste, consistência visual, legibilidade, uso nos gráficos e coerência com o DS. **Paleta exata em DS Gap Analysis/UI**, não definida neste checkpoint.

### 27.10 [Regra Global de Negócio] Não permitir nomes duplicados

**U11:** Categorias ativas não podem repetir nomes entre si; Metas ativas não podem repetir nomes entre si. Aplicar comparação sem diferença de caixa e espaços nas extremidades; tipos distintos podem compartilhar nome. Concluídas/excluídas não bloqueiam perpetuamente a reutilização do nome de Meta.

| Exemplo | Comportamento |
|---|---|
| Categoria Cafés + outra Categoria Cafés | Impedir duplicidade. |
| Meta Japão + outra Meta Japão | Impedir duplicidade. |
| Meta Viagem + Categoria Viagem | Podem compartilhar nome quando fizer sentido. |

Ao criar duplicidade, impedir conclusão e informar: **“Você já possui uma categoria chamada ‘Cafés’. Escolha outro nome.”** A regra também deve ser respeitada ao editar nomes.

**U11:** comparar nomes de entidades ativas ignorando caixa e espaços nas extremidades. Nome vazio ou apenas espaços é inválido. Acentos, espaços internos e outras normalizações avançadas não foram definidos. Limites de caracteres ficam para UI/Technical Mapping. Metas concluídas/excluídas não bloqueiam perpetuamente reutilização; Categoria excluída libera nome sem transferir identidade/histórico.

**U10 — identidade × planejamento:** nome, cor e ícone usam estado atual, sem versionamento histórico no MVP. Planejamento/limite conserva histórico temporal. Categoria excluída conserva referência histórica sem voltar a ser ativa; nova homônima não herda vínculos nem histórico.

### 27.11 [MVP / Regra Global] Vigência imediata e histórico da mudança

Alterar planejamento no mês atual tem **efeito imediato**. Exemplo: planejamento de R$800 entre 01–19/09; em 20/09, alteração para R$1.000. A partir daí, a Categoria apresenta R$1.000. Agosto continua usando sua referência histórica.

Preservar **valor anterior, novo valor e quando a alteração ocorreu**, permitindo compreender a mudança sem reescrever o contexto passado.

**[Alinhamento PD/PM ↔ Dev]** Definir granularidade técnica: data exata, competência mensal, versionamento da configuração e impacto em consultas históricas. **Imediato + registro de quando mudou é decisão de Produto.** Não mudá-la para simplificar implementação sem alinhamento. **U09 fecha a regra de consulta:** mostrar o último planejamento vigente no mês, indicando a data da mudança, sem proporcionalização diária. O limite continua nos meses seguintes até alteração explícita. Representação e modelagem técnica seguem abertas.

**U11 — limite abaixo do realizado:** permitido, desde que novo limite > R$0. R$450 realizados e limite de R$600 reduzido para R$300 → 150%. Antes da confirmação, explicar mudança na interpretação/análises do período. Não alterar/apagar/recalcular Transações para adequar fatos ao plano. Preservar evento temporal anterior → novo e data; consulta mensal segue a regra do último planejamento vigente, sem proporcionalização.

### 27.12 [MVP] C04 e exclusão

Editar nome, ícone, cor e planejamento mensal. Os primeiros são organizacionais/visuais; planejamento tem efeito temporal e respeita vigência/histórico.

Confirmar exclusão explicando impacto:

> “Excluir categoria ‘Cafés’?
>
> Ao excluir Cafés, ela deixará de estar disponível para novas transações. Seu histórico será preservado.”

Ao confirmar: Categoria e planejamento ativos removidos; novos vínculos impedidos; **referência histórica preservada, Saldo inalterado e fatos financeiros intactos** (U10).

### 27.13 [Regra de Negócio] Saída sem Categoria

Categoria é opcional para Saída: usuário pode não classificar. U10 preserva referência histórica de Categoria excluída; exclusão não transforma automaticamente fatos antigos em “Sem categoria”. Futuramente, importação ou IA também podem não determinar classificação.

Usar **“Sem categoria”** na UI. Isso **não é uma Categoria real do sistema**: preservar a distinção entre entidade criada pelo usuário e ausência de vínculo.

**[Alinhamento PD/PM ↔ Dev]** Representação em C01 ainda aberta:

- **A:** agrupamento visual “Sem categoria” junto às Categorias.
- **B:** ação separada, como “3 gastos precisam de categoria” → “Revisar”.

B foi considerada potencialmente mais acionável, mas **não foi escolhida**. Não decidir entidade, agrupamento ou nova interface por suposição.

### 27.14 [MVP] Empty states parciais

| Cenário | Comportamento |
|---|---|
| Categorias do onboarding sem Transações | Manter cards reais, ex.: Alimentação R$0/R$800 e Transporte R$0/R$400; gráfico ainda sem dados. |
| Distribuição sem gastos reais | “Sua distribuição de gastos aparecerá aqui conforme você registrar movimentações.” Não preencher usando planejamento. |
| C02 sem gastos no período | “Nenhum gasto registrado neste mês.” + “Adicionar movimentação”; não tratar Categoria como inexistente. |
| Gastos sem planejamento | Exibir realizado e possibilidade “Definir planejamento”; não impedir acompanhamento. |

A página pode ter Categorias configuradas e simultaneamente áreas sem dados. Zero de gasto registrado não equivale a afirmar saldo financeiro conhecido igual a zero.

### 27.15 [Regra de UX] Acima do planejado

Evitar “Você gastou demais”. Preferir **“Você está R$120 acima do valor planejado para Lazer.”** Permitir visualizar gastos e entender o ocorrido.

**Não sugerir automaticamente aumentar planejamento apenas por ele ter sido ultrapassado.** Respeitar intenção e autonomia do usuário.

### 27.16 [Backlog] Habitual e inteligência histórica

MVP: **Planejado — quanto quero gastar** e **Realizado — quanto efetivamente gastei**. Futuro: **Habitual — quanto normalmente gasto**, inicialmente declarado e depois observado.

Com dados suficientes, Manga Insights poderá identificar excesso recorrente, redução/aumento consistente, habitual, diferença entre planejamento e realidade e concentração de gastos em momentos do mês. **Não inferir agressivamente esses padrões no MVP.** Comparação factual simples de três meses permanece no escopo.

### 27.17 Status do CHECK 04

| Item | Classificação / status |
|---|---|
| Arquitetura funcional principal | **Validada** |
| Categoria organiza Saídas; planejamento e vínculo opcionais | **[MVP / Regra de Negócio] Definido** |
| Mês atual padrão, salvo contexto | **[Regra Global de UX] Definido** |
| Total/distribuição realizados; planejado × realizado; percentual e contexto mensal | **[MVP] Definido** |
| Status factual e comparação dos últimos três meses | **[MVP] Definido** |
| Manga Insights pode consumir dados | **Definição de Produto registrada** |
| Nomes únicos por tipo e cores de paleta controlada | **[Regra Global / MVP] Definido; paleta exata em DS/UI** |
| Planejamento imediato com histórico de mudanças | **[MVP / Regra Global] Definido** |
| Exclusão preserva Transações e Saldo; Saída sem Categoria válida | **[MVP / Regra de Negócio] Definido** |
| Status dinâmico, habitual e inteligência sofisticada | **[Backlog]** |
| Granularidade/versionamento intramês | **[Alinhamento PD/PM ↔ Dev] Pendente** |
| Representação de “Sem categoria” em C01 | **[Alinhamento PD/PM ↔ Dev] Pendente** |

### 27.18 Registro da revisão

**v1.6 — U06:** incorporado CHECK 04; atualizados status factual, opcionalidade de Categoria, nomes únicos, paleta controlada, mês padrão, comparação histórica, Manga Insights, vigência imediata, exclusão e empty states. Dependências consolidadas na seção 25. Não escolhidas granularidade técnica nem apresentação de “Sem categoria”.

Fonte primária de U06: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/eade0212-edbf-4158-8229-00b717166730/Texto colado.txt>).

## 28. CHECK 05 — HOME & MANGA INSIGHTS

**Fonte: U07. Arquitetura funcional principal da Home validada.** Substitui o limite de um por até três Insights, atualiza ordem e rankings iniciais. Não resolve fila, consumo, ciclo de vida ou comunicação.

### 28.1 [Regra de Produto / MVP] Papel e arquitetura fechada

Home é camada de **leitura, priorização e acesso rápido ao estado atual**. Responde: Como estou? Como estão meus objetivos? Existe algo importante que merece atenção? Qual ação rápida posso realizar?

Não é extrato, relatório completo, listagem completa de Metas/Categorias ou substituta das páginas especializadas. Investigar uma informação leva à área correspondente.

**Cinco blocos V1, na ordem inicial:**

1. Metas.
2. Contexto financeiro.
3. Manga Insights.
4. Ação rápida — Registrar movimentação.
5. Navbar.

Ordem refinável em wireframes/testes; **não adicionar ou remover módulos sem nova decisão explícita de produto**. Evitar crescimento descontrolado durante UI/implementação.

Metas têm prioridade conceitual inicial: **“O dinheiro é organizado para ajudar o usuário a alcançar aquilo que deseja.”** Não são funcionalidade secundária de um dashboard financeiro.

### 28.2 [MVP] Contexto financeiro atual

Home **não possui seletor de período ou exploração histórica**. Outros períodos são explorados em Saldo/Transações e Categorias.

Bloco financeiro inicialmente apresenta **Saldo/conceito equivalente, Entradas e Saídas**, sem replicar S01. Naming de Saldo segue pendente do CHECK 03, sem bloquear arquitetura. U07 não resolve cálculo/apresentação de Saldo histórico em S01.

### 28.3 [MVP] Até três Metas ativas

Ranking inicial: **precisam de atenção → mais próximas da conclusão → criadas mais recentemente**. Proximidade considera principalmente progresso financeiro: Meta com 90% está mais próxima que uma com 70%. Prazo final pode desempatar quando necessário. Não inventar pesos ou algoritmo sofisticado.

**[Backlog] Meta Foco/Principal:** escolha explícita do usuário para destaque especial permanece fora do MVP.

### 28.4 [Definição de Produto / Regra Global] Manga Insights

Interpreta fatos existentes em Metas, Transações, Categorias, histórico, planejamento e progresso, gerando informação relevante, contextualizada e potencialmente acionável. Não é sinônimo de IA: pode usar matemática, regras de negócio, comparação histórica, padrão observado e futuramente modelos de IA.

**Não repetir dados:** “Você gastou R$520 de R$800 em Alimentação” não é Insight se só repete o que já está visível. Deve **interpretar, contextualizar, relacionar, destacar relevância ou oferecer ação útil**.

**Dado → existe significado relevante? → Não: permanece na feature. Sim: pode gerar Insight.** Exemplos factuais anteriores não são automaticamente candidatos à Home.

**Complemento U09:** a Meta concluída recebe celebração/reconhecimento e depois sai do ranking normal da Home, permanecendo em Metas com dinheiro reservado. Sem outra ativa, mostrar Empty State para nova Meta. Ranking: atenção → próximas da conclusão → recentes; proximidade financeira e de prazo podem desempatar.

### 28.5 [MVP] Prioridade, recência e limite

| Prioridade | Significado | Exemplos conceituais |
|---|---|---|
| **P1 — Requer atenção** | Algo relevante afeta planejamento ou merece atenção. | Meta um mês atrás; Categoria significativamente acima do planejado. |
| **P2 — Oportunidade** | Melhoria de organização, planejamento ou qualidade dos dados. | Gastos sem Categoria; Categoria sem planejamento quando houver contexto relevante. |
| **P3 — Positivo** | Progresso, conquista ou comportamento positivo relevante. | Meta um mês adiantada/concluída; redução relevante de gasto. |

Ordenação: **P1 → P2 → P3; recência dentro da mesma prioridade**. Positivos não ocupam espaço de informação mais importante que exige atenção. Exemplos não fixam thresholds de significância.

Home mostra **até três simultaneamente**, sem obrigação de preencher posições. **P1 + P1 + P1 é válido**; não reservar cotas para P2/P3. Se só há um relevante, mostrar um. Sem relevância, omitir seção, sem empty state ou “Tudo certo por aqui” genérico.

> “Se um elemento não possui algo útil para comunicar e não contribui para os objetivos da experiência/produto, ele não precisa ser exibido.”

### 28.6 [Alinhamento PD/PM ↔ Dev] Fila

Elegíveis P1-A, P1-B, P1-C, P1-D, P2-A, P3-A podem resultar inicialmente em P1-A/B/C na Home. Conforme consumidos/resolvidos, outros poderão ocupar posições.

Alinhar **geração, priorização, ordenação, fila, exposição, consumo, substituição e atualização**. Documenta comportamento de produto, não arquitetura técnica escolhida.

### 28.7 [Alinhamento PD/PM ↔ Dev] Consumo e ciclo de vida

Possíveis critérios de consumo, **não escolhidos**: apareceu na Home, entrou no viewport, expandiu, clicou, dispensou, realizou ação ou condição deixou de existir.

Tipos podem diferir: conclusão positiva poderia ser consumida após visualização; atraso persistente não necessariamente desaparece só porque foi visto. Esses exemplos não são regras aprovadas.

Definir no Manga Insights Engine: **quando nasce, entra na fila, aparece, quanto permanece, quando é visto/consumido, desaparece/reaparece, quando persiste, como novos substituem antigos e tratamento de períodos anteriores**. Não presumir que visualização, clique ou tempo resolvem a condição.

**U09 — ciclo de vida:** prioridade não define canal. Disponível negativo é elegível a P1 factual, com caminhos possíveis. Insights semelhantes podem ser consolidados. Ativos são reavaliados/removidos se a condição cessar; passados não são reescritos e não há histórico consultável no MVP. Consumido ≠ resolvido; fila, consolidação e desempate entram em alinhamento prioritário. A recência registrada em U07 permanece referência inicial, mas sua operacionalização no Engine e as regras de substituição não estão fechadas; não assumir novo desempate aprovado.

### 28.8 [Backlog / Alinhamento] Relevância × recência

MVP usa prioridade → recência. Futuramente avaliar ordenação de mesma prioridade por **impacto, contexto e importância**: Meta importante atrasada pode superar evento recente de baixo impacto. Não sofisticar no MVP. A pendência de relevância não substitui o desempate inicial decidido.

### 28.9 [MVP / Regra de UX] Histórico factual e ação opcional

Histórico pode gerar Insight no MVP quando sustentado: **“Seus gastos com Cafés diminuíram nos últimos três meses.”** Evitar extrapolar para **“Você criou hábitos financeiros melhores.”**

> **“O Manga não atribui intenção, causa ou comportamento que os dados não sustentam.”**

Refina U06: interpretação histórica factual simples no MVP; inteligência sofisticada permanece backlog.

Nem todo Insight exige ação. Quando útil: Lazer acima em R$120 → Ver gastos; Meta um mês atrás → Ver Meta/Ver opções. Informativos/positivos podem não ter CTA.

Direcionar ao contexto de origem: **Categoria → C02; Meta → M04 no inventário vigente; Transações → contexto correspondente de Saldo/Transações**. U07 cita M03 para detalhes da Meta, divergência já conhecida; não renumerar. Não criar fluxos paralelos na Home.

### 28.10 [Pendente] Insights × Push

**Insight não gera Push automaticamente.** Push precisa justificar comunicação fora do app; P1 é possível candidato, não autorização automática.

Definir eventos, frequência, repetição, urgência, preferências e relação com Insight já exibido. Relacionar ao sistema global **Home, Inline, Toast, Sheet, Modal/Dialog e Push**. U08 confirma preferências de notificação no MVP; regras de eventos/Push continuam abertas e notificações externas devem respeitar essas preferências.

### 28.11 [Regra Global de Comunicação] Interrupções concorrentes

O mesmo evento não deve gerar sem necessidade **Push + Modal + Toast + Insight + Badge**, todos repetindo a informação. Pode aparecer em diferentes contextos quando necessário, mas precisa de **estratégia de comunicação dominante**. Escolha operacional ainda depende do sistema global.

### 28.12 [MVP] Ação rápida exclusiva para Transações

**Registrar movimentação → Entrada/Saída → S03.** Não usar como launcher para criar Meta/Categoria, ajustar Saldo, editar planejamento ou outras ações secundárias. Ações permanecem em suas áreas.

O CTA contextual do empty state sem Meta anteriormente documentado não é nova opção do launcher; U07 delimita a ação rápida sem eliminar por suposição estados contextuais.

### 28.13 [Regra de Produto / Dependência do Sistema] Home agregadora

> **“Features armazenam/produzem fatos. Manga Insights interpreta fatos. Home prioriza e apresenta.”**

Home não é fonte primária de dados financeiros/planejamento; consome Metas, Transações e Categorias diretamente e por Insights. **Não mantém versão independente desses dados.**

| Mudança | Propagação |
|---|---|
| Transação criada | Saldo muda → Categoria pode mudar → Insight pode nascer/desaparecer → Home atualiza. |
| Meta movimentada | Progresso muda → status pode mudar → Insight pode nascer/desaparecer → ranking de Metas pode mudar. |
| Planejamento de Categoria editado | Planejamento muda → status pode mudar → Insight pode mudar → Home atualiza. |

Isso não define política de consumo/nascimento nem implementação do Engine.

### 28.14 [MVP] Estados parciais e conquistas

Home pode ter Metas sem Transações, Categorias sem Insights e Meta com zero reservado. **Não tratar a Home inteira como vazia** quando um módulo não tem informação.

Meta com progresso zero pode aparecer normalmente, com incentivo sem julgamento:

> “Sua Meta está pronta. Registre seu primeiro valor quando começar a reservar dinheiro.”

Conclusão pode gerar Insight positivo/celebrativo; superação pode gerar variação própria. Duração depende do ciclo de vida ainda aberto. Concluídas seguem acessíveis em M01; ranking de Metas na Home é de ativas.

### 28.15 Status do CHECK 05

| Tema | Classificação / status |
|---|---|
| Arquitetura funcional principal da Home | **Validada** |
| Cinco blocos e ordem inicial | **[MVP] Blocos fechados; ordem refinável** |
| Atual, sem exploração histórica; contexto financeiro | **[MVP] Definido; naming de Saldo pendente** |
| Até três Metas ativas e ranking inicial | **[MVP] Definido** |
| Meta Foco | **[Backlog]** |
| P1/P2/P3, até três Insights, vários P1, prioridade + recência | **[MVP] Definido** |
| Não repetir dados, ação opcional e navegação à origem | **[Regra Global / Regra de UX] Definido** |
| Histórico simples sustentado; omitir seção sem relevância | **[MVP] Definido** |
| Ação rápida só financeira; estados parciais | **[MVP] Definido** |
| Home agrega; Insights interpretam; atualizações propagadas | **[Dependência do Sistema] Registrada** |
| Fila, consumo e ciclo de vida | **[Alinhamento PD/PM ↔ Dev] Pendente** |
| Relevância além de recência | **[Backlog / Alinhamento]** |
| Insights × Push e sistema global de comunicação | **[Pendente / Alinhamento PD/PM ↔ Dev]** |

### 28.16 Registro da revisão

**v1.7 — U07 — 24/09/2026:** incorporado CHECK 05, limite de Insights atualizado para três, blocos e rankings iniciais definidos, Home como agregadora consolidada. Fila/consumo/ciclo de vida/Push continuam abertos; Meta Foco e ranking sofisticado permanecem backlog.

Fonte primária de U07: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/56ebad40-6a9e-4d03-ac77-4f978f8a5b71/Texto colado.txt>).

## 29. CHECK 06 — CONTA & CONFIGURAÇÕES

**Fonte: U08. Arquitetura funcional de Configurações validada.** Ajuste saiu de Configurações em U08 e foi retirado inteiramente do MVP em U10; notificações entram no MVP; Dark Mode fica no backlog. Estudos pré-lançamento não são backlog opcional nem decisões técnicas/jurídicas concluídas.

### 29.1 [Regra de Produto / MVP] Papel e estrutura

> **“Configurações controla conta, preferências e comportamento do aplicativo. Dados financeiros são gerenciados no contexto financeiro correspondente.”**

Reunir dados necessários da conta, preferências, notificações, controles da conta, privacidade/segurança quando definidos, logout e exclusão.

| Grupo | Estrutura conceitual atual |
|---|---|
| Conta e dados | Dados após alinhamento; Nome único obrigatório na identificação, editável em Conta e dados. |
| Notificações | Preferências iniciais. |
| Privacidade e segurança | Estrutura final após estudos pré-lançamento. |
| Conta | Sair; Excluir conta. |
| Informações do aplicativo | Versão, quando aplicável. |

**Não adicionar seção Financeiro.** Não replicar Gerenciar Metas, Gerenciar Categorias, Transações, histórico financeiro, Ajustar Saldo, Manga Insights ou planejamento de Categorias.

Meta → Metas; planejamento de gasto → Categorias; Transação → Saldo/Transações; Ajuste → backlog, localização futura a estudar (U10); histórico → contexto correspondente. CFG01–CFG03 continuam sem distribuição individual de funções definida.

### 29.2 [MVP] Conta e dados, sem Perfil

Não teremos Perfil tradicional: sem necessidade atual de avatar, bio, username público, página de perfil ou informações sociais. Dados necessários ficam em **Conta e dados**, sem criar feature de Perfil.

**U12 substitui Nome preferido separado:** um único Nome obrigatório na identificação/conta, usado em contatos e comunicações pertinentes. Sem nome da conta, apelido e “como quer ser chamado” como campos diferentes. Mantém comunicação próxima e gestão em Conta e dados, sem Perfil.

### 29.3 [Pré-lançamento / Alinhamento PD/PM ↔ Dev] Dados pessoais necessários

**Antes do primeiro Beta**, avaliar dados realmente necessários. U12 define Nome único obrigatório. E-mail, celular e demais dados dependem de finalidade e arquitetura de Conta/Acesso. Idade sai do onboarding; necessidade futura requer finalidade clara, inclusive marketing/persona/segmentação/legal, não coleta por possível utilidade.

Finalidades possíveis: funcionamento da conta, personalização, comunicação, marketing/campanhas, entendimento de público/personas e requisitos legais. Avaliar **necessidade real, finalidade, obrigatoriedade, armazenamento, uso, impacto no onboarding e requisitos legais/LGPD**.

Evitar coleta apenas porque “pode ser útil futuramente”. A lista não aprova formulário, consentimentos ou coleta de todos os campos.

### 29.4 [MVP] Notificações

Configurações terá controle inicial de notificações, que pode ser simples. **Manga Insights não tem configuração própria de ativação/desativação**: faz parte da experiência interna.

Notificações externas de eventos/Insights respeitam preferências. Preservar alinhamentos do CHECK 05 sobre **Insights × Push, prioridade, relevância, frequência e comunicação global**. Isso não aprova gatilhos nem envio automático de todo P1.

**[Backlog] Preferências avançadas:** avaliar granularidade por Metas, alertas, Manga Insights, lembretes e recorrências. Não adicionar complexidade desnecessária ao MVP.

### 29.5 [Regra Global] Onboarding coleta; features são fontes de verdade

> **“Onboarding coleta; as features correspondentes passam a ser as fontes de verdade e edição.”**

| Informação | Destino |
|---|---|
| Meta criada | Metas. |
| Categoria/planejamento | Categorias. |
| Saldo inicial | Compõe Saldo. |
| Dados pessoais | Conta e dados. |

Não criar segunda representação dos mesmos dados nem exigir retorno ao onboarding para manutenção. Renda estimada fora do onboarding em U12; eventual retorno exige finalidade e destino definidos.

### 29.6 [Histórico U08/U11, revisado por U12] Saldo inicial e renda mensal estimada

**Prevalece U12:** Saldo Inicial obrigatório; renda fora do onboarding até justificar uso. A distinção conceitual abaixo é preservada como antecedente, não autorização de coletar renda.

O onboarding distingue **saldo inicial** e **renda mensal estimada**. Não precisa de terceira informação equivalente a uma “Entrada inicial”. Metas e Categorias/planejamento já definidos continuam presentes.

| Conceito | Pergunta / finalidade | Exemplo |
|---|---|---|
| Saldo inicial | “Quanto você tem disponível hoje?” Ponto inicial do acompanhamento. | R$2.800 ao começar. |
| Renda mensal estimada | “Quanto você costuma receber por mês?” Contexto de planejamento. | R$5.500/mês. |
| Entrada realizada | Fato financeiro registrado, efetivamente ocorrido. | Recebimento em determinada data. |

Saldo inicial evita começar artificialmente em zero quando há dinheiro conhecido. **Obrigatório em U12**, substituindo opcionalidade anterior. Renda estimada **não cria Entrada automaticamente**: “Costumo receber R$5.500” não significa “Recebi R$5.500 neste mês”.

**U11:** Saldo Inicial informado aceita R$0 e não aceita negativo; não pode ser excluído nem tratado como Transação. Edição/reconfiguração continua fora do MVP. Renda estimada aceita R$0 sem renda mínima inventada; permitir indicar desconhecimento, variabilidade ou não definir valor fixo naquele momento. Não substituir “Não sei” por zero. UI será definida no onboarding; U12 resolve a lacuna de omissão ao tornar Saldo Inicial obrigatório.

### 29.7 [Regra de Produto] Renda fixa e variável

**Revisão U12:** renda estimada fora do onboarding MVP. Regras anteriores sobre zero/variabilidade são antecedentes; primeiro demonstrar finalidade e valor para eventual retorno. Saldo Inicial obrigatório resolve a antiga lacuna de omissão.


Renda estimada não pressupõe salário fixo: atender salário regular, comissão, freelance, renda variável e múltiplas fontes. Serve de contexto para planejar e oferecer valor inicial.

Renda variável pode ser registrada manualmente quando ocorrer. Renda regular poderá usar **Entrada recorrente futuramente**; com histórico suficiente, o Manga também poderá produzir estimativas. Não antecipar essas evoluções para o MVP.

**[Backlog] Entrada recorrente**, como salário de R$5.500 todo dia 5, pertence a **Transações, não Configurações**, e depende de regras futuras de recorrência, previsão e confirmação.

### 29.8 [Alinhamento PD/PM ↔ Dev] Persistência da renda estimada

**Revisão U12:** renda estimada fora do onboarding MVP. Regras anteriores sobre zero/variabilidade são antecedentes; primeiro demonstrar finalidade e valor para eventual retorno. Saldo Inicial obrigatório resolve a antiga lacuna de omissão.


Definir onde vive conceitualmente, onde consultar/atualizar, como preservar histórico de mudanças e quais planos/Manga Insights poderão utilizá-la. É contexto, não Transação.

**Não colocá-la automaticamente em Configurações por não haver outra localização definida.** Resolver pelo modelo de produto e dados, sem criar nova interface por suposição. “Renda declarada” anterior é refinada como renda mensal estimada; não duplicar entidades pela diferença de nome.

### 29.9 [Regra Global / Backlog] Históricos financeiros e reconciliação

Históricos permanecem nos contextos correspondentes: Transações em Saldo/Transações; gastos de Categoria na Categoria; eventos de Meta preservam referência financeira. Configurações não centraliza históricos.

**U10 substitui a decisão U08 de Ajuste exclusivo em Saldo:** Ajuste especial sai do MVP e sua localização futura será estudada. Correções de divergência no MVP podem usar Entrada/Saída normal, participando das métricas. Não alterar silenciosamente Saldo Inicial.

### 29.10 [MVP] Excluir conta

Configurações permite excluir conta, comunicando consequências **permanentes** e exigindo confirmação adequada. Implementação, retenção e requisitos legais dependem dos estudos de LGPD, privacidade e segurança.

Não presumir prazos, reautenticação ou políticas técnicas/legais específicas. Exclusão de conta é distinta do futuro reset de dados.

### 29.11 [Pré-lançamento / Alinhamento PD/PM ↔ Dev] LGPD, privacidade e requisitos legais

**Prioridade antes do primeiro Beta; não backlog opcional.** Produto e Desenvolvimento precisam realizar levantamento adequado dos requisitos aplicáveis:

- Dados pessoais coletados, finalidade e bases/requisitos legais.
- Transparência e consentimentos quando necessários.
- Armazenamento, retenção, exclusão e direitos do titular.
- Política de privacidade e termos aplicáveis.
- Segurança, comunicação e marketing.
- Tratamento de dados financeiros fornecidos pelo usuário.

Decisões finais após estudo apropriado. **A lista não é análise jurídica completa**, não escolhe base legal nem comprova conformidade.

### 29.12 [Pré-lançamento / Alinhamento PD/PM ↔ Dev] Segurança e autenticação

Antes do Beta, definir **autenticação, login, recuperação de acesso, proteção de dados, sessão, credenciais e possíveis mecanismos adicionais**.

Não criar antecipadamente interfaces de **PIN, biometria, alteração de senha, dispositivos ou login social** sem conhecer arquitetura adotada e requisitos. Métodos sugeridos anteriormente continuam possibilidades, não escolhas aprovadas.

### 29.13 [Backlog / Baixa Prioridade] Evoluções

| Item | Status |
|---|---|
| Resetar dados | **[Backlog]** Apagar dados financeiros e começar de novo sem necessariamente excluir conta. Destrutivo; especificar cuidadosamente antes de implementar. |
| Dark Mode | **[Backlog]** Fora do MVP; não necessário para validar proposta de valor. |
| Notificações granulares | **[Backlog]** Preferências avançadas por contexto. |
| Transações recorrentes | **[Backlog]** Domínio de Transações. |
| Outros idiomas | **[Backlog / Baixa Prioridade]** MVP em **Português Brasileiro**. |
| Outras moedas | **[Backlog / Baixíssima Prioridade]** MVP em **BRL / R$**. Complexidade de histórico, Metas, Transações, conversão, câmbio, formatação e planejamento. |

Exportação permanece no backlog anterior. Não escolher soluções de reset, temas, câmbio ou internacionalização nesta atualização.

### 29.14 Status do CHECK 06

| Tema | Classificação / status |
|---|---|
| Arquitetura funcional de Configurações | **Validada** |
| Conta e dados sem Perfil; Nome único obrigatório (U12) | **[MVP] Definido** |
| Configurações sem dados/históricos financeiros | **[Regra de Produto / Regra Global] Definido** |
| Preferências de notificação; Insights sem configuração própria | **[MVP] Definido** |
| Ajuste/Reconciliamento | **[Backlog] Fora do MVP em U10; localização futura a estudar** |
| Onboarding coleta; features são fontes de verdade | **[Regra Global] Definido** |
| Saldo inicial ≠ Entrada | **U12:** Saldo obrigatório; renda estimada fora do onboarding. Distinção conceitual anterior preservada. |
| Exclusão de conta | **[MVP] Definido; detalhes após estudos** |
| Coleta necessária de dados pessoais | **[Pré-lançamento / Alinhamento PD/PM ↔ Dev] Antes do Beta** |
| LGPD, privacidade, requisitos legais, segurança e autenticação | **[Pré-lançamento / Alinhamento PD/PM ↔ Dev] Antes do Beta** |
| Local/persistência/edição/histórico/uso da renda estimada | **[Alinhamento PD/PM ↔ Dev] Aberto** |
| Reset, Dark Mode, notificações granulares e recorrências | **[Backlog]** |
| Idiomas e moedas | **[Baixa / Baixíssima Prioridade]** |

### 29.15 Registro da revisão

**v1.8 — U08 — 24/09/2026:** incorporado CHECK 06; removida gestão financeira de Configurações, confirmadas notificações/nome preferido, distinguidos saldo inicial/renda estimada/fatos e registrados idioma/moeda V1. Prioridades pré-Beta separadas do backlog. Não escolhidos dados pessoais adicionais, autenticação, requisitos jurídicos ou destino da renda.

Fonte primária de U08: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/f6b368bf-2427-4ecf-b85d-9abec456197d/Texto colado.txt>).

## 30. CHECK 07.1–07.4 — Cross-flow & Regras Globais

**Fonte: U09 — decisões fornecidas pelo usuário nesta tarefa.** Esta seção integra regras sistêmicas e atualiza apenas decisões explicitamente afetadas. **Registro de U09: CHECK 07.5 ainda não havia sido realizado. U10 registra seu fechamento, com prazo obrigatório de Meta pendente.** Nenhuma nova numeração de interface é criada.

### 30.1 Regras-mãe

1. “Correções alteram fatos. Replanejamentos criam novos contextos.”
2. “Entradas e Saídas existem como Transações. As demais experiências refletem ou interpretam esses fatos.”
3. “Saldo representa quanto dinheiro ainda está disponível para utilização dentro da realidade conhecida pelo Manga, e não quanto dinheiro o usuário possui no total.”
4. “Dinheiro reservado em uma Meta deixa de fazer parte do Disponível até ser explicitamente retirado.”
5. “A Home não calcula uma realidade paralela. Ela apresenta o estado atual das fontes de verdade.”
6. “Manga Insights não criam fatos: interpretam fatos existentes.”
7. “O Manga interpreta aquilo que conhece; não inventa contexto.”
8. “O Manga preserva o contexto histórico existente em cada momento, mas permite corrigir fatos registrados incorretamente.”
9. “Virada de competência reinicia métricas periódicas, não valores acumulativos.”

Manter o princípio de UX:

> “O Manga não deve apenas apontar uma dificuldade. Sempre que existir uma alternativa útil e segura, deve ajudar o usuário a enxergar o que pode fazer a partir daquela situação.”

### 30.2 CHECK 07.1 — Tempo, período e histórico

**[Regra de Negócio] Competência financeira:** a data da movimentação define o período; a data de criação não o define. Transação cadastrada em setembro, ocorrida em agosto, pertence a agosto. Internamente podem ser preservadas ambas as datas.

**[MVP] Marco inicial:** Saldo Inicial do onboarding é o início do acompanhamento financeiro conhecido. Movimentações anteriores já estão implicitamente refletidas nesse valor; não reconstruí-las nem permitir Transações anteriores ao marco.

**[MVP] Retroatividade:** sem limite arbitrário de 7, 30 ou 90 dias. Validar inclusive na correção da data:

> **data do Saldo Inicial ≤ data da movimentação ≤ hoje**

**[MVP / Backlog] Futuras:** não permitidas. Transação no MVP é fato ocorrido. Futuras e recorrentes permanecem no backlog como previsão/intenção a ser distinguida de realização.

**[Regra Global] Correção factual:** corrigir Saída de agosto de R$100 para R$140 recalcula agosto e todos os efeitos financeiros posteriores dependentes. A correção feita em setembro não vira uma movimentação de setembro. Alterar a data pode mudar a competência; alterar apenas o valor não muda a competência original.

**[Regra Global] Replanejamento:** não aplicar a configuração nova como se sempre tivesse existido. Mudanças relevantes de Categorias e Metas são eventos históricos. Registrar anterior, novo e momento da mudança.

Exemplo: Cafés de R$200 para R$300 em 20/09. Ao consultar setembro posteriormente, apresentar **R$300 como último planejamento vigente naquele mês**, indicando a alteração em 20/09. **Não proporcionalizar por dias no MVP.** Meses anteriores preservam seus próprios contextos. A representação visual e a estrutura técnica desses eventos continuam em alinhamento.

**[Regra de Produto] Status histórico de Meta:** se exibido futuramente, considerar planejamento vigente naquele momento. Alteração posterior de prazo, valor ou plano não reescreve o estado anterior. Isso não aprova uma nova experiência histórica no MVP.

**[Regra de Produto] Insights históricos:** comunicam o que o Manga conhecia na ocasião. Correção posterior não exige reescrever comunicações passadas. Ativos podem ser reavaliados. **Sem histórico consultável de Manga Insights no MVP.**

**[MVP] Saldo Inicial:** não é Entrada, renda ou Transação comum; prepara a estrutura inicial no onboarding. **Sem experiência específica de edição no MVP.** **U10:** divergência posterior pode usar Entrada/Saída corretiva normal, com impacto nas métricas; Ajuste especial é backlog. **[Backlog / Baixa Prioridade]** editar/corrigir Saldo Inicial e recalcular histórico posterior.

**Resolvido em U12:** Saldo Inicial passa a obrigatório ≥ R$0; deixa de existir a lacuna de marco por omissão. Não inventar zero: o usuário informa o valor.

### 30.3 CHECK 07.2 — Saldo ↔ Metas

**[Regra de Produto] Disponível:** dinheiro conhecido ainda utilizável, não patrimônio total nem necessariamente saldo bancário. De R$5.000 disponíveis, reservar R$1.000 deixa R$4.000 disponíveis, independentemente de onde o dinheiro está fisicamente.

| Ação / condição | Regra vigente |
|---|---|
| Reservar em Meta | Reduz Disponível e aumenta reserva; não é Saída. |
| Retirar da Meta | Reduz reserva e aumenta Disponível; não é Entrada. |
| Exibição do evento | Histórico financeiro e histórico da Meta refletem **um único evento**, sem duas movimentações independentes. Naturezas: “valor reservado para Meta” e “valor retirado da Meta”. |
| Exibição da reserva | Na experiência de Metas, incluindo total investido nas Metas e valores individuais; não no contexto de Saldo. |
| Patrimônio total conhecido | Não é métrica necessária no MVP. |
| Reserva maior que Disponível | Impedir e oferecer o maior valor disponível, quando houver valor possível. Disponível R$842, tentativa R$1.000 → “Reservar R$842”. |
| Meta negativa | Nunca permitida: **Meta ≥ R$0**. |
| Excluir Meta com reserva | Confirmar e explicar que todo o valor volta ao Disponível; retorno não é Entrada. |
| Concluir Meta | Objetivo alcançado; não significa gasto. Reserva permanece até retirada. |
| Gastar a reserva | MVP: **Meta → retirar dinheiro → Disponível → registrar Saída**. |

**[Backlog]** registrar Saída diretamente da reserva. Arquivamento de Meta permanece backlog. Superação de 100% continua permitida conforme decisão anterior, respeitando o limite do Disponível.

Saldo responde **“Quanto dinheiro ainda posso utilizar?”** Metas respondem **“Quanto dinheiro já destinei aos meus objetivos?”**

**Mudança explícita:** U09 substitui a regra anterior de U04/U05 segundo a qual movimentações/exclusão de Meta não alteravam Saldo. Continua válida a distinção entre eventos de Meta e Entradas/Saídas. Retenção/modelagem de eventos após excluir a Meta requer detalhamento; não pressupor duplicação ou apagamento do fato de devolução.

### 30.4 CHECK 07.3 — Transações ↔ Categorias ↔ Saldo

**[Regra Global] Fonte de verdade:** Entrada/Saída existe como uma Transação. Saldo, Categorias, Home e Insights refletem, calculam ou interpretam esse fato. Uma Saída de R$50 em Cafés reduz Disponível em R$50, aumenta Saídas do período em R$50 e realizado de Cafés em R$50, sem registros financeiros independentes por feature.

**[Fluxos]** Home, Saldo ou Categoria podem iniciar a criação, usando a mesma entidade e regras do fluxo global. O contexto não muda a natureza financeira.

| Operação / estado | Efeito e regra |
|---|---|
| Entrada | Sem Categoria. |
| Saída → Entrada | Confirmação explicando impacto; remover vínculo de Categoria automaticamente e recalcular efeitos. |
| Entrada → Saída | Confirmação explicando impacto; começa sem Categoria, aceita escolha opcional; não inferir automaticamente. |
| Saída sem Categoria | Afeta Disponível, Saídas do período e histórico normalmente. |
| Trocar Categoria | Muda classificação; não muda Disponível, total de Saídas ou valor. |
| Corrigir valor | Correção factual; recalcular efeitos financeiros dependentes. |
| Corrigir data | Pode mudar competência: 30/09 → 01/10 retira dos agregados de setembro e inclui nos de outubro, respeitando marco inicial e hoje. |
| Disponível negativo | Permitido; não impedir correção factual por esse resultado. Diferente de Meta negativa, sempre proibida. |
| Excluir Categoria | U10: confirmar consequência; remover entidade/planejamento ativos e impedir novos vínculos. Preservar Transações e referência histórica. Disponível e total de Saídas iguais. |
| Reutilizar nome excluído | Nome liberado; nova Categoria homônima é nova entidade, sem vincular automaticamente Transações antigas. |
| Excluir Transação | No MVP, pode ser definitiva para o usuário mediante confirmação; reverter todos os efeitos e recalcular derivados. |

**[Regra de Produto] “Sem categoria”** é agrupamento sistêmico de ausência de vínculo, não Categoria real. Não possui planejamento, edição, cor personalizada, ícone ou exclusão. Sua apresentação exata em C01 continua a detalhar, preservando esta natureza.

**[Regra de Negócio] Reconciliação:** distribuição por Categoria + Sem categoria = Saídas do mesmo período. Exemplo: Alimentação R$800 + Moradia R$600 + Transporte R$300 + Lazer R$200 + Sem categoria R$100 = **R$2.000 de Saídas**.

**Exclusão de Transação:** excluir Saída de R$100 em Cafés implica Disponível +R$100; Saídas do período −R$100; realizado de Cafés −R$100; recalcular derivados. **[Alinhamento prioritário PD/PM ↔ Dev]** decidir remoção física versus retenção técnica/auditoria, segurança, histórico e requisitos legais. Definitiva para o usuário não determina política de armazenamento. Undo/recuperação fica no backlog, caso necessário.

#### Taxonomia financeira oficial do MVP — revisada por U10

| Tipo | Impacto no Disponível | Entrada/Saída | Categoria |
|---|---|---|---|
| Saldo Inicial | Define ponto inicial | Nenhuma | Não |
| Entrada | + | Entrada | Não |
| Saída | − | Saída | Opcional |
| Reservar em Meta | − | Nenhuma | Não |
| Retirar de Meta | + | Nenhuma | Não |

Esta taxonomia orienta regras de negócio e implementação. Não torna todos esses eventos opções do formulário comum de Entrada/Saída.

### 30.5 CHECK 07.4 — Home ↔ Manga Insights ↔ Sistema

**[Regra de Produto] Home agregadora:** utiliza Metas, Saldo, Transações, Categorias e Manga Insights; não possui realidade financeira própria. Nova Transação usa o fluxo global.

**[MVP] Período:** exclusivamente mês/período atual, sem seletor. Consultar passado na feature correspondente. Home responde **“Como estou agora?”**

| Na virada de competência | Comportamento |
|---|---|
| Entradas e Saídas mensais | Reiniciam métricas do novo período. |
| Realizado de Categorias | Reinicia no novo período. |
| Disponível | Permanece acumulativo. |
| Reservas e progresso de Metas | Permanecem acumulativos. |
| Limite mensal de Categoria | Continua vigente nos próximos meses até alteração explícita; novo valor é herdado pelos períodos seguintes. |

Reiniciar métricas não significa apagar fatos ou histórico.

**[MVP] Metas na Home:** até três; ranking **precisam de atenção → próximas da conclusão → mais recentes**. Proximidade financeira e de prazo podem ser critérios de desempate. Não aprovar score adicional.

**Conclusão:** reconhecer, celebrar e criar momento UAU; depois retirar a concluída do ranking normal e dar lugar a outra ativa. Sem outra Meta, Empty State incentivando nova criação. Concluída permanece em Metas e dinheiro continua reservado. Duração/exposição da celebração/Insight ainda requer alinhamento.

**[Regra de UX] Insight agrega significado:** acrescenta interpretação, relação, consequência, oportunidade ou recomendação; não repete informação explícita. Evidência limita a interpretação: “Seus gastos com Cafés aumentaram 35% em relação à média recente” é possível com dados; atribuir isso a sair com amigos exige evidência e não pode ser inventado.

| Prioridade | Natureza |
|---|---|
| P1 — Atenção | Situações potencialmente relevantes para planejamento/situação financeira. Disponível negativo é elegível, com comunicação factual, sem julgamento e com caminhos possíveis. |
| P2 — Oportunidade/orientação | Ajuda a tomar decisões. |
| P3 — Progresso/positivo | Reconhece evolução relevante. |

**Prioridade não determina canal.** Toast, Home, modal/sheet e push serão definidos no sistema de comunicação; continuam válidas as preferências externas e a ausência de liga/desliga dos Insights internos.

**[MVP] Limite e consolidação:** até três Insights na Home; P1 > P2 > P3. Mais elegíveis que posições exige fila. Semelhantes podem ser consolidados: “3 categorias ultrapassaram seus planejamentos neste mês”. Não fixar algoritmo de agrupamento ou substituição. Recência registrada em U07 é referência inicial preservada; desempate e operação da fila voltam ao alinhamento do Engine em U09, sem outra regra escolhida.

**[Regra de Produto] Ativos:** refletir estado conhecido atual; se dados mudam e condição deixa de existir, reavaliar/remover. Passados não precisam ser corrigidos retroativamente; não há histórico consultável no MVP.

**[Proposta / Alinhamento PD/PM ↔ Dev] Comparação histórica:** pelo menos **dois meses anteriores de coleta** antes de Insights que dependem de comparação. **Não é regra validada ainda**, nem requisito de todo Insight. Confirmar mês válido, mês sem movimentações, Categoria criada posteriormente, dados retroativos, quantidade mínima e suficiência de dois meses para cada tipo. Não confundir com a comparação visual dos últimos três meses já definida em C02.

**[Alinhamento prioritário] Consumido ≠ resolvido:** consumido significa que o usuário recebeu/visualizou/interagiu, mas a condição pode continuar; resolvido significa que a condição deixou de existir. A distinção é reconhecida; **o funcionamento ainda não foi fechado**.

Definir no Manga Insights Engine:

- Critério de consumo: visualizar, clicar ou dispensar; prevenção de repetição a cada abertura da Home.
- Tempo oculto, reaparecimento e reativação por mudança significativa.
- Diferenças entre P1/P2/P3; persistência dos resolvidos e necessidade de histórico técnico.
- Fila, desempate dentro da prioridade e entrada de novos Insights quando já existem três.
- Consolidação e comportamento quando apenas parte das condições é resolvida.

Insights exigem **modelo de estado/ciclo de vida próprio**, não apenas componente visual. Histórico técnico pendente não equivale a experiência consultável aprovada.

### 30.6 Alinhamentos consolidados e status

| Prioridade | Tema | Situação |
|---|---|---|
| Prioritário | Manga Insights Engine | Fila, ciclo de vida, consumido × resolvido, persistência, reaparecimento, priorização e consolidação abertos. |
| Prioritário | Comparação histórica | Validar proposta dos dois meses e critérios de suficiência. |
| Prioritário | Exclusão de Transações | Exclusão para o usuário versus retenção técnica/auditoria; segurança/histórico/requisitos legais. |
| Antes do primeiro Beta | LGPD, segurança e dados da conta | Requisitos mínimos, dados necessários e finalidades inclusive marketing/persona, Conta sem Perfil completo, exclusão de conta/dados. Não aprova coleta adicional automática. |
| Outros alinhamentos | Planejamento e eventos | Representação histórica; estrutura de eventos de Categoria/Meta; um evento de Meta com reflexos em Saldo e Meta. |
| Outros alinhamentos / backlog | Evoluções financeiras e de Metas | Futuras, recorrências de Entradas/Saídas, feedback inteligente, plano dinâmico e tratamento de retirada significativa. |
| Outros alinhamentos | Home e períodos | Duração/exposição de Insight de conclusão e consistência de período entre features. |
| Resolvido em U12 | Marco inicial | Saldo Inicial obrigatório ≥ R$0; lacuna sobre omissão deixa de se aplicar. |
| Atualizado em U10 | CHECK 07.5 | Fechado, com prazo obrigatório de Meta pendente de alinhamento. |

**Backlog reafirmado:** futuras; recorrentes (Entradas e Saídas); edição de Saldo Inicial e recálculo (baixa prioridade); arquivamento de Meta; Saída diretamente de reserva; intenção de gasto separada de limite; status/inteligência sofisticados de Categorias; histórico avançado para recomendações; sugestão automática de limite; Meta Foco; feedback inteligente de Meta; plano dinâmico; orientação após retirada significativa; Undo/recuperação se necessário; reset; Dark Mode; moedas (baixíssima prioridade); idiomas (baixa prioridade); internacionalização. Demais itens anteriores, incluindo exportação, permanecem no backlog.

### 30.7 Registro da revisão

**v1.9 — U09 — 24/09/2026:** incorporados CHECK 07.1, 07.2, 07.3 e 07.4. Atualizadas regras de Disponível/Metas, marco inicial, correções e planejamento histórico; consolidada taxonomia, reconciliação e Home/Insights. Preservadas decisões não alteradas e separadas propostas, lacunas e alinhamentos. **CHECK 07.5 ainda não realizado à época de U09; fechado em U10, com pendência de prazo obrigatório.** Fonte primária: mensagem do usuário “Check 07 — Cross-flow & Regras Globais” nesta tarefa.

## 31. CHECK 07.5–07.6 — Estados, integridade, exclusão e cascatas

**Fonte: U10.** As decisões desta revisão prevalecem nos pontos explicitamente alterados. Demais regras-mãe, escopo, backlog e pendências permanecem. Fechamento do Check não equivale a implementação técnica definida.

### 31.1 Correção de escopo — Ajuste/Reconciliamento de Saldo

**[MVP] Não existe Ajuste de Saldo como tipo especial de movimentação.** A arquitetura atual ainda não tem experiência/local adequado; implementar agora ampliaria desnecessariamente o escopo.

> **Disponível = Saldo Inicial + Entradas − Saídas − valores reservados em Metas + valores retirados de Metas.**

A devolução de reserva ao excluir Meta continua obrigatória, sem Entrada e sem duplicar eventos.

Se Manga mostra R$2.350 e o usuário entende possuir R$2.500, pode registrar **Entrada corretiva de R$150**. No caso inverso, pode registrar Saída. **São Transações normais e participam das métricas de Entradas/Saídas.** Esta limitação é aceita no MVP para simplificar escopo; substitui a regra anterior de correção especial sem afetar essas métricas.

#### Taxonomia oficial do MVP

| Tipo | Impacto no Disponível | Entrada/Saída | Categoria |
|---|---|---|---|
| Saldo Inicial | Define ponto inicial | Nenhuma | Não |
| Entrada | + | Entrada | Não |
| Saída | − | Saída | Opcional |
| Reservar em Meta | − | Nenhuma | Não |
| Retirar de Meta | + | Nenhuma | Não |

**[Backlog] Ajuste/Reconciliamento:** investigar recurso que reconcilie Disponível conhecido com valor informado sem transformar diferença em Entrada/Saída. **Possibilidade futura, não fluxo aprovado:** Saldo → Ajustar saldo → informar valor correto → calcular diferença → apresentar impacto → confirmar → registrar ajuste especial no histórico.

Estudar localização, início do fluxo, apresentação no histórico, edição, exclusão, períodos históricos, sugestão de reconciliação, inatividade prolongada e efeitos em análises/Insights. **Não definir essas regras agora.** Discussões anteriores de Ajuste especial passam a antecedentes dessa evolução, não requisitos do MVP.

### 31.2 CHECK 07.5 — Taxonomia global de estados

| Estado | Definição | Comportamento |
|---|---|---|
| Empty State | Informação/entidade ainda não existe porque uma ação ainda não aconteceu. | Orientar próxima ação quando fizer sentido. |
| Zero State | Estrutura/informação existe e seu valor é legitimamente zero. | Mostrar zero como dado válido, sem presumir ausência. |
| Insufficient Data | Há dados, mas não bastam para análise/interpretação de qualidade. | Pode omitir análise; não gerar Insight raso para preencher espaço. |
| Error State | Informação deveria estar disponível, mas houve falha ao carregar, salvar ou processar. | Tratar falha; solução visual posterior. |

Aplicar consistentemente no produto, considerando o contexto da entidade. **Disponível R$0; Cafés R$0 de R$300; Meta R$0 de R$10.000** não são automaticamente Empty States.

**Categoria sem movimentos:** permanece válida e visível na listagem; histórico dos detalhes pode apresentar Empty State: “Você ainda não possui movimentações nesta categoria.” → **Adicionar transação**. Texto conceitual, não copy final.

**Sem Categorias:** Saídas existem normalmente e continuam visíveis no agrupamento sistêmico “Sem categoria”. Incentivar criação sem esconder gastos. Ausência de Categorias não é ausência de informação financeira. Referências históricas de Categorias excluídas seguem a regra da seção 31.5.

**Ativas × concluídas:** estados independentes. Com zero ativas e cinco concluídas, mostrar Empty State na área de ativas e manter concluídas acessíveis. Home sem ativas, depois da celebração, incentiva nova Meta.

**Análises insuficientes:** podem ser omitidas. Comunicação leve para continuar registrando dados é possibilidade futura, sem ruído recorrente, não obrigação de preencher o espaço.

### 31.3 CHECK 07.5 — Dados financeiros e criação de Meta

**[MVP] Valor objetivo obrigatório e > R$0 (U11):** Meta precisa de objetivo financeiro mensurável para progresso e planejamento.

**[Alinhamento PD/PM ↔ Dev] Prazo obrigatório ainda não decidido.** Reabre a definição anterior que reservava prazo opcional somente ao futuro. Avaliar obrigatoriedade no MVP, contribuição mensal esperada, planejamento, “No ritmo”, “Precisa de atenção”, “Adiantada”, projeções e orientações. Considerar valor de Meta sem prazo e recursos perdidos. Não inventar estados/cálculos para esse cenário enquanto aberto.

**[Regra Global] “Ausência de informação não significa valor zero.”** Agosto inteiro sem uso não comprova gasto R$0. Distinguir zero conhecido de insuficiência de cobertura. Períodos sem atividade suficiente não entram automaticamente como meses zerados nas comparações. Relacionar à proposta ainda pendente de dois meses válidos para Insights; não definir suficiência por conta própria.

**[MVP / Backlog] Inatividade:** sem revalidação automática do Disponível após longos períodos. Investigar futuramente identificação de inatividade e confirmação/correção ao retornar; relacionar a Ajuste/Reconciliamento de Saldo. Não definir duração mínima de inatividade.

**[Regra de UX] “O usuário informa o valor; o tipo da operação determina seu efeito financeiro.”** Informar magnitude positiva, sem exigir sinais: Entrada R$50 aumenta Disponível; Saída R$50 reduz; reservar R$50 reduz Disponível e aumenta Meta; retirar R$50 faz o inverso. **U11 fecha a validação:** Transações e movimentos de Meta exigem valor > R$0; zero é estado válido, não movimentação.

### 31.4 CHECK 07.5 — Resiliência e integridade

> “Quando tecnicamente possível, uma falha isolada deve afetar apenas o bloco ou recurso relacionado, e não inutilizar toda a experiência.”

Falha de Insights na Home não deve necessariamente impedir Metas, contexto financeiro ou ações. **[Alinhamento Dev]** considerar na arquitetura; visuais de Error States serão definidos posteriormente. Não pressupor solução de offline/sincronização.

**Preservar preenchimento:** se salvar falhar, manter dados sempre que possível e permitir tentar novamente sem reconstrução. Aplicar a Transações, Categorias, Metas, edições e formulários relevantes.

**Proteção contra duplicidade:** uma intenção não pode produzir múltiplos fatos por execução acidental repetida. Duplo toque em Salvar não cria duas Transações. Aplicar também a reservar, retirar, excluir e operações sensíveis. Implementação específica é responsabilidade técnica.

> “Operações que afetam múltiplos contextos financeiros devem ser atômicas do ponto de vista do usuário.”

Reserva de R$500 não pode reduzir Disponível com sucesso e falhar ao aumentar Meta. **Toda a operação acontece ou o estado anterior é preservado.** Aplicar a reserva, retirada, exclusão de Meta com reserva, alteração/exclusão de Transação, troca Entrada ↔ Saída e demais alterações em múltiplos estados financeiros. A regra não escolhe mecanismo de implementação.

### 31.5 CHECK 07.6 — Exclusão de estruturas e fatos

> “Excluir uma estrutura de organização ou planejamento não apaga silenciosamente fatos financeiros relacionados a ela.”

> “Uma entidade pode deixar de estar ativa sem perder sua referência histórica.”

**Transação:** excluir declara que o fato não deveria integrar a realidade conhecida pelo Manga; recalcular todos os efeitos. Confirmar consequências: “Esta movimentação será removida do seu histórico e seus valores serão recalculados.” Retenção técnica/auditoria versus exclusão definitiva no armazenamento continua em alinhamento, incluindo segurança e requisitos legais.

**Categoria:** excluir remove entidade ativa e planejamento ativo, impede novos vínculos e preserva Transações e histórico relacionado. **Substitui a regra antiga de transformar definitivamente todas as Transações passadas em “Sem categoria”.**

Exemplo: Cafés R$200 em janeiro; Categoria excluída em março. Consultar janeiro ainda permite identificar aqueles R$200 como Cafés. A Categoria não volta a ser ativa; existe como referência histórica quando necessário. Novas classificações e contexto atual não a oferecem como Categoria ativa.

**Recriar nome:** Cafés #1 (janeiro–março, excluída) e Cafés #2 (junho, ativa) são entidades diferentes. Nova homônima não recupera vínculos nem histórico antigo.

**Identidade × planejamento:** nome, cor e ícone utilizam estado atual; não exigem versionamento histórico no MVP. Limite mensal e regras financeiras temporais preservam histórico quando necessário. Preservar referência à entidade não exige copiar cada identidade visual passada.

**[Dependência / Alinhamento]** Representar Categorias excluídas nas consultas e distribuições históricas mantendo classificação e reconciliação com Saídas; apresentação e modelagem serão definidas com Dev. “Sem categoria” continua indicando ausência de classificação, não exclusão automática do vínculo histórico.

### 31.6 CHECK 07.6 — Metas excluídas, concluídas e editadas

**Excluir Meta com reserva:** devolver integralmente ao Disponível, sem Entrada. Confirmação deve informar o valor: “Ao excluir esta Meta, R$5.000 voltarão a ficar disponíveis.” Operação atômica.

> “Excluir uma Meta encerra a estrutura atual, mas não apaga seu histórico financeiro.”

Preservar eventos que explicam o passado: R$500 reservado, R$300 reservado, R$200 retirado e devolução restante na exclusão. Referência legível à Meta mesmo sem acesso como entidade ativa. **“Meta Japão (excluída)”** é exemplo possível; representação visual ainda não definida.

**Meta concluída após celebração/UAU:** travar **valor objetivo e prazo/data-alvo**. Edições simples como nome podem continuar quando fizerem sentido e não reabrirem lógica financeira. Novo objetivo exige nova Meta. Não reabrir a Meta já reconhecida por editar objetivo/prazo. Reserva continua existente até retirada; conclusão não é gasto.

**Reduzir objetivo ativo:** permitido mesmo abaixo do reservado. R$8.000 reservados, objetivo de R$10.000 reduzido a R$6.000 → aproximadamente **133%**, conclusão acima de 100% e celebração normal. Mostrar impacto e novo planejamento antes de confirmar objetivo/prazo, conforme regra anterior.

A decisão não especifica novos detalhes do ciclo de retirada após conclusão; preservar questões restantes sem presumir reabertura automática.

### 31.7 CHECK 07.6 — Confirmações e novas regras-mãe

Ações destrutivas ou com consequências financeiras relevantes exigem confirmação: excluir Transação, Categoria, Meta, conta e outras operações relevantes. Dialog, modal, bottom sheet ou outro padrão ficam para definição visual.

Edições simples sem alteração financeira significativa, como nome/cor/ícone de Categoria e nome de Meta, **não precisam de confirmação adicional**: Salvar já representa intenção.

> “Confirmações devem comunicar consequências, não apenas pedir certeza.”

Evitar confirmação genérica sem impacto. Exemplos conceituais:

- Categoria: “Ao excluir Cafés, ela deixará de estar disponível para novas transações. Seu histórico será preservado.”
- Meta: “Ao excluir Japão, R$5.000 voltarão ao seu saldo disponível.”
- Transação: “Esta movimentação será removida e seus valores serão recalculados.”

**Novas regras-mãe, em conjunto com as anteriores:**

1. “Ausência de informação não significa valor zero.”
2. “O usuário informa o valor; o tipo da operação determina seu efeito financeiro.”
3. “Uma entidade pode deixar de estar ativa sem perder sua referência histórica.”
4. “Excluir uma estrutura de organização ou planejamento não apaga silenciosamente fatos financeiros relacionados a ela.”
5. “Operações que afetam múltiplos contextos financeiros devem ser atômicas do ponto de vista do usuário.”
6. “Uma intenção do usuário não pode produzir múltiplos fatos financeiros por execução acidental repetida.”
7. “Confirmações devem comunicar consequências, não apenas pedir certeza.”

### 31.8 Alinhamentos PD/PM ↔ Dev e status

| Tema | Levar como regra / decidir tecnicamente |
|---|---|
| Prazo de Meta | Obrigatoriedade ainda aberta; avaliar plano, contribuição, estados e inteligência sem prazo. |
| Resiliência | Falha isolada afeta bloco relacionado quando possível; definir arquitetura e, posteriormente, apresentação. |
| Preservação de preenchimento | Manter após falha sempre que possível e permitir nova tentativa. |
| Duplicidade | Impedir execução financeira duplicada por intenção única; mecanismo técnico a definir. |
| Atomicidade | Operações em múltiplos contextos são unidade consistente do ponto de vista do usuário. |
| Entidades excluídas | Preservar referências históricas de Categorias e Metas sem mantê-las ativas. |
| Exclusão de Transações | Manter discussão de exclusão para usuário, retenção técnica/auditoria, aspectos legais e de segurança. |
| Comparações históricas | Ausência não é zero; incorporar à validação dos dois meses e suficiência de dados. |
| Ajuste e inatividade | Backlog relacionado; nenhuma definição técnica/experiência aprovada agora. |

| Check | Status atual |
|---|---|
| 07.1 — Tempo, período e histórico | **FECHADO**, com revisões posteriores de U10 aplicadas. |
| 07.2 — Saldo ↔ Metas | **FECHADO**. |
| 07.3 — Transações ↔ Categorias ↔ Saldo | **FECHADO**, taxonomia sem Ajuste e referências históricas revisadas em U10. |
| 07.4 — Home ↔ Manga Insights ↔ Sistema | **FECHADO**; alinhamentos do Engine continuam pendentes. |
| 07.5 — Estados sistêmicos & integridade | **FECHADO**, com prazo obrigatório de Meta pendente de alinhamento com Dev. |
| 07.6 — Exclusão, edição e efeitos em cascata | **FECHADO**. |
| 07.7 — Limites, validações e prevenção de estados impossíveis | **FECHADO (U11)**. |
| CHECK 07 — Cross-flow & Regras Globais | **CONCLUÍDO**, mantendo alinhamentos documentados. |

### 31.9 Registro da revisão

**v1.10 — U10 — 24/09/2026:** incorporados CHECK 07.5 e CHECK 07.6. Ajuste especial removido do MVP/taxonomia e movido ao backlog; aceitas Transações corretivas com impacto nas métricas. Exclusão de Categoria preserva classificação histórica; exclusão de Meta preserva eventos e referência. Consolidadas taxonomia de estados, resiliência, duplicidade, atomicidade, confirmações e restrições de edição de Meta concluída. Prazo obrigatório reaberto como alinhamento. Demais decisões preservadas.

Fonte primária: [texto fornecido pelo usuário](</Users/mplayer/.codex/attachments/9a7d1d6f-d89a-4676-9d13-974b35b28adc/Texto colado.txt>).

## 32. CHECK 07.7 — Limites, validações e prevenção de estados impossíveis

**Fonte: U11 — mensagem do usuário nesta tarefa. Check fechado. CHECK 07 — Cross-flow & Regras Globais concluído**, mantendo pendências explícitas. Esta matriz consolida validações nas interfaces já existentes, sem criar novos fluxos ou reincluir Ajuste no MVP.

### 32.1 Matriz de validações do MVP

| Dado / operação | Regra vigente | Consequência / distinção |
|---|---|---|
| Entrada e Saída | Valor **> R$0**. | Zero não é Transação válida. Tipo determina sinal financeiro; usuário informa magnitude positiva. |
| Reservar ou retirar de Meta | Valor **> R$0**. | Não permitir reservar/retirar R$0. |
| Retirar de Meta | Valor não pode superar reservado. | Bloquear; Meta nunca negativa. Oferecer maior retirada válida quando possível. |
| Reservar em Meta | Não superar Disponível, conforme regra anterior. | Preservar validação e alternativa válida já consolidadas. |
| Saída superior ao Disponível | **Permitida.** | Não bloquear nem exigir confirmação extra apenas por produzir negativo. |
| Objetivo da Meta | Obrigatório e **> R$0**. | Impedir zero/negativo. Regras de edição/conclusão anteriores permanecem. |
| Data-alvo da Meta, quando existir | **> hoje**. | Não aceitar hoje/passado como data-alvo informada. Obrigatoriedade do prazo continua pendente. A validação da data informada não define novo comportamento para Metas existentes com prazo vencido. |
| Limite mensal de Categoria | Opcional; se existir, **> R$0**. | Estados válidos: sem limite ou limite positivo; zero não representa ausência de planejamento. |
| Nome de Categoria/Meta | Obrigatório, com conteúdo textual após remover espaços nas extremidades. | Impedir vazio/apenas espaços. Limites de caracteres serão definidos em UI/Technical Mapping. |
| Descrição da Transação | **Obrigatória na decisão atual do MVP.** | Possível flexibilização ainda exige alinhamento; não alterar agora. |
| Data da Transação | Válida, dentro do marco inicial até hoje. | Preservar regra temporal anterior e competência pela data da movimentação. |
| Saldo Inicial informado | **≥ R$0**, sem exclusão no MVP. | Zero é dado conhecido; negativo proibido na decisão atual. Não é Transação comum. |
| Renda estimada | **Fora do onboarding em U12.** | Regras anteriores de zero/variabilidade são antecedentes para eventual retorno justificado. |
| Valores monetários na experiência | BRL, **duas casas decimais**, sem precisão superior a centavos. | Armazenamento/arredondamento/máximo suportado a alinhar; não impor teto de negócio por limitação visual. |

**Zero de estado continua válido:** Disponível R$0, gasto de Categoria R$0, reserva de Meta R$0 e Saldo Inicial R$0. Não confundir com evento financeiro de valor zero.

### 32.2 Nomes e identidade

**Categorias ativas:** nomes únicos ignorando caixa e espaços nas extremidades. “Cafés”, “cafés” e “ Cafés ” equivalem para duplicidade. Não definir agora normalização avançada, remoção de acentos ou alteração de espaços internos.

**Metas ativas:** mesma lógica básica; não aceitar nomes equivalentes. Reduz ambiguidade no histórico, movimentos, Insights, identificação e Home. Metas concluídas/excluídas não precisam bloquear para sempre reutilização do nome.

**Categoria excluída:** libera nome. Nova Categoria homônima é nova entidade e não herda vínculos/histórico. Preservar referências históricas das entidades excluídas, conforme U10. Comparação de nomes não funde entidades nem reclassifica fatos.

### 32.3 Bloquear o impossível; orientar o desfavorável

> “Bloquear o impossível; orientar o desfavorável.”

Bloqueios impedem estados impossíveis, inconsistências, violações estruturais e operações matematicamente inválidas. Consequência desfavorável, por si só, não justifica impedir uma realidade válida. Informar, interpretar e orientar.

| Situação | Comportamento |
|---|---|
| Meta com R$800; tentativa de retirar R$1.000 | Bloquear e, quando possível, oferecer **“Retirar R$800”**. |
| Disponível R$500; Saída R$800 | Permitir → Disponível −R$300; sem confirmação adicional só pelo negativo. |
| Disponível R$500; Saída R$1.000 | Permitir → Disponível −R$500; pode posteriormente gerar Insight P1 factual. |
| Categoria com R$450 realizados; limite reduzido de R$600 para R$300 | Permitir → 150% do planejamento; explicar impacto antes de confirmar. |

Para redução do limite, comunicação conceitual:

> “Você já gastou R$450 nesta categoria. Ao alterar o limite para R$300, seus gastos atuais passarão a representar 150% do planejamento deste mês e suas análises serão atualizadas com base no novo limite.”

**Não alterar, apagar ou recalcular Transações para adequá-las ao planejamento.** Atualizar leitura/análises segundo novo limite e preservar vigência anterior, nova e momento da mudança. Mantêm-se o registro temporal, a consulta pelo último planejamento vigente no mês e a ausência de proporcionalização diária.

Relacionar aos princípios de oferecer caminhos úteis e seguros, comunicar consequências e interpretar apenas o que os dados sustentam. A dispensa de confirmação por negativo não elimina confirmações já exigidas para troca de tipo ou outras ações relevantes.

### 32.4 Estrutura mínima de Transação

| Campo | Entrada | Saída |
|---|---|---|
| Tipo | Obrigatório | Obrigatório |
| Descrição/nome | Obrigatório | Obrigatório |
| Valor > R$0 | Obrigatório | Obrigatório |
| Data válida | Obrigatória | Obrigatória |
| Categoria | Não se aplica | Opcional |

**[Alinhamento PD/PM ↔ Dev]** avaliar se descrição opcional reduz fricção na principal ação recorrente, sobretudo criação rápida pela Home. Discutir velocidade, qualidade/contexto do histórico e representação de registros sem descrição.

Hipótese preservada: **“A obrigatoriedade da descrição pode aumentar a qualidade/contexto do histórico, porém tornar a descrição opcional pode diminuir significativamente a fricção na principal ação recorrente do Manga.”** Até esse alinhamento, descrição permanece obrigatória.

### 32.5 Saldo Inicial e renda no onboarding

**Revisão U12:** renda estimada fora do onboarding MVP. Regras anteriores sobre zero/variabilidade são antecedentes; primeiro demonstrar finalidade e valor para eventual retorno. Saldo Inicial obrigatório resolve a antiga lacuna de omissão.


**Saldo Inicial:** marco financeiro, não Transação comum; sem ação “Excluir Saldo Inicial”. Correção/reconfiguração continua fora do escopo atual. Zero informado é válido, não ausência. **Negativo não permitido no MVP**, mas Disponível pode tornar-se negativo depois: inicial R$0 + Saída R$500 → Disponível −R$500.

**[Alinhamento PD/PM ↔ Dev]** estudar cenários em que Saldo Inicial negativo represente melhor a realidade de usuários; nenhuma autorização para aceitá-lo agora.

**Renda R$0:** válida para pessoa sem renda temporária, estudante, desempregada ou sem previsão de recebimentos. Não inventar renda mínima.

**Renda desconhecida/variável/não fixada:** permitir comunicar “Não sei”, renda variável ou preferência por não definir valor fixo naquele momento. Não obrigar R$0 como substituto. Representação será definida no desenho do onboarding. U12 retira renda do onboarding e resolve omissão do marco exigindo Saldo Inicial; gestão da renda só será definida se houver justificativa para retorno.

### 32.6 Regras-mãe acrescentadas

1. “R$0 pode representar um estado válido, mas não constitui uma movimentação financeira.”
2. “Meta nunca pode ficar negativa; Disponível pode.”
3. “Quando existir planejamento de Categoria, seu valor deve ser maior que R$0.”
4. “Alterar planejamento não altera fatos financeiros já realizados.”
5. “Valor zero e ausência de informação são conceitos diferentes.”
6. “Bloquear o impossível; orientar o desfavorável.”

Complementam as regras-mãe existentes, sem substituir preservação histórica, fontes de verdade, atomicidade, proteção contra duplicidade ou distinção entre fatos e replanejamentos.

### 32.7 Alinhamentos, backlog e encerramento

| Alinhamento | Decisão atual | O que falta decidir |
|---|---|---|
| Descrição de Transação | Obrigatória no MVP. | Fricção versus qualidade, histórico sem descrição, criação rápida pela Home e eventual flexibilização. |
| Saldo Inicial negativo | Não permitido no MVP. | Necessidade e cenários relevantes de suporte futuro. |
| Precisão monetária | BRL, duas casas decimais na experiência. | Armazenamento, precisão, arredondamento, formatação, máximo suportado e prevenção de erros. Sem teto arbitrário de negócio por limitações visuais. |
| Prazo obrigatório de Meta | Obrigatoriedade não decidida; quando informado, data-alvo > hoje. | Impactos em plano, contribuição, estados, projeções e inteligência de Meta sem prazo. |

**Backlog preservado:** Ajuste/Reconciliamento permanece exclusivamente no backlog; não integra a taxonomia do MVP. Outras moedas continuam com baixíssima prioridade. Demais evoluções e pendências não alteradas permanecem documentadas; revisões de descrição e saldo negativo não significam funcionalidades aprovadas.

| Check | Status |
|---|---|
| 07.1 — Tempo, período e histórico | **FECHADO** |
| 07.2 — Saldo ↔ Metas | **FECHADO** |
| 07.3 — Transações ↔ Categorias ↔ Saldo | **FECHADO** |
| 07.4 — Home ↔ Manga Insights ↔ Sistema | **FECHADO** |
| 07.5 — Estados sistêmicos & integridade | **FECHADO**, prazo obrigatório de Meta pendente de alinhamento. |
| 07.6 — Exclusão, edição e efeitos em cascata | **FECHADO** |
| 07.7 — Limites, validações e prevenção de estados impossíveis | **FECHADO** |
| CHECK 07 — Cross-flow & Regras Globais | **CONCLUÍDO**, mantendo pendências de alinhamento anteriores e desta revisão. |

### 32.8 Registro da revisão

**v1.11 — U11 — 24/09/2026:** incorporado CHECK 07.7; consolidadas validações monetárias, nomes de entidades ativas, prazo quando informado, descrição obrigatória, Saldo Inicial e renda. Acrescentado “Bloquear o impossível; orientar o desfavorável”. CHECK 07 concluído com pendências explícitas. Taxonomia sem Ajuste, referências históricas, integridade, movimentos de Meta, Insights e períodos preservados. Fonte primária: mensagem do usuário “CHECK 07.7 — Limites, validações e prevenção de estados impossíveis” nesta tarefa.

## 33. CHECK 08 — Onboarding ↔ App real

**Fonte: U12. Status: FUNCIONALMENTE FECHADO.** Alinhamentos técnicos, retomada, Conta/Acesso e exploração visual/comportamental do UAU permanecem abertos. As decisões desta seção substituem apenas os pontos explicitamente revistos.

### 33.1 Papel e separação de responsabilidades

Onboarding não é formulário extenso: coleta apenas o necessário para preparar primeira experiência contextualizada, criar estruturas reais quando solicitado, entregar valor rapidamente e proporcionar clareza.

> “Onboarding coleta; as features correspondentes passam a ser as fontes de verdade e edição.”

Categoria confirmada vira Categoria real; limite vira planejamento real; Meta vira Meta real; reserva confirmada vira evento real. Após conclusão, manutenção pertence às features, não a uma cópia isolada do onboarding.

| Conceito | Pergunta e responsabilidade |
|---|---|
| Conta/Acesso | “Quem é esse usuário e como ele acessa/se relaciona com o Manga?” Nome, autenticação, contatos e requisitos legais conforme necessidade definida. |
| Onboarding do produto | “O que o Manga precisa saber para preparar a primeira experiência financeira útil?” Saldo Inicial, Categorias/planejamento, Meta e possível reserva. |

Separação conceitual/de arquitetura da informação, **não obrigação de dois fluxos visualmente distintos**. Dados de identificação não se confundem com mínimo financeiro.

**Nome:** único conceito, obrigatório em identificação/conta e usado em contatos/comunicações pertinentes. Não separar nome da conta, apelido ou “como gostaria de ser chamado” no MVP. Substitui Nome preferido separado de U08, preservando comunicação próxima de parceiro e gestão em Conta e dados.

**Idade:** fora do onboarding MVP; nenhuma funcionalidade financeira atual a exige. Avaliar necessidade futura de marketing/persona/segmentação/produto/legal e finalidade clara antes de coletar.

### 33.2 Dados, estruturas e validações

| Etapa / dado | Obrigatoriedade | Regra e destino |
|---|---|---|
| Saldo Inicial | **Obrigatório** | ≥ R$0; zero válido, negativo proibido. Marco inicial; não Entrada nem patrimônio total. |
| Categorias | Opcional, etapa pulável | Alimentação, Moradia, Transporte, Lazer como sugestões; manter, editar, remover ou adicionar. Confirmadas são Categorias reais. |
| Limites mensais | Opcionais por Categoria | > R$0 quando informados; sem limite é válido. Planejamento real, editável na feature. |
| Primeira Meta | Opcional, “Agora não” | Entidade real; sem Meta, continuar onboarding e usar Empty State na Home. |
| Reserva inicial | Opcional, depende de Meta | > R$0 e ≤ Disponível; reduz Disponível e aumenta reserva; não Entrada/Saída. |
| Renda estimada | **Fora do onboarding MVP** | Retorno depende de uso concreto e valor justificado; não cria fatos ou recorrência. |
| Idade | **Fora do onboarding MVP** | Necessidade futura em alinhamento. |
| Primeira Entrada/Saída | Não obrigatória | Sem fatos fictícios, gasto artificial ou tutorial obrigatório de movimentação. |
| Permissão push | Não é barreira | Pedir depois, em contexto de benefício compreensível; momento ainda a definir. |

Onboarding inteiro **não é pulável**. Mínimo financeiro é Saldo Inicial; Conta/Acesso tem requisitos próprios. Não obrigar Categoria/Meta para evitar Empty State.

Perto do campo de Saldo Inicial, orientação curta conceitual:

> “Considere o dinheiro que você pode usar agora. Não inclua valores que já estão reservados para algum objetivo.”

Microcopy final em UI. Mantêm-se marco temporal e proibição de Transações anteriores ao marco.

**Meta no onboarding:** nome válido e único entre ativas, objetivo obrigatório > R$0, data-alvo > hoje quando houver, reserva nunca negativa. Prazo obrigatório continua pendente. Aplicar as mesmas regras do app; não inventar uma versão simplificada de entidade.

**Reserva inicial real:** oferta opcional “Quer começar agora?”. Saldo R$5.000; Meta Viagem R$10.000; reservar R$500 → Disponível R$4.500 e Meta R$500/R$10.000. Mesmo evento e efeitos dos movimentos posteriores, com histórico, atomicidade e proteção contra duplicidade. Disponível R$500 e tentativa R$700 → bloquear e oferecer “Reservar R$500” quando apropriado. Não criar reserva de zero se etapa for pulada.

Sem Categorias, app permanece funcional, Saídas e “Sem categoria” continuam válidos, preservadas referências históricas globais. Limite é o único conceito de planejamento dessa etapa; separar intenção de gasto/limite continua backlog.

### 33.3 Renda estimada — revisão de escopo

Removida porque ainda não há uso inicial suficientemente claro que justifique mais coleta/fricção. **Não retornar apenas por possível utilidade futura.**

**[Alinhamento PD/PM ↔ Dev]** antes de eventual retorno, definir finalidade, valor ao usuário, influência em planejamento/sugestões de Meta, consulta/edição posterior, renda variável e desconhecimento. Distinções anteriores entre renda declarada e Entrada permanecem conceitualmente válidas, mas não tornam o campo parte do MVP atual.

### 33.4 Fluxo conceitual vigente

```text
Conta/Acesso
↓
Identificação/Nome
↓
Saldo Inicial [obrigatório, ≥ R$0]
↓
Categorias [opcional]
↓
Limites das Categorias [opcional]
↓
Primeira Meta [opcional]
↓
Reserva inicial [opcional, condicionada à Meta]
↓
Preparação
↓
UAU Moment
↓
Home
```

Não define quantidade de telas nem aprova IDs O01–O06. Renda e idade não participam; primeira Transação não é obrigação e push não é barreira.

**Persistência/retomada:** intenção favorável, especialmente no mobile, mas decisão não fechada. Avaliar custo, salvamento parcial, fechar/retornar/continuar e momento em que entidades são efetivamente criadas.

**Finalização:** independentemente da persistência, finalizar/reprocessar não pode duplicar Saldo Inicial, Categorias, Metas ou reservas pela mesma intenção. Aplicar idempotência/proteção contra duplicidade e atomicidade quando necessária; mecanismo técnico a definir.

### 33.5 Preparação, UAU e primeira Home

Pode haver preparação breve e verdadeira antes da entrega: “Organizando seu Manga…”. Comunicar apenas o que realmente foi preparado: ponto de partida, Categorias, Meta ou planejamento, conforme escolhas. **Não criar loading artificial demorado**, nem sugerir que estruturas puladas foram criadas. Necessidade real, performance e design serão explorados.

**UAU deve ocorrer antes da primeira Home:** mostrar que dados se tornaram clareza, organização, progresso conhecido ou visão inicial útil. Não limitar a “Cadastro concluído”. Não elogiar economia nem interpretar hábitos sem evidência.

> “O primeiro UAU do Manga vem de transformar informação em clareza, não de simular inteligência sem dados.”

> “Onboarding pode gerar planejamento; não gera artificialmente histórico ou comportamento.”

Pode mostrar progresso inicial calculado, valor reservado, plano e Categorias configuradas. Não afirmar gasto excessivo, bom comportamento de economia, comparar meses anteriores ou gerar Insight comportamental sem histórico. A reserva explicitamente confirmada é evento real, não histórico artificial.

**Primeira Home preserva hierarquia:** Metas → contexto financeiro → Manga Insights → Nova Transação → Navbar.

- Se houver Meta, aplicar ranking e estados globais; se não, Empty State de Metas.
- Exibir Disponível conhecido resultante, inclusive R$0; Saldo Inicial não aparece como Entrada.
- Insights só quando sustentados e relevantes; caso contrário, omitir bloco, sem conteúdo genérico.
- Nova Transação disponível para a primeira necessidade real.

“Nem todo dado merece um Manga Insight.” “Sem Insight relevante, não precisamos exibir o componente.”

### 33.6 [Exploração de Design / Produto] UAU pós-onboarding

**Não são três funcionalidades de backlog.** Explorar no Figma, discutir com Dev, comparar, iterar e validar posteriormente. Comportamento visual final ainda não fechado.

| Cenário obrigatório | Dados disponíveis | Questão de exploração |
|---|---|---|
| A — UAU completo | Saldo, Categorias, Meta e reserva inicial. | Comunicar Disponível resultante, organização, objetivo, reservado e possível plano. |
| B — UAU mínimo | Apenas mínimo financeiro; Categorias, Meta e reserva puladas. | Comunicar Manga preparado e clareza mínima sem dados inventados ou forçar opções. |
| C — UAU começando do zero | Saldo Inicial R$0, nenhum histórico. | Acolher, mostrar prontidão e próxima ação útil, sem julgamento, análise fabricada ou tratar zero como falha. |

Revisar propostas contra UX Principles, regras financeiras, estados sistêmicos, viabilidade técnica e percepção de valor. Esta documentação não aprova telas, animações ou duração.

### 33.7 Regras-mãe e alinhamentos

Regras consolidadas:

1. “Onboarding coleta; as features correspondentes passam a ser as fontes de verdade e edição.”
2. “O onboarding deve coletar apenas informações que possuam finalidade clara dentro da experiência.”
3. “Onboarding pode gerar planejamento; não gera artificialmente histórico ou comportamento.”
4. “O primeiro UAU do Manga vem de transformar informação em clareza, não de simular inteligência sem dados.”
5. “Configurações opcionais não devem impedir o usuário de começar a utilizar o Manga.”
6. “Uma movimentação realizada durante o onboarding é um fato financeiro real e segue as mesmas regras do restante do produto.”

| Alinhamento | Estado / próximo detalhamento |
|---|---|
| Idade | Fora do onboarding; avaliar necessidade/finalidade futura. |
| Renda estimada | Fora do onboarding; justificar uso concreto antes de qualquer retorno. |
| Persistência | Decidir salvamento, etapas, retomada e momento de criação das entidades. |
| Conta/Acesso | Nome único obrigatório; definir demais dados necessários a autenticação, contato, marketing, segurança, LGPD e requisitos legais. |
| Finalização | Garantir idempotência, ausência de duplicidade e atomicidade quando necessária. |
| UAU | Viabilidade, transição, dados disponíveis, performance, necessidade de preparação e três cenários. |
| Prazo de Meta | Obrigatoriedade permanece aberta; regras de data quando informada continuam válidas. |

**Status CHECK 08: FUNCIONALMENTE FECHADO.** Permanecem alinhamentos técnicos, exploração A/B/C no Figma, comportamento visual, retomada, revisão de necessidade de idade/renda e definição dos dados de Conta/Acesso. Check 07 e demais regras não alteradas permanecem vigentes. Ajuste/Reconciliamento não retorna ao MVP.

### 33.8 Registro da revisão

**v1.12 — U12 — 24/09/2026:** incorporado CHECK 08. Saldo Inicial passa a obrigatório; Meta/Categorias/limites/reserva opcionais. Nome único obrigatório substitui nome preferido separado; idade e renda estimada fora do onboarding. Estruturas e reserva reais; primeira Transação e push sem barreira obrigatória. UAU A/B/C classificado como exploração, não backlog. Histórico das decisões substituídas preservado como antecedente. Fonte primária: mensagem do usuário “CHECK 08 — ONBOARDING ↔ APP REAL” nesta tarefa.
