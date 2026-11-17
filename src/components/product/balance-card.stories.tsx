import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BalanceCard } from "./balance-card";

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const meta: Meta<typeof BalanceCard> = {
  title: "Product/BalanceCard",
  component: BalanceCard,
  argTypes: {
    style: { control: "select", options: ["default", "subtle", "brand"] },
    size: { control: "select", options: ["default", "compact", "featured"] },
  },
};

export default meta;
type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  args: {
    icon: <WalletIcon />,
    title: "Saldo total",
    value: "R$ 23.750,00",
    supportingText: "Atualizado agora",
  },
};

export const Subtle: Story = {
  args: {
    style: "subtle",
    icon: <WalletIcon />,
    title: "Investimentos",
    value: "R$ 15.000,00",
  },
};

export const Brand: Story = {
  args: {
    style: "brand",
    icon: <WalletIcon />,
    title: "Saldo disponivel",
    value: "R$ 12.450,00",
    supportingText: "Atualizado hoje",
  },
};

export const CompactSize: Story = {
  args: {
    size: "compact",
    icon: <WalletIcon />,
    title: "Poupanca",
    value: "R$ 8.100,00",
  },
};

export const Featured: Story = {
  args: {
    size: "featured",
    style: "brand",
    icon: <WalletIcon />,
    title: "Patrimonio total",
    value: "R$ 45.000,00",
    supportingText: "Consolidado de todas as contas",
  },
};
