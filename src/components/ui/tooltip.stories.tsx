import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
import { Button } from "./button";

const meta: Meta = {
  title: "UI/Tooltip",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="secondary">Passe o mouse</Button>} />
      <TooltipContent>Tooltip de exemplo</TooltipContent>
    </Tooltip>
  ),
};

export const Top: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="secondary">Top</Button>} />
      <TooltipContent side="top">Tooltip no topo</TooltipContent>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="secondary">Bottom</Button>} />
      <TooltipContent side="bottom">Tooltip embaixo</TooltipContent>
    </Tooltip>
  ),
};
