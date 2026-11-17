import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MangaInsights } from "./manga-insights";

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
  </svg>
);

const meta: Meta<typeof MangaInsights> = {
  title: "Product/MangaInsights",
  component: MangaInsights,
  argTypes: {
    size: { control: "select", options: ["default", "compact"] },
    state: { control: "select", options: ["default", "loading", "error"] },
  },
};

export default meta;
type Story = StoryObj<typeof MangaInsights>;

export const Default: Story = {
  args: {
    icon: <ChartIcon />,
    title: "Gastos acima da media",
    description: "Seus gastos com alimentacao estao 23% acima da sua media dos ultimos 3 meses.",
    indicator: { label: "vs media 3 meses", value: "+23%", tone: "negative" },
    actions: [
      { label: "Ver detalhes", onClick: () => {} },
      { label: "Ignorar", onClick: () => {} },
    ],
  },
};

export const Positive: Story = {
  args: {
    icon: <ChartIcon />,
    title: "Meta quase concluida",
    description: "Sua reserva de viagem esta a R$ 500 de ser atingida.",
    indicator: { label: "progresso", value: "95%", tone: "positive" },
    actions: [{ label: "Ver meta", onClick: () => {} }],
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
    icon: <ChartIcon />,
    title: "Economia do mes",
    description: "Voce economizou R$ 350 este mes.",
    indicator: { label: "vs mes anterior", value: "+12%", tone: "positive" },
  },
};

export const Loading: Story = {
  args: { state: "loading", title: "", description: "" },
};

export const Error: Story = {
  args: {
    state: "error",
    icon: <ChartIcon />,
    title: "Erro ao carregar",
    description: "Nao foi possivel carregar o insight.",
    actions: [{ label: "Tentar novamente", onClick: () => {} }],
  },
};
