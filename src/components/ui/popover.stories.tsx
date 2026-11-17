import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "./popover";
import { Button } from "./button";

const meta: Meta = {
  title: "UI/Popover",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary">Abrir popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Detalhes</PopoverTitle>
          <PopoverDescription>Informacoes adicionais sobre este item.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary">Info</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Resumo financeiro</PopoverTitle>
          <PopoverDescription>Receitas e despesas do mes atual.</PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Receitas</span>
          <span className="font-semibold text-success-500">R$ 5.000</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Despesas</span>
          <span className="font-semibold text-error-500">R$ 3.200</span>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
