import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FAB } from "./fab";

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const meta: Meta<typeof FAB> = {
  title: "UI/FAB",
  component: FAB,
  argTypes: {
    size: { control: "select", options: ["sm", "default", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    icon: <PlusIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof FAB>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
