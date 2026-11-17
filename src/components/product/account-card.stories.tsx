import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountCard } from "./account-card";

const meta: Meta<typeof AccountCard> = {
  title: "Product/AccountCard",
  component: AccountCard,
  argTypes: {
    variant: { control: "select", options: ["default", "elevated"] },
    size: { control: "select", options: ["default", "compact"] },
  },
};

export default meta;
type Story = StoryObj<typeof AccountCard>;

export const Default: Story = {
  args: {
    initials: "BB",
    title: "Banco do Brasil",
    accountType: "Conta corrente",
    value: "R$ 12.450,00",
    supportingText: "Atualizado hoje",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    initials: "NU",
    title: "Nubank",
    accountType: "Conta digital",
    value: "R$ 3.200,00",
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
    initials: "IT",
    title: "Itau",
    accountType: "Poupanca",
    value: "R$ 8.100,00",
  },
};
