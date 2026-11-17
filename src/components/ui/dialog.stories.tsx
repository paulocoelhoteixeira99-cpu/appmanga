import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";

const meta: Meta = {
  title: "UI/Dialog",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Abrir dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Titulo do dialog</DialogTitle>
          <DialogDescription>Descricao de suporte para o dialog.</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-neutral-600">Conteudo do dialog aqui.</p>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Confirmar acao</Button>} />
      <DialogContent type="confirmation">
        <DialogHeader>
          <DialogTitle>Confirmar transferencia</DialogTitle>
          <DialogDescription>Deseja transferir R$ 500,00 para a conta poupanca?</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive">Excluir conta</Button>} />
      <DialogContent type="destructive">
        <DialogHeader>
          <DialogTitle>Excluir conta permanentemente?</DialogTitle>
          <DialogDescription>Esta acao nao pode ser desfeita. Todos os seus dados serao removidos.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SizeSmall: Story = {
  name: "Size: Small",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Small (SM)</Button>} />
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Dialog pequeno</DialogTitle>
          <DialogDescription>max-width: sm (384px)</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const SizeMedium: Story = {
  name: "Size: Medium",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Medium (MD)</Button>} />
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Dialog medio</DialogTitle>
          <DialogDescription>max-width: md (448px)</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-neutral-600">Mais espaco para conteudo mais complexo.</p>
      </DialogContent>
    </Dialog>
  ),
};

export const SizeLarge: Story = {
  name: "Size: Large",
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Large (LG)</Button>} />
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Dialog grande</DialogTitle>
          <DialogDescription>max-width: lg (512px)</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-neutral-600">Ideal para formularios ou conteudo extenso.</p>
      </DialogContent>
    </Dialog>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Sem fechar</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Dialog sem botao fechar</DialogTitle>
          <DialogDescription>Use o footer para fechar.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
};
