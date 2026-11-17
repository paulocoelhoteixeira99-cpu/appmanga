# Manga - Design System

> Referencia tecnica do Design System para desenvolvimento.
> **Fonte visual:** Figma — `wpGrZPa3pUk4W3JMfMc2k1` (Manga — Foundations & DS)
> **Fonte verbal/marca:** `docs/BRAND-IDENTITY.md`

---

## 1. Figma — Fonte de Referencia Visual

**File key:** `wpGrZPa3pUk4W3JMfMc2k1`
**URL:** `https://www.figma.com/design/wpGrZPa3pUk4W3JMfMc2k1`
**Biblioteca:** Manga — Foundations & DS
**Colecoes de variaveis:** Primitives, Semantic Colors

**Acesso:** Somente leitura via MCP. NUNCA editar o Figma.

### Estrutura de paginas

| Pagina | Conteudo |
|--------|----------|
| Marca | Identidade visual, logo |
| Foundations | Tokens base (via paginas dedicadas abaixo) |
| Text | 15 text styles (display, heading, body, label, caption) |
| Colors | Paletas primitivas e semanticas |
| Space | Escala de espacamento (11 tokens) |
| Radius | Escala de arredondamento (7 tokens) |
| Opacity | Escala de opacidade (7 tokens) |
| Effect | Sombras (3 effect styles) |
| Grid & Canvas | Grid e canvas |
| Componentes | Biblioteca completa de UI |
| Componentes de Produto | Componentes especificos do Manga |

---

## 2. Cores

### 2.1 Cores de Marca

| Token CSS | Hex | Nome | Uso |
|-----------|-----|------|-----|
| `mango-yellow` | `#F5A800` | Mango Yellow | Gradiente — ponto inicial |
| `mango-orange` | `#F07020` | Mango Orange | Cor primaria da marca |
| `mango-red` | `#F05030` | Mango Red | Gradiente — meio |
| `mango-pink` | `#F0206A` | Mango Pink | Gradiente — ponto final |
| `mango-olive` | `#8A9A00` | Mango Olive | Exclusivo ao gradiente do logo |
| `mango-night` | `#1A1030` | Mango Night | Texto, icones, simbolo |
| `mango-cream` | `#F5F3EB` | Mango Cream | Background principal |

### 2.2 Paleta Primaria (Laranja) — 50 a 900

| Token | Hex | Uso |
|-------|-----|-----|
| `primary-50` | `#FEF0E6` | Background muito suave |
| `primary-100` | `#FDD9C0` | Background de badge |
| `primary-200` | `#FABB90` | Background de alert |
| `primary-300` | `#F79960` | Borda, icone suave |
| `primary-400` | `#F47E40` | Icone, estado hover |
| `primary-500` | `#F07020` | **Cor principal — botoes, links, acentos** |
| `primary-600` | `#C85A10` | Estado hover/pressed |
| `primary-700` | `#A04508` | Texto semantico |
| `primary-800` | `#743005` | Texto em fundo claro |
| `primary-900` | `#461C02` | Alto contraste |

### 2.3 Neutros (base quente derivada do Cream)

| Token | Hex | Uso |
|-------|-----|-----|
| `neutral-50` | `#F5F3EB` | Background principal (= Cream) |
| `neutral-100` | `#ECEAE0` | Background alternativo, cards |
| `neutral-200` | `#D9D6CA` | Bordas suaves |
| `neutral-300` | `#C2BFB3` | Bordas, divisores |
| `neutral-400` | `#A8A49A` | Placeholder, icones desabilitados |
| `neutral-500` | `#8C8880` | Texto desabilitado |
| `neutral-600` | `#6E6B64` | Texto secundario |
| `neutral-700` | `#4F4D48` | Texto de suporte, labels |
| `neutral-800` | `#302E2A` | Texto primario alternativo |
| `neutral-900` | `#1C1A17` | Texto principal |

### 2.4 Cores Semanticas (resumo — paleta completa em BRAND-IDENTITY.md)

| Categoria | 50 (bg) | 500 (principal) | 700 (texto) |
|-----------|---------|-----------------|-------------|
| **Success** | `#E8F7EF` | `#2A9E5E` | `#1A683C` |
| **Warning** | `#FEF9E6` | `#D4A000` | `#8A6800` |
| **Error** | `#FCEDF0` | `#CC2A48` | `#82182A` |

### 2.5 Semantic Color Tokens (do Figma)

Variaveis da colecao **Semantic Colors** — usar para mapear intencao, nao cor fixa.

