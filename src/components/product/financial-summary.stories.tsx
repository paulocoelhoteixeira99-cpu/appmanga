import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FinancialSummary } from "./financial-summary";

const SummaryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
  </svg>
);

const meta: Meta<typeof FinancialSummary> = {
  title: "Product/FinancialSummary",
  component: FinancialSummary,
  argTypes: {
    variant: { control: "select", options: ["default", "embedded"] },
  },
};

export default meta;
type Story = StoryObj<typeof FinancialSummary>;

export const Default: Story = {
  args: {
    icon: <SummaryIcon />,
    title: "Resumo financeiro",
    period: "Novembro 2026",
    primaryLabel: "Resultado do periodo",
    primaryValue: "R$ 2.254,10",
    receitasValue: "R$ 5.000,00",
    despesasValue: "R$ 2.745,90",
    supportingText: "Voce economizou 45% da sua receita",
  },
};

export const Embedded: Story = {
  args: {
    variant: "embedded",
    title: "Outubro 2026",
    receitasValue: "R$ 4.800,00",
    despesasValue: "R$ 3.100,00",
  },
};

export const WithoutPrimary: Story = {
  args: {
    icon: <SummaryIcon />,
    title: "Resumo mensal",
    period: "Setembro 2026",
    receitasValue: "R$ 5.200,00",
    despesasValue: "R$ 4.800,00",
  },
};
