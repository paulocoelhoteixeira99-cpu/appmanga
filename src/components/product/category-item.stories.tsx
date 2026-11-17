import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryItem } from "./category-item";

const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
  </svg>
);

const meta: Meta<typeof CategoryItem> = {
  title: "Product/CategoryItem",
  component: CategoryItem,
};

export default meta;
type Story = StoryObj<typeof CategoryItem>;

export const Default: Story = {
  args: {
    icon: <CategoryIcon />,
    name: "Alimentacao",
    subtitle: "12 transacoes",
    value: "R$ 1.230,00",
  },
};

export const WithBudget: Story = {
  args: {
    icon: <CategoryIcon />,
    name: "Transporte",
    subtitle: "8 transacoes",
    value: "R$ 450,00",
    budget: 500,
    spent: 450,
  },
};

export const OverBudget: Story = {
  args: {
    icon: <CategoryIcon />,
    name: "Lazer",
    subtitle: "15 transacoes",
    value: "R$ 800,00",
    budget: 600,
    spent: 800,
  },
};

export const Selected: Story = {
  args: {
    icon: <CategoryIcon />,
    name: "Educacao",
    subtitle: "3 transacoes",
    value: "R$ 350,00",
    selected: true,
  },
};
