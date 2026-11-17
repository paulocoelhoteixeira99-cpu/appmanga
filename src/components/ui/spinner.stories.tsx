import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["primary", "neutral", "inverse"] },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Primary: Story = {
  args: { variant: "primary", size: "md" },
};

export const Neutral: Story = {
  args: { variant: "neutral", size: "md" },
};

export const Inverse: Story = {
  args: { variant: "inverse", size: "md" },
  parameters: { backgrounds: { default: "Night" } },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};
