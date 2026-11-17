# Design System Components — Complete Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement all 12 missing components and update 12 existing components to match the Figma Design System (file key `wpGrZPa3pUk4W3JMfMc2k1`).

**Architecture:** Each component follows the established pattern: TypeScript types for variants, `Record<Type, string>` style maps, `cn()` utility for class composition, `forwardRef` where applicable. Product components support `onClick` with keyboard handlers. No test infrastructure exists — verification via `next build` + showcase page.

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS 4, @base-ui/react (shadcn), cn() utility

---

## Phase 1: Update Existing Components (12 tasks)

### Task 1: Button — add iconOnly prop

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

**Step 1: Update Button component**

Add `iconOnly` prop. When true, removes padding and uses square dimensions.

```tsx
// Add to ButtonProps:
iconOnly?: boolean;

// Add iconOnly sizes:
const iconOnlySizes: Record<ButtonSize, string> = {
  sm: "size-8 p-0",
  md: "size-10 p-0",
  lg: "size-12 p-0",
};

// In className: use iconOnly ? iconOnlySizes[size] : sizeStyles[size]
```

**Step 2: Add to showcase**

Add "Icon only" group under Button section with all 4 variants × 3 sizes using a simple SVG icon.

**Step 3: Verify & Commit**

Run: `npx next build`
Commit: `feat: adicionar prop iconOnly ao Button`

---

### Task 2: Card — add padding prop and interactive states

**Files:**
- Modify: `src/components/ui/card.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

**Step 1: Update Card component**

```tsx
// Change CardProps:
type CardPadding = "sm" | "md";  // 16px | 24px — already exists, verify
// Add interactive prop:
interactive?: boolean;
onClick?: () => void;

// Add interactive styles:
// interactive: "cursor-pointer hover:bg-neutral-50 active:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none"
// Add keyboard handler: onKeyDown Enter/Space
```

**Step 2: Add interactive Card examples to showcase**

**Step 3: Verify & Commit**

---

### Task 3: List Item — add size and style props

**Files:**
- Modify: `src/components/ui/list-item.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

**Step 1: Update ListItem**

```tsx
type ListItemSize = "md" | "lg";
type ListItemStyle = "default" | "surface";

// md: py-3 (existing), lg: py-4
// default: bg-transparent, surface: bg-neutral-50
```

**Step 2: Showcase with both sizes/styles**

**Step 3: Verify & Commit**

---

### Task 4: Empty State — add size and style props

**Files:**
- Modify: `src/components/ui/empty-state.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type EmptyStateSize = "default" | "compact";
type EmptyStateStyle = "neutral" | "surface";

// compact: py-6 px-4 (smaller padding)
// surface: bg-neutral-50 rounded-xl
```

---

### Task 5: Progress — add variant and height props

**Files:**
- Modify: `src/components/ui/progress.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
// Track height: 4 | 8 | 12 (px)
// Indicator variant: "primary" | "neutral" | "success"
// primary: bg-primary-500, neutral: bg-neutral-400, success: bg-success-500
```

---

### Task 6: Transaction Item — add size and style props

**Files:**
- Modify: `src/components/product/transaction-item.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type TransactionSize = "default" | "compact";
type TransactionStyle = "default" | "surface";

// compact: smaller padding, smaller text
// surface: bg-neutral-50
```

---

### Task 7: Account Card — add size compact and interaction states

**Files:**
- Modify: `src/components/product/account-card.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type AccountCardSize = "default" | "compact";
// compact: smaller padding, sm text sizes
// Interactive states already partially exist (onClick), just need focus-visible ring
```

---

### Task 8: Balance Card — add size prop

**Files:**
- Modify: `src/components/product/balance-card.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type BalanceCardSize = "default" | "compact" | "featured";
// compact: smaller padding, sm text
// featured: larger padding, 3xl value text, prominent icon
```

---

### Task 9: Goal Card — add sizes and improve

**Files:**
- Modify: `src/components/product/goal-card.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type GoalCardSize = "default" | "compact" | "featured";
// compact: condensed layout, smaller text
// featured: hero layout, larger progress bar, prominent value
```

---

### Task 10: Category Item — add spending progress

**Files:**
- Modify: `src/components/product/category-item.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
// Add optional props:
budget?: number;      // total budget
spent?: number;       // amount spent
// Renders a small progress bar under the value when both are provided
// Color: primary-500 under 80%, warning-500 at 80-99%, error-500 at 100%+
```

---

### Task 11: Dialog — add type and size props

**Files:**
- Modify: `src/components/ui/dialog.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

Figma has Type (Default/Confirmation/Destructive) and Size (Small/Medium/Large). These are compositional in shadcn — handle via showcase examples showing each pattern rather than baked-in props, since Dialog is compound.

---

### Task 12: Drawer — document placement and size patterns

Same approach as Dialog — Drawer is compound from shadcn. Show Bottom/Right placement examples and S/M/L sizes in showcase.

---

## Phase 2: New UI Components — Simple (6 tasks)

### Task 13: Chip (Filter + Input)

**Files:**
- Create: `src/components/ui/chip.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

