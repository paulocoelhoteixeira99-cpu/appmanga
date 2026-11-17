import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    shape: { control: "select", options: ["circle", "rounded"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: { initials: "PU", size: "md" },
};

export const Fallback: Story = {
  args: { size: "md" },
};

export const Rounded: Story = {
  args: { initials: "MG", size: "md", shape: "rounded" },
};

export const ExtraSmall: Story = {
  args: { initials: "M", size: "xs" },
};

export const Large: Story = {
  args: { initials: "JS", size: "lg" },
};
