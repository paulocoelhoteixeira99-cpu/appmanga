import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { DatePicker } from "./date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <DatePicker value={date} onChange={setDate} label="Data" helperText="Selecione uma data" />;
  },
};

export const Small: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <DatePicker value={date} onChange={setDate} size="sm" label="Data" />;
  },
};

export const Large: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return <DatePicker value={date} onChange={setDate} size="lg" label="Data de nascimento" />;
  },
};

export const WithError: Story = {
  args: { label: "Vencimento", error: "Data obrigatoria", size: "md" },
};

export const Disabled: Story = {
  args: { label: "Data fixa", value: new Date(2026, 0, 15), disabled: true },
};
