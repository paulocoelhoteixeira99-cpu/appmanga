import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton, SkeletonText, SkeletonCircle } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangle: Story = {
  args: { className: "h-10 w-48" },
};

export const Text: Story = {
  render: () => <SkeletonText className="w-64" />,
};

export const Circle: Story = {
  render: () => <SkeletonCircle />,
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 w-80">
      <SkeletonCircle />
      <div className="flex-1">
        <SkeletonText />
      </div>
    </div>
  ),
};
