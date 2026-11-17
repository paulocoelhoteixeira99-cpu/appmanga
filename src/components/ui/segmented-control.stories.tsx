import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SegmentedControl, SegmentItem } from "./segmented-control";

const meta: Meta<typeof SegmentedControl> = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const TwoItems: Story = {
  render: () => {
    const [value, setValue] = useState("mensal");
    return (
      <SegmentedControl value={value} onChange={setValue}>
        <SegmentItem value="mensal">Mensal</SegmentItem>
        <SegmentItem value="anual">Anual</SegmentItem>
      </SegmentedControl>
    );
  },
};

export const ThreeItems: Story = {
  render: () => {
    const [value, setValue] = useState("semana");
    return (
      <SegmentedControl value={value} onChange={setValue}>
        <SegmentItem value="semana">Semana</SegmentItem>
        <SegmentItem value="mes">Mes</SegmentItem>
        <SegmentItem value="ano">Ano</SegmentItem>
      </SegmentedControl>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("ativo");
    return (
      <SegmentedControl value={value} onChange={setValue}>
        <SegmentItem value="ativo">Ativo</SegmentItem>
        <SegmentItem value="inativo">Inativo</SegmentItem>
        <SegmentItem value="bloqueado" disabled>Bloqueado</SegmentItem>
      </SegmentedControl>
    );
  },
};