**Step 1: Create component**

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type ChipType = "filter" | "input";
type ChipSize = "sm" | "md";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ChipType;
  size?: ChipSize;
  selected?: boolean;
  onRemove?: () => void; // for input type
}

// Filter chip: toggleable, shows checkmark when selected
// Input chip: shows X button for removal
// Sizes: sm = h-7 px-2.5 text-xs, md = h-8 px-3 text-sm
// Unselected: bg-white border-neutral-300 text-neutral-700
// Selected: bg-primary-50 border-primary-500 text-primary-700
// Hover: bg-neutral-50 (unselected), bg-primary-100 (selected)
// Disabled: opacity-50 cursor-not-allowed
// Focus: ring-2 ring-blue-600 ring-offset-2
// rounded-full
```

**Step 2: Add to showcase with Filter and Input examples**

**Step 3: Verify & Commit**: `feat: criar componente Chip (Filter + Input)`

---

### Task 14: FAB (Floating Action Button)

**Files:**
- Create: `src/components/ui/fab.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type FABSize = "sm" | "default" | "lg";

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FABSize;
  icon: React.ReactNode;
  label?: string; // Extended FAB with label
}

// Sizes: sm = size-10, default = size-14, lg = size-16
// Style: bg-primary-500 text-white rounded-2xl shadow-md
// Hover: bg-primary-600 shadow-lg
// Active: bg-primary-700
// Disabled: opacity-50
// Focus: ring-2 ring-blue-600 ring-offset-2
// Extended (with label): auto width, px-6, gap-2
```

---

### Task 15: Segment Item + Segmented Control

**Files:**
- Create: `src/components/ui/segmented-control.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface SegmentItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

// Container: inline-flex bg-neutral-100 rounded-lg p-1 gap-1
// Item unselected: bg-transparent text-neutral-600 px-4 py-1.5 rounded-md text-sm font-semibold
// Item selected: bg-white text-neutral-900 shadow-sm
// Hover (unselected): text-neutral-900
// Disabled: opacity-50 cursor-not-allowed
// Focus: ring-2 ring-blue-600 ring-offset-1
// Uses React context to share value/onChange
```

---

### Task 16: Navigation Item + Navigation Item Mobile

**Files:**
- Create: `src/components/ui/nav-item.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
// Desktop Navigation Item
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// Expanded: flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full
// Collapsed: flex items-center justify-center size-10 rounded-lg
// Active: bg-primary-50 text-primary-700
// Inactive: text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900
// Disabled: opacity-50 cursor-not-allowed

// Mobile Navigation Item
interface NavItemMobileProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// flex flex-col items-center gap-0.5 py-2 px-3 min-w-[64px]
// Active: text-primary-500
// Inactive: text-neutral-500
```

---

### Task 17: Sidebar

**Files:**
- Create: `src/components/ui/sidebar.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
interface SidebarProps {
  collapsed?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Expanded: w-60 h-full bg-white border-r border-neutral-200 flex flex-col py-4
// Collapsed: w-16 h-full bg-white border-r border-neutral-200 flex flex-col py-4 items-center
// Transition: transition-[width] duration-200
// Uses NavItem components inside
```

---

### Task 18: Divider (enhance Separator)

The existing Separator already covers Divider. Figma has H/V × Default/Subtle.
Separator from shadcn already supports orientation. Add `variant` prop for subtle:

**Files:**
- Modify: `src/components/ui/separator.tsx`

```tsx
// Add variant: "default" | "subtle"
// default: border-neutral-200 (existing)
// subtle: border-neutral-100
```

---

## Phase 3: New UI Components — Complex (3 tasks)

### Task 19: Table (+ Cell, Header, Row)

**Files:**
- Create: `src/components/ui/table.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type TableDensity = "comfortable" | "compact";
type TableStyle = "default" | "striped";

// Compound component:
// Table: w-full border-collapse
// TableHeader: bg-neutral-50 border-b
// TableBody: divide-y
// TableRow: hover:bg-neutral-50 (interactive), data-[striped]:even:bg-neutral-50
// TableHead: text-left text-xs font-semibold text-neutral-600 uppercase tracking-wide
// TableCell: text-sm text-neutral-900
// Density comfortable: px-4 py-3, compact: px-3 py-2
```

---

### Task 20: Calendar (+ Day, Header)

**Files:**
- Create: `src/components/ui/calendar.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
  density?: "default" | "compact";
  minDate?: Date;
  maxDate?: Date;
}

// Pure React implementation (no external date lib)
// Header: month/year display + prev/next arrows
// Day grid: 7 columns (Dom Seg Ter Qua Qui Sex Sab)
// Day states: default, hover, selected (bg-primary-500 text-white), today (ring),
//   outside-month (opacity-40), disabled, range-start/middle/end
// Density: default = size-10 per day, compact = size-8
```

---

### Task 21: Date Picker (Single + Range)

**Files:**
- Create: `src/components/ui/date-picker.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type DatePickerMode = "single" | "range";
type DatePickerSize = "sm" | "md" | "lg";

