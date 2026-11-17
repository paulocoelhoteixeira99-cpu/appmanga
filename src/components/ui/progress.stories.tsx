import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Progress, ProgressLabel, ProgressValue } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["primary", "neutral", "success"] },
    height: { control: "radio", options: [4, 8, 12] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
};

export const WithLabel: Story = {
  args: { value: 75 },
  render: (args) => (
    <Progress {...args}>
      <ProgressLabel>Meta mensal</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
};

export const Success: Story = {
  args: { value: 100, variant: "success" },
};

export const Neutral: Story = {
  args: { value: 40, variant: "neutral" },
};

export const Thin: Story = {
  args: { value: 50, height: 4 },
};

export const Thick: Story = {
  args: { value: 80, height: 12 },
};
