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

### UI Base (pagina: Componentes)

| Componente | Pagina ID | Prioridade MVP |
|------------|-----------|---------------|
| **Button** | `28:309` | Alta |
| **Text Field** | `261:941` | Alta |
| **Text Area** | `261:1220` | Alta |
| **Card** | `279:245` | Alta |
| **Alert** | `272:852` | Alta |
| **Toast** | `272:851` | Alta |
| **Dialog** | `285:292` | Alta |
| **Drawer** | `285:293` | Alta |
| **List Item** | `279:544` | Alta |
| **Avatar** | `279:938` | Media |
| **Badge** | `272:845` | Media |
| **Chip** | `272:846` | Media |
| **Spinner** | `272:849` | Media |
| **Skeleton** | `272:850` | Media |
| **Progress Bar** | `279:1060` | Media |
| **Empty State** | `279:2218` | Media |
| **Checkbox** | `261:1234` | Media |
| **Radio Button** | `261:1253` | Media |
| **Switch** | `261:1263` | Media |
| **Select** | `261:1273` | Media |
| **Tab Item / Tab List** | `353:2` / `353:7197` | Media |
| **Segment Item / Segmented Control** | `353:7115` / `353:7243` | Media |
| **Bottom Navigation** | `353:7334` | Media |
| **Sidebar** | `353:7409` | Media |
| **Tooltip** | `272:847` | Baixa |
| **Divider** | `272:848` | Baixa |
| **Table** | `279:2369` | Baixa |
| **Popover** | `285:294` | Baixa |
| **Dropdown Menu** | `285:295` | Baixa |
| **Date Picker** | `285:296` | Baixa |
| **Calendar** | `285:297` | Baixa |

### Componentes de Produto (pagina: Componentes de Produto)

| Componente | Pagina ID | Descricao |
|------------|-----------|-----------|
| **Logo** | `346:2` | Logotipo oficial |
| **Transaction Item** | `297:48` | Item de movimentacao |
| **Account Card** | `297:844` | Card de conta bancaria |
| **Balance Card** | `297:1469` | Card de saldo |
| **Goal Card** | `297:1620` | Card de meta financeira |
| **Category Item** | `297:2424` | Item de categoria |
| **Financial Summary** | `297:3788` | Resumo financeiro |

---

## 9. Divergencias Codigo vs Figma

| Item | Figma | Codigo atual | Acao necessaria |
|------|-------|-------------|-----------------|
| Tipografia | 15 text styles com SemiBold 600 | Pesos mistos (bold, semibold) e tamanhos ad-hoc | Alinhar com tokens do Figma |
| Radius de botao | `radius/md` = 8px (`rounded-lg`) | `rounded-lg` (OK) | Nenhuma |
| Radius de input | `radius/md` = 8px (`rounded-lg`) | `rounded-lg` (OK) | Nenhuma |
| Sombras | 3 effect styles definidos | Nenhuma sombra usada | Implementar quando necessario |
| Semantic tokens | Colecao completa (surface, action, field, feedback) | Apenas primitivas no CSS | **Criar camada semantica** |
| Componentes React | 40+ componentes no Figma | Button, TextField criados | **Criar demais conforme demanda** |
| shadcn/ui | Na stack | Nao instalado | Instalar como base |
| Fonte Comfortaa | Usada na marca | Nao carregada | Carregar para marca |
| Assets de marca | Logo com variantes no Figma | Nenhum asset em public/ | **Exportar do Figma** |

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
