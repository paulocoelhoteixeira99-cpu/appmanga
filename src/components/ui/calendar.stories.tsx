import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  argTypes: {
    density: { control: "select", options: ["default", "compact"] },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <Calendar value={date} onChange={setDate} />;
  },
};

export const Compact: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return <Calendar value={date} onChange={setDate} density="compact" />;
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />;
  },
};

export const NoSelection: Story = {
  render: () => <Calendar value={null} />,
};
