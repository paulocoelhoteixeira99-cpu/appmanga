import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardContent, CardFooter } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    variant: { control: "select", options: ["default", "elevated", "outline"] },
    interactive: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>Default</CardHeader>
        <CardContent>Superficie basica sem sombra.</CardContent>
        <CardFooter>Atualizado hoje</CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <>
        <CardHeader>Elevated</CardHeader>
        <CardContent>Com sombra sutil para destaque.</CardContent>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: (
      <>
        <CardHeader>Outline</CardHeader>
        <CardContent>Com borda ao inves de sombra.</CardContent>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    onClick: () => alert("Card clicado!"),
    children: (
      <>
        <CardHeader>Interactive</CardHeader>
        <CardContent>Clique neste card.</CardContent>
      </>
    ),
  },
};
