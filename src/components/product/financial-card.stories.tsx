import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FinancialCard } from "./financial-card";

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const meta: Meta<typeof FinancialCard> = {
  title: "Product/FinancialCard",
  component: FinancialCard,
  argTypes: {
    layout: { control: "select", options: ["single", "summary"] },
    size: { control: "select", options: ["default", "compact"] },
    state: { control: "select", options: ["default", "loading", "error"] },
  },
};

export default meta;
type Story = StoryObj<typeof FinancialCard>;

export const SingleDefault: Story = {
  args: {
    icon: <WalletIcon />,
    title: "Saldo disponivel",
    value: "R$ 12.450,00",
    subtitle: "Atualizado hoje",
  },
};

export const SingleCompact: Story = {
  args: {
    size: "compact",
    icon: <WalletIcon />,
    title: "Saldo",
    value: "R$ 12.450,00",
  },
};

export const Summary: Story = {
  args: {
    layout: "summary",
    icon: <WalletIcon />,
    title: "Outubro 2026",
    items: [
      { label: "Receitas", value: "R$ 2.500,00", tone: "positive" },
      { label: "Despesas", value: "R$ 245,90", tone: "negative" },
      { label: "Resultado", value: "R$ 2.254,10", tone: "positive" },
    ],
  },
};

export const Loading: Story = {
  args: { state: "loading", title: "Carregando..." },
};

export const Error: Story = {
  args: {
    state: "error",
    title: "Erro",
    errorMessage: "Nao foi possivel carregar o saldo.",
    onRetry: () => {},
  },
};
