import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "Product/Logo",
  component: Logo,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    type: { control: "select", options: ["logomarca", "simbolo"] },
    version: { control: "select", options: ["gradiente", "flat", "clara", "escura"] },
    brand: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: { size: "lg" },
};

export const LogomarcaGradiente: Story = {
  name: "Logomarca Gradiente",
  args: { type: "logomarca", version: "gradiente", size: "lg" },
};

export const LogomarcaFlat: Story = {
  name: "Logomarca Flat",
  args: { type: "logomarca", version: "flat", size: "lg" },
};

export const LogomarcaClara: Story = {
  name: "Logomarca Clara",
  args: { type: "logomarca", version: "clara", size: "lg" },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-neutral-800 p-8">
        <Story />
      </div>
    ),
  ],
};

export const LogomarcaEscura: Story = {
  name: "Logomarca Escura",
  args: { type: "logomarca", version: "escura", size: "lg" },
};

export const LogomarcaBrandClara: Story = {
  name: "Logomarca Brand Clara",
  args: { type: "logomarca", version: "clara", brand: true, size: "lg" },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-neutral-800 p-8">
        <Story />
      </div>
    ),
  ],
};

export const LogomarcaBrandEscura: Story = {
  name: "Logomarca Brand Escura",
  args: { type: "logomarca", version: "escura", brand: true, size: "lg" },
};

export const SimboloGradiente: Story = {
  name: "Simbolo Gradiente",
  args: { type: "simbolo", version: "gradiente", size: "lg" },
};

export const SimboloFlat: Story = {
  name: "Simbolo Flat",
  args: { type: "simbolo", version: "flat", size: "lg" },
};

export const SimboloClara: Story = {
  name: "Simbolo Clara",
  args: { type: "simbolo", version: "clara", size: "lg", brand: false },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-neutral-800 p-8">
        <Story />
      </div>
    ),
  ],
};

export const SimboloBrandClara: Story = {
  name: "Simbolo Brand Clara",
  args: { type: "simbolo", version: "clara", brand: true, size: "lg" },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-neutral-800 p-8">
        <Story />
      </div>
    ),
  ],
};

export const SimboloEscura: Story = {
  name: "Simbolo Escura",
  args: { type: "simbolo", version: "escura", size: "lg", brand: false },
};

export const AllSizes: Story = {
  name: "Todos os tamanhos",
  render: () => (
    <div className="flex items-end gap-6">
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
    </div>
  ),
};
