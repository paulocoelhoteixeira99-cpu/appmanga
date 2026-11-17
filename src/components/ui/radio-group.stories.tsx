import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioGroup, RadioItem } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    value: "pix",
    children: (
      <>
        <RadioItem value="pix" label="Pix" description="Transferencia instantanea" />
        <RadioItem value="ted" label="TED" description="Ate 1 dia util" />
        <RadioItem value="boleto" label="Boleto" description="Ate 3 dias uteis" />
      </>
    ),
  },
};

export const WithDisabled: Story = {
  args: {
    value: "mensal",
    children: (
      <>
        <RadioItem value="mensal" label="Mensal" />
        <RadioItem value="trimestral" label="Trimestral" />
        <RadioItem value="anual" label="Anual" disabled />
      </>
    ),
  },
};
