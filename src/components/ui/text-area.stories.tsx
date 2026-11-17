import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextArea } from "./text-area";

const meta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  component: TextArea,
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: { label: "Descricao", placeholder: "Digite uma descricao", helperText: "Texto de apoio" },
};

export const WithError: Story = {
  args: { label: "Observacao", value: "Texto curto", error: "Minimo de 20 caracteres." },
};

export const Disabled: Story = {
  args: { label: "Notas", value: "Conteudo bloqueado", disabled: true },
};

export const Required: Story = {
  args: { label: "Motivo", placeholder: "Explique o motivo", required: true },
};
