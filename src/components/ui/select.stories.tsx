import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "./select";

const meta: Meta = {
  title: "UI/Select",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma fruta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="maca">Maca</SelectItem>
        <SelectItem value="laranja">Laranja</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma conta" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Contas bancarias</SelectLabel>
          <SelectItem value="nubank">Nubank</SelectItem>
          <SelectItem value="itau">Itau</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Carteiras</SelectLabel>
          <SelectItem value="dinheiro">Dinheiro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Small: Story = {
  render: () => (
    <Select defaultValue="opcao1">
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opcao1">Opcao 1</SelectItem>
        <SelectItem value="opcao2">Opcao 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select>
      <SelectTrigger disabled>
        <SelectValue placeholder="Desabilitado" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">A</SelectItem>
      </SelectContent>
    </Select>
  ),
};
