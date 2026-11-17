import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListItem, ListDivider } from "./list-item";

const LeadingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-neutral-500">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const meta: Meta<typeof ListItem> = {
  title: "UI/ListItem",
  component: ListItem,
  argTypes: {
    size: { control: "select", options: ["md", "lg"] },
    itemStyle: { control: "select", options: ["default", "surface"] },
    interactive: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  args: { title: "Conta corrente", subtitle: "Banco do Brasil", leading: <LeadingIcon /> },
};

export const Large: Story = {
  args: { title: "Cartao de credito", subtitle: "Fatura de outubro", size: "lg", leading: <LeadingIcon />, trailing: <span className="text-sm text-neutral-500">R$ 1.230</span> },
};

export const Surface: Story = {
  args: { title: "Poupanca", subtitle: "Rendimento mensal", itemStyle: "surface", leading: <LeadingIcon /> },
};

export const WithDivider: Story = {
  render: () => (
    <div className="w-80">
      <ListItem title="Item 1" subtitle="Descricao" leading={<LeadingIcon />} />
      <ListDivider />
      <ListItem title="Item 2" subtitle="Descricao" leading={<LeadingIcon />} />
      <ListDivider />
      <ListItem title="Item 3" subtitle="Descricao" leading={<LeadingIcon />} />
    </div>
  ),
};
