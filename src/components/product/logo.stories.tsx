import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "Product/Logo",
  component: Logo,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Small: Story = {
  args: { size: "sm" },
};

export const Medium: Story = {
  args: { size: "md" },
};

export const Large: Story = {
  args: { size: "lg" },
};
