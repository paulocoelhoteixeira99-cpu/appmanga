import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField } from "./text-field";

const meta: Meta<typeof TextField> = {
  title: "UI/TextField",
  component: TextField,
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "tel", "number"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { label: "Nome", placeholder: "Digite seu nome", helperText: "Texto de apoio" },
};

export const WithError: Story = {
  args: { label: "Telefone", type: "tel", value: "(11) 9999", error: "Telefone deve ter 11 digitos." },
};

export const Disabled: Story = {
  args: { label: "E-mail", value: "usuario@manga.com", disabled: true, helperText: "Nao pode ser alterado." },
};

export const Required: Story = {
  args: { label: "Senha", type: "password", placeholder: "Minimo 6 caracteres", required: true },
};
