import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "select", options: ["soft", "outline"] },
    type: { control: "select", options: ["success", "warning", "danger", "info"] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const SoftSuccess: Story = {
  args: { title: "Sucesso", children: "Perfil atualizado com sucesso.", type: "success" },
};

export const SoftWarning: Story = {
  args: { title: "Atencao", children: "Sua assinatura expira em 3 dias.", type: "warning" },
};

export const SoftDanger: Story = {
  args: { title: "Erro", children: "Nao foi possivel salvar.", type: "danger" },
};

export const SoftInfo: Story = {
  args: { title: "Informacao", children: "Novos recursos disponiveis.", type: "info" },
};

export const OutlineDanger: Story = {
  args: { variant: "outline", title: "Erro", children: "Nao foi possivel salvar.", type: "danger" },
};

export const Dismissable: Story = {
  args: { title: "Dispensavel", children: "Clique no X para fechar.", type: "info", onClose: () => {} },
};
