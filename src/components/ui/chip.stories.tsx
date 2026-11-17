import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  component: Chip,
  argTypes: {
    variant: { control: "select", options: ["filter", "input"] },
    size: { control: "select", options: ["sm", "md"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const FilterUnselected: Story = {
  args: { children: "Alimentacao", variant: "filter" },
};

export const FilterSelected: Story = {
  args: { children: "Alimentacao", variant: "filter", selected: true },
};

export const InputWithRemove: Story = {
  args: { children: "Nubank", variant: "input", onRemove: () => {} },
};

export const SmallSelected: Story = {
  args: { children: "Small", size: "sm", selected: true },
};

export const Disabled: Story = {
  args: { children: "Desabilitado", disabled: true },
};
