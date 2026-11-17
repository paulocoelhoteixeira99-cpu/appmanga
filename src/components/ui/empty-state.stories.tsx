import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./empty-state";

const EmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
    <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
  </svg>
);

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  argTypes: {
    size: { control: "select", options: ["default", "compact"] },
    emptyStateStyle: { control: "select", options: ["neutral", "surface"] },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <EmptyIcon />,
    title: "Nenhuma transacao",
    description: "Adicione sua primeira transacao para comecar.",
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
    title: "Sem resultados",
    description: "Tente outro filtro.",
  },
};

export const Surface: Story = {
  args: {
    emptyStateStyle: "surface",
    icon: <EmptyIcon />,
    title: "Sem metas",
    description: "Crie uma meta para acompanhar seu progresso.",
  },
};
