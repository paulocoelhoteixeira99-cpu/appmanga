import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TransactionItem } from "./transaction-item";

const TxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
  </svg>
);

const meta: Meta<typeof TransactionItem> = {
  title: "Product/TransactionItem",
  component: TransactionItem,
  argTypes: {
    type: { control: "select", options: ["income", "expense", "transfer"] },
    size: { control: "select", options: ["default", "compact"] },
    itemStyle: { control: "select", options: ["default", "surface"] },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionItem>;

export const Expense: Story = {
  args: {
    icon: <TxIcon />,
    title: "Supermercado",
    subtitle: "Alimentacao",
    value: "R$ 245,90",
    type: "expense",
  },
};

export const Income: Story = {
  args: {
    icon: <TxIcon />,
    title: "Salario",
    subtitle: "Empresa XYZ",
    value: "R$ 5.000,00",
    type: "income",
  },
};

export const Transfer: Story = {
  args: {
    icon: <TxIcon />,
    title: "Transferencia",
    subtitle: "Para poupanca",
    value: "R$ 1.000,00",
    type: "transfer",
  },
};

export const CompactExpense: Story = {
  args: {
    icon: <TxIcon />,
    title: "Uber",
    subtitle: "Transporte",
    value: "R$ 32,00",
    type: "expense",
    size: "compact",
  },
};

export const SurfaceStyle: Story = {
  args: {
    icon: <TxIcon />,
    title: "Netflix",
    subtitle: "Entretenimento",
    value: "R$ 39,90",
    type: "expense",
    itemStyle: "surface",
  },
};
