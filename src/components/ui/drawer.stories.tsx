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

export const BottomDefault: Story = {
  name: "Bottom (Default)",
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

export const BottomWithSwipeHandle: Story = {
  name: "Bottom (Swipe Handle)",
  render: () => (
    <Drawer showSwipeHandle placement="bottom">
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

export const RightSmall: Story = {
  name: "Right: Small",
  render: () => (
    <Drawer placement="right" size="sm">
      <DrawerTrigger render={<Button variant="secondary">Right SM</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer lateral pequeno</DrawerTitle>
          <DrawerDescription>Largura: 20rem (320px)</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-neutral-600">Ideal para filtros ou navegacao.</p>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

export const RightMedium: Story = {
  name: "Right: Medium",
  render: () => (
    <Drawer placement="right" size="md">
      <DrawerTrigger render={<Button variant="secondary">Right MD</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer lateral medio</DrawerTitle>
          <DrawerDescription>Largura: 24rem (384px)</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-neutral-600">Espaco para detalhes de transacao.</p>
        </div>
        <DrawerFooter>
          <Button>Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const RightLarge: Story = {
  name: "Right: Large",
  render: () => (
    <Drawer placement="right" size="lg">
      <DrawerTrigger render={<Button variant="secondary">Right LG</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer lateral grande</DrawerTitle>
          <DrawerDescription>Largura: 32rem (512px)</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-neutral-600">Espaco amplo para formularios complexos.</p>
        </div>
        <DrawerFooter>
          <Button>Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