interface DatePickerProps {
  mode?: DatePickerMode;
  size?: DatePickerSize;
  value?: Date | null;
  rangeValue?: { start: Date | null; end: Date | null };
  onChange?: (date: Date | null) => void;
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

// Input field styled like TextField + calendar icon
// On click/focus: opens Popover with Calendar inside
// Size maps same as TextField: sm = h-8, md = h-10, lg = h-12
// Desktop: Popover, Mobile: Drawer (responsive)
// Uses Calendar component internally
```

---

## Phase 4: New Product Components (3 tasks)

### Task 22: Goal Avatar + Icon/Color Options

**Files:**
- Create: `src/components/product/goal-avatar.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type GoalAvatarSize = 32 | 48 | 72;
type GoalAvatarContent = "initials" | "icon" | "placeholder";
type GoalAvatarSource = "saved" | "draft";

interface GoalAvatarProps {
  size?: GoalAvatarSize;
  content?: GoalAvatarContent;
  initials?: string;
  icon?: React.ReactNode;
  color?: string; // bg color override
  source?: GoalAvatarSource;
}

// Circle avatar specifically for goals
// Placeholder: dashed border with + icon
// Draft: neutral-200 bg with pencil icon
// Saved: colored bg with initials or icon
// Sizes: 32 = size-8, 48 = size-12, 72 = size-18
```

---

### Task 23: Financial Card

**Files:**
- Create: `src/components/product/financial-card.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type FinancialCardLayout = "single" | "summary";
type FinancialCardSize = "default" | "compact";
type FinancialCardState = "default" | "loading" | "error";

interface FinancialCardProps {
  layout?: FinancialCardLayout;
  size?: FinancialCardSize;
  state?: FinancialCardState;
  icon?: React.ReactNode;
  title: string;
  value?: string;
  subtitle?: string;
  // Summary layout extras:
  items?: Array<{ label: string; value: string; tone?: "positive" | "negative" | "neutral" }>;
  errorMessage?: string;
  onRetry?: () => void;
}

// Single: icon + title + large value + subtitle
// Summary: icon + title + list of label/value pairs
// Loading: Skeleton placeholders
// Error: error icon + message + retry button
// Compact: smaller padding and text
// Card style: white bg, border, rounded-xl
```

---

### Task 24: Manga Insights (+ Action)

**Files:**
- Create: `src/components/product/manga-insights.tsx`
- Modify: `src/app/(app)/dev/components/page.tsx`

```tsx
type MangaInsightsSize = "default" | "compact";
type MangaInsightsState = "default" | "loading" | "error";

interface MangaInsightsProps {
  size?: MangaInsightsSize;
  state?: MangaInsightsState;
  icon?: React.ReactNode;
  title: string;
  description: string;
  indicator?: {
    label: string;
    value: string;
    tone?: "positive" | "negative" | "neutral";
  };
  actions?: MangaInsightAction[];
}

interface MangaInsightAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Insight card with optional indicator badge and action buttons
// Default: white card with border, icon + title + description
// Indicator: colored pill showing metric (e.g. "-12% vs mes passado")
// Actions: row of buttons at bottom
// Loading: skeleton placeholders
// Error: error message
// Brand feel: subtle primary-50 accent on icon container
```

---

## Phase 5: Showcase + Final Verification

### Task 25: Update showcase with all new components

**Files:**
- Modify: `src/app/(app)/dev/components/page.tsx`

Add sections for every new component. Remove from "Pendentes" lists. Update "A atualizar" lists to show completed items.

### Task 26: Final build verification

Run: `npx next build`
Ensure all pages compile, no TypeScript errors.

### Task 27: Update docs

**Files:**
- Modify: `docs/DESIGN-SYSTEM.md` — update status columns to reflect completed work

### Task 28: Commit all and push

```bash
git add .
git commit -m "feat: implementar DS completo — 12 novos componentes + 12 atualizacoes"
git push
```

---

## Execution Order (Parallelizable Groups)

**Group A (parallel):** Tasks 1-5 (Button, Card, ListItem, EmptyState, Progress updates)
**Group B (parallel):** Tasks 6-10 (TransactionItem, AccountCard, BalanceCard, GoalCard, CategoryItem updates)
**Group C (parallel):** Tasks 11-12 (Dialog, Drawer showcase updates)
**Group D (parallel):** Tasks 13-18 (Chip, FAB, SegmentedControl, NavItem, Sidebar, Separator)
**Group E (sequential):** Task 20 then 21 (Calendar before DatePicker — dependency)
**Group F (parallel):** Tasks 19, 22 (Table, GoalAvatar)
**Group G (parallel):** Tasks 23-24 (FinancialCard, MangaInsights)
**Group H (sequential):** Tasks 25-28 (Showcase, build, docs, commit)

**Estimated tasks:** 28 total across 8 groups
