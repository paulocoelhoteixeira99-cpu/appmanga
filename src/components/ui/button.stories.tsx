import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    loading: { control: "boolean" },
    iconOnly: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Primary", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Tertiary: Story = {
  args: { children: "Tertiary", variant: "tertiary" },
};

export const Destructive: Story = {
  args: { children: "Destructive", variant: "destructive" },
};

export const Small: Story = {
  args: { children: "Small", size: "sm" },
};

export const Large: Story = {
  args: { children: "Large", size: "lg" },
};

export const Loading: Story = {
  args: { children: "Saving...", loading: true },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    ),
  },
};

export const FullWidth: Story = {
  args: { children: "Full width", className: "w-80" },
};
