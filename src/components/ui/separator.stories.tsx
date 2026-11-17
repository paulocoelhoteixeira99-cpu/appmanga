import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    variant: { control: "radio", options: ["default", "subtle"] },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-64">
      <p className="text-sm text-neutral-600 mb-2">Acima</p>
      <Separator {...args} />
      <p className="text-sm text-neutral-600 mt-2">Abaixo</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex items-center gap-2 h-8">
      <span className="text-sm text-neutral-600">Esquerda</span>
      <Separator {...args} />
      <span className="text-sm text-neutral-600">Direita</span>
    </div>
  ),
};

export const Subtle: Story = {
  args: { variant: "subtle" },
  render: (args) => (
    <div className="w-64">
      <p className="text-sm text-neutral-600 mb-2">Separador sutil</p>
      <Separator {...args} />
      <p className="text-sm text-neutral-600 mt-2">Menos visivel</p>
    </div>
  ),
};