**Surface:**
- `surface/default` — background de cards e containers
- `surface/sunken` — background rebaixado (pagina)
- `surface/inverse` — fundo escuro

**Text:**
- `text/primary` — texto principal
- `text/secondary` — texto de suporte
- `text/disabled` — texto desabilitado
- `text/inverse` — texto em fundo escuro
- `text/link` — links

**Border:**
- `border/default` — borda padrao
- `border/subtle` — borda suave
- `border/strong` — borda forte

**Field (formularios):**
- `field/text/value` — valor do campo
- `field/text/placeholder` — placeholder
- `field/text/disabled` — campo desabilitado
- `field/border/default` — borda padrao
- `field/border/hover` — borda hover
- `field/border/focus` — borda focus
- `field/border/error` — borda erro

**Action (botoes):**
- `action/primary/background/{hover, pressed}`
- `action/primary/content/{default, hover, pressed, disabled}`
- `action/secondary/content/{default, hover, pressed}`
- `action/secondary/border/{default, hover, pressed}`
- `action/destructive/content/{default, hover}`

**Feedback:**
- `feedback/{success,warning,danger,info}/{text, icon, border, background}`

**Chip:**
- `chip/neutral/{text, border}`
- `chip/selected/{text, border}`

**Overlay:**
- `overlay/scrim` — preto com 40% opacidade para modais

---

## 3. Tipografia

### Fontes

| Fonte | Uso | Status no codigo |
|-------|-----|-----------------|
| **Inter** | Interface do produto (exclusiva) | Carregada via `next/font/google` |
| **Comfortaa** | Marca, comunicacao, banners | **NAO carregada** — pendente |

### Hierarquia — 15 Text Styles (do Figma)

| Token | Tamanho | Peso | Line Height | Uso |
|-------|---------|------|-------------|-----|
| `display/lg` | 48px | 600 (SemiBold) | 120% | Numeros grandes, saldo principal |
| `display/md` | 40px | 600 | 120% | Destaque secundario |
| `display/sm` | 32px | 600 | 120% | Destaque menor |
| `heading/h1` | 32px | 600 | 120% | Titulos de tela |
| `heading/h2` | 24px | 600 | 120% | Titulos de secao |
| `heading/h3` | 20px | 600 | 120% | Titulos de card |
| `heading/h4` | 18px | 600 | 120% | Subtitulos |
| `body/lg` | 18px | 400 (Regular) | 150% | Texto principal, descricoes |
| `body/md` | 16px | 400 | 150% | Texto padrao |
| `body/sm` | 14px | 400 | 150% | Texto secundario |
| `label/lg` | 16px | 600 | 150% | Botoes, controles |
| `label/md` | 14px | 600 | 150% | Labels de campo |
| `label/sm` | 12px | 600 | 150% | Badges, tabs |
| `caption/md` | 12px | 400 | 150% | Legendas |
| `caption/sm` | 12px | 500 (Medium) | 150% | Textos auxiliares |

> `font-feature-settings: "tnum"` ja ativo globalmente no body para numerais tabulares.

### Regras tipograficas (do Figma)
- Inter na interface, Comfortaa apenas na marca/comunicacao
- Manter hierarquia: Display > Heading > Body > Label > Caption
- Alinhamento a esquerda em textos corridos
- Valores financeiros: display para saldos, alinhar a direita em listas
- Cor nao define significado financeiro — usar rotulos e sinais

---

## 4. Espacamento

### Escala — 14 tokens

| Token Figma | Valor | Tailwind equivalente |
|-------------|-------|---------------------|
| `spacing/0` | 0px | `0` |
| `spacing/1` | 4px | `1` |
| `spacing/1-5` | 6px | `1.5` |
| `spacing/2` | 8px | `2` |
| `spacing/2-5` | 10px | `2.5` |
| `spacing/3` | 12px | `3` |
| `spacing/3-5` | 14px | `3.5` |
| `spacing/4` | 16px | `4` |
| `spacing/5` | 20px | `5` |
| `spacing/6` | 24px | `6` |
| `spacing/8` | 32px | `8` |
| `spacing/10` | 40px | `10` |
| `spacing/12` | 48px | `12` |
| `spacing/16` | 64px | `16` |

### Uso recomendado
- Icone + texto: `spacing/1` (4px) ou `spacing/2` (8px)
- Padding de controles: `spacing/4` (16px)
- Padding de superficies: `spacing/6` (24px) ou `spacing/8` (32px)
- Gap entre campos: `spacing/4` (16px)
- Gap entre secoes: `spacing/8` (32px)

---

## 5. Border Radius

### Escala — 7 tokens

