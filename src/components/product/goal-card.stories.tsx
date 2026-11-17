import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GoalCard } from "./goal-card";

const meta: Meta<typeof GoalCard> = {
  title: "Product/GoalCard",
  component: GoalCard,
  argTypes: {
    size: { control: "select", options: ["default", "compact", "featured"] },
    variant: { control: "select", options: ["default", "elevated"] },
  },
};

export default meta;
type Story = StoryObj<typeof GoalCard>;

export const Default: Story = {
  args: {
    initials: "RV",
    title: "Reserva de viagem",
    value: "R$ 4.500,00",
    target: "Meta: R$ 5.000,00",
    percentage: 90,
    status: "Em andamento",
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
    initials: "RE",
    title: "Reserva de emergencia",
    value: "R$ 12.000,00",
    target: "Meta: R$ 20.000,00",
    percentage: 60,
  },
};

export const Featured: Story = {
  args: {
    size: "featured",
    initials: "CP",
    title: "Casa propria",
    value: "R$ 50.000,00",
    target: "Meta: R$ 200.000,00",
    percentage: 25,
    status: "Iniciada",
    supportingText: "Faltam R$ 150.000,00",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    initials: "CR",
    title: "Carro novo",
    value: "R$ 35.000,00",
    target: "Meta: R$ 50.000,00",
    percentage: 70,
  },
};

export const Complete: Story = {
  args: {
    initials: "FE",
    title: "Fundo de emergencia",
    value: "R$ 10.000,00",
    target: "Meta: R$ 10.000,00",
    percentage: 100,
    status: "Concluida",
  },
};
