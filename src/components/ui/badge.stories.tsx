import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  argTypes: {
    variant: { control: "select", options: ["soft", "outline"] },
    tone: { control: "select", options: ["neutral", "success", "warning", "danger", "info"] },
    size: { control: "select", options: ["sm", "md"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const SoftNeutral: Story = {
  args: { children: "Neutro", variant: "soft", tone: "neutral" },
};

export const SoftSuccess: Story = {
  args: { children: "Sucesso", variant: "soft", tone: "success" },
};

export const SoftWarning: Story = {
  args: { children: "Atencao", variant: "soft", tone: "warning" },
};

export const SoftDanger: Story = {
  args: { children: "Erro", variant: "soft", tone: "danger" },
};

export const OutlineInfo: Story = {
  args: { children: "Info", variant: "outline", tone: "info" },
};

export const Medium: Story = {
  args: { children: "Medium", size: "md", tone: "success" },
};