| Token Figma | Valor | Tailwind equivalente | Uso |
|-------------|-------|---------------------|-----|
| `radius/none` | 0px | `rounded-none` | Sem arredondamento |
| `radius/sm` | 4px | `rounded` | **Checkbox (control)** |
| `radius/md` | 8px | `rounded-lg` | **Botoes, campos de input, controles** |
| `radius/lg` | 12px | `rounded-xl` | **Cards** |
| `radius/xl` | 16px | `rounded-2xl` | **Superficies maiores** |
| `radius/2xl` | 24px | `rounded-3xl` | Paineis e areas expandidas |
| `radius/full` | 9999px | `rounded-full` | **Pilulas, chips, avatares** |

### Border Widths

| Token Figma | Valor |
|-------------|-------|
| `border/width/1` | 1px |
| `border/width/1-5` | 1.5px |
| `border/width/2` | 2px |
| `border/width/2-5` | 2.5px |
| `border/width/3` | 3px |

---

## 6. Opacidade

| Token Figma | Valor | Uso |
|-------------|-------|-----|
| `opacity/0` | 0% | Totalmente transparente |
| `opacity/10` | 10% | Sutil |
| `opacity/20` | 20% | Hover suave |
| `opacity/40` | 40% | Overlay/scrim |
| `opacity/60` | 60% | Semi-transparente |
| `opacity/80` | 80% | Quase opaco |
| `opacity/100` | 100% | Totalmente opaco |

