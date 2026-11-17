import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "./drawer";
import { Button } from "./button";

const meta: Meta = {
  title: "UI/Drawer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button>Abrir drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Nova transacao</DrawerTitle>
          <DrawerDescription>Adicione uma nova transacao ao registro.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-neutral-600">Conteudo do drawer.</p>
        </div>
        <DrawerFooter>
          <Button>Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithSwipeHandle: Story = {
  render: () => (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="secondary">Com swipe handle</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer com handle</DrawerTitle>
          <DrawerDescription>Arraste para baixo para fechar.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-neutral-600">Conteudo aqui.</p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
