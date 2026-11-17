import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toaster } from "./sonner";
import { toast } from "sonner";
import { Button } from "./button";

const meta: Meta<typeof Toaster> = {
  title: "UI/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => toast("Mensagem padrao")}>Default</Button>
          <Button variant="secondary" onClick={() => toast.success("Transacao salva com sucesso!")}>Success</Button>
          <Button variant="secondary" onClick={() => toast.error("Erro ao salvar transacao")}>Error</Button>
          <Button variant="secondary" onClick={() => toast.warning("Limite quase atingido")}>Warning</Button>
          <Button variant="secondary" onClick={() => toast.info("Dica: use categorias")}>Info</Button>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {};