> Overlay scrim: preto puro (#000) com opacity/40 (40%). Preto puro so no overlay.
> Para disabled: usar cores semanticas, NAO reduzir opacidade do texto.

---

## 7. Sombras (Effect Styles)

| Token Figma | Y | Blur | Spread | Cor | Uso |
|-------------|---|------|--------|-----|-----|
| `shadow/sm` | 2px | 8px | 0px | `#1A1030` 6% | Cards, separacao sutil |
| `shadow/md` | 4px | 16px | 0px | `#1A1030` 10% | Menus, popovers flutuantes |
| `shadow/lg` | 8px | 32px | 0px | `#1A1030` 14% | Modais, maior elevacao |

> Nem toda superficie precisa de sombra. Borda ou diferenca de fundo podem bastar.

---

## 8. Componentes — Biblioteca Figma

> **Totais Figma:** 55 component sets, ~700 variantes.
> **Totais Codigo:** 32 componentes implementados (25 UI + 7 produto).

### 8.1 UI Base — Mapa completo

| # | Componente | Page ID | Variants Figma | Codigo | Status |
|---|------------|---------|---------------|--------|--------|
| 1 | **Button** | `28:309` | 120: 4 variants × 3 sizes × 5 states × icon-only | 4 variants × 3 sizes, loading/disabled | Falta: `iconOnly` prop |
| 2 | **Text Field** | `261:941` | 21: Text/Password/Number × 7 states | Tipos via HTML `type`, estados via props | OK |
| 3 | **Text Area** | `261:1220` | 7 states | Estados via props | OK |
| 4 | **Card** | `279:245` | 30: 3 styles × Padding 16/24 × Interactive/Static × states | 3 styles (default/elevated/outline) | Falta: `padding` prop, interactive states |
| 5 | **Alert** | `272:852` | 8: Soft/Outline × 4 types | Soft/Outline × 4 types | OK |
| 6 | **Toast** | `272:851` | 4 types | 4 types (via sonner) | OK |
| 7 | **Dialog** | `285:292` | 9: Default/Confirmation/Destructive × S/M/L | Compound basico | Falta: `type` e `size` props |
| 8 | **Drawer** | `285:293` | 5: Bottom (Content/Expanded) + Right (S/M/L) | Compound basico | Falta: `placement` e `size` props |
| 9 | **List Item** | `279:544` | 24: Medium/Large × Default/Surface × Interactive × states | Basico | Falta: `size`, `style` props |
| 10 | **Avatar** | `279:938` | 24: Icon/Image/Initials × Circle/Rounded × 4 sizes | 3 types × 2 shapes × 4 sizes | OK |
| 11 | **Badge** | `272:845` | 20: Soft/Outline × 5 tones × 2 sizes | Soft/Outline × 5 tones × 2 sizes | OK |
| 12 | **Chip** | `272:846` | 48: Filter/Input × 2 sizes × Selected/Unselected × 4 states | **Nao existe** | CRIAR |
| 13 | **Spinner** | `272:849` | 9: 3 styles × 3 sizes | 3 styles × 3 sizes | OK |
| 14 | **Skeleton** | `272:850` | 3 shapes | 3 shapes | OK |
| 15 | **Progress Bar** | `279:1060` | 9: Neutral/Primary/Success × Height 4/8/12 | Basico (apenas primary) | Falta: `variant` e `height` props |
| 16 | **Empty State** | `279:2218` | 4: Compact/Default × Neutral/Surface | Basico | Falta: `size` e `style` props |
| 17 | **Checkbox** | `261:1234` | 12: 3 selections × 4 states | Via shadcn | OK |
| 18 | **Radio Button** | `261:1253` | 8: 2 selections × 4 states | Via custom component | OK |
| 19 | **Switch** | `261:1263` | 8: On/Off × 4 states | Via shadcn | OK |
| 20 | **Select** | `261:1273` | 10 states + Menu | Via shadcn | OK |
| 21 | **Tab Item / Tab List** | `353:2` / `353:7197` | 8 + 1 | Via shadcn Tabs | OK |
| 22 | **Segment Item** | `353:7115` | 8: Selected/Unselected × 4 states | **Nao existe** | CRIAR |
| 23 | **Segmented Control** | `353:7243` | 3: 2/3/4 segments | **Nao existe** | CRIAR |
| 24 | **Navigation Item** | `353:7155` | 16: Collapsed/Expanded × Active/Inactive × 4 states | **Nao existe** | CRIAR |
| 25 | **Navigation Item Mobile** | `353:7292` | 8: Active/Inactive × 4 states | **Nao existe** | CRIAR |
| 26 | **Bottom Navigation** | `353:7334` | 3: Items 3/4/5 | Implementado | OK |
| 27 | **Sidebar** | `353:7409` | 2: Collapsed/Expanded | **Nao existe** | CRIAR |
| 28 | **FAB** | `400:1240` | 15: 3 sizes × 5 states | **Nao existe** | CRIAR |
| 29 | **Tooltip** | `272:847` | 4 positions | Via shadcn | OK |
| 30 | **Divider** | `272:848` | 4: H/V × Default/Subtle | Separator (shadcn) | OK |
| 31 | **Table** | `279:2369` | 32: Cell/Header/Row + Density × Sort × States | **Nao existe** | CRIAR |
| 32 | **Popover** | `285:294` | 12: 4 placements × 3 sizes | Via shadcn (basico) | OK |
| 33 | **Dropdown Menu** | `285:295` | 22: 2 densities × Default/Destructive × states | Via shadcn (basico) | OK |
| 34 | **Date Picker** | `285:296` | 36: Single/Range × 3 sizes × 6 states | **Nao existe** | CRIAR |
| 35 | **Calendar** | `285:297` | 28: Day/Header/Grid + 2 densities × 12 states | **Nao existe** | CRIAR |

### 8.2 Componentes de Produto — Mapa completo

| # | Componente | Page ID | Variants Figma | Codigo | Status |
|---|------------|---------|---------------|--------|--------|
| 1 | **Logo** | `346:2` | 16: 4 tipos (Logomarca/Logomarca Brand/Simbolo/Simbolo Brand) × 4 versoes (Gradiente/Flat/Clara/Escura) | Apenas SVG gradiente | Falta: 15 variantes |
| 2 | **Transaction Item** | `297:48` | 24: Compact/Default × Default/Surface × Interactive/Static × states | types (income/expense/transfer) | Falta: `size`, `style` props |
| 3 | **Account Card** | `297:844` | 24: Compact/Default × Default/Elevated × Interactive/Static × states | Default/Elevated | Falta: `size` compact, interaction states |
| 4 | **Balance Card** | `297:1469` | 9: Compact/Default/Featured × Default/Subtle/Brand | 3 styles | Falta: sizes `compact`/`featured` |
| 5 | **Financial Card** | `419:5` | 12: Single/Summary × Compact/Default × Default/Error/Loading | **Nao existe** | CRIAR |
| 6 | **Goal Card** | `297:1620` | 54: 3 sizes × 2 styles × Interactive/Static × states + Goal Avatar (9 variants) + Icon/Color options | Versao basica | Falta: sizes, avatar, personalizacao |
| 7 | **Category Item** | `297:2424` | Base + Spending Progress (65%/90%) | Basico | Falta: Spending Progress |
| 8 | **Financial Summary** | `297:3788` | Componente individual | Implementado | OK |
| 9 | **Manga Insights** | `437:7` | 17: Indicator + 6 card states + 5 action states | **Nao existe** | CRIAR |

### 8.3 Resumo quantitativo

| Categoria | Figma | Codigo | Nao existe | Existe c/ gaps | Alinhado |
|-----------|-------|--------|-----------|---------------|----------|
| UI | 35 | 25 | 10 | 7 | 18 |
| Produto | 9 | 7 | 2 | 5 | 1 (Fin. Summary) |
| **Total** | **44** | **32** | **12** | **12** | **19** |

---

## 9. Divergencias Globais

### 9.1 Tokens e Fundacao

| Item | Figma | Codigo atual | Status |
|------|-------|-------------|--------|
| Tipografia | 15 text styles com SemiBold 600 | Pesos mistos (bold, semibold) e tamanhos ad-hoc | Alinhar com tokens do Figma |
| Radius de botao | `radius/md` = 8px (`rounded-lg`) | `rounded-lg` | OK |
| Radius de input | `radius/md` = 8px (`rounded-lg`) | `rounded-lg` | OK |
| Sombras | 3 effect styles definidos | Nenhuma sombra usada | Implementar quando necessario |
| Semantic tokens | Colecao completa (surface, action, field, feedback) | Apenas primitivas no CSS | **Criar camada semantica** |
| shadcn/ui | Na stack | Instalado (v4, base-nova, @base-ui/react) | OK |
| Fonte Comfortaa | Usada na marca | Nao carregada | Carregar para marca |
| Assets de marca | Logo 16 variantes organizadas no Figma | 1 SVG gradiente em src/assets/ | **15 variantes pendentes**  |

### 9.2 Componentes que precisam CRIAR (12)

| Componente | Tipo | Variants Figma | Prioridade |
|------------|------|---------------|------------|
| Chip (Filter + Input) | UI | 48 | Media |
| Segment Item + Segmented Control | UI | 11 | Media |
| Navigation Item (desktop) | UI | 16 | Media |
| Navigation Item Mobile | UI | 8 | Media |
| Sidebar | UI | 2 | Media |
| FAB | UI | 15 | Media |
| Table (+ Cell, Header, Row) | UI | 32 | Baixa |
| Date Picker (Single + Range) | UI | 36 | Baixa |
| Calendar (+ Day, Header) | UI | 28 | Baixa |
| Financial Card | Produto | 12 | Alta |
| Manga Insights (+ Action) | Produto | 17 | Alta |
| Goal Avatar + Icon/Color options | Produto | ~18 | Media |

### 9.3 Componentes que precisam ATUALIZAR (12)

| Componente | O que falta | Variants faltando |
|------------|------------|-------------------|
| Button | Prop `iconOnly` (Show label=False) | 60 (metade das 120) |
| Card | Props `padding` (16/24), interactive states | ~15 |
| Dialog | Props `type` (Default/Confirmation/Destructive), `size` (S/M/L) | 9 |
| Drawer | Props `placement` (Bottom/Right), `size` | 5 |
| List Item | Props `size` (Medium/Large), `style` (Default/Surface) | ~20 |
| Progress Bar | Props `variant` (Neutral/Primary/Success), `height` (4/8/12) | 9 |
| Empty State | Props `size` (Compact/Default), `style` (Neutral/Surface) | 4 |
| Logo | 15 variantes de tipo/versao (Flat, Clara, Escura, Brand, Simbolo) | 15 |
| Transaction Item | Props `size` (Compact/Default), `style` (Default/Surface) | ~20 |
| Account Card | Prop `size` (Compact), interaction states | ~12 |
| Balance Card | Props `size` (Compact/Featured) | 6 |
| Goal Card | Sizes (Compact/Featured), Goal Avatar, personalizacao | ~40 |
| Category Item | Spending Progress bar | 2 |

---

## 10. Processo de Consulta Obrigatoria

Antes de implementar qualquer elemento visual:

1. **Consultar este documento** — tokens, componentes, divergencias
2. **Consultar o Figma via MCP** — inspecionar o frame (somente leitura)
   - `create_session` com fileKey `wpGrZPa3pUk4W3JMfMc2k1`
   - `get_metadata` para estrutura
   - `get_design_context` para implementar (requer skill figma-design-to-code)
   - `search_design_system` para encontrar componentes/variaveis
3. **Verificar `src/components/`** — componentes React ja implementados
4. **Reutilizar** — nunca criar duplicatas
5. **Se nao existir** — informar lacuna e aguardar aprovacao

---

## 11. Arquivos de Referencia

| Arquivo | Conteudo |
|---------|----------|
| `src/app/globals.css` | Tokens de cor (bloco `@theme`) |
| `src/app/layout.tsx` | Font loading (Inter), metadata |
| `docs/BRAND-IDENTITY.md` | Identidade verbal e visual completa |
| `docs/DESIGN-SYSTEM.md` | Este documento |
