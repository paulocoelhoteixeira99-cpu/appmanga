import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavItem, NavItemMobile } from "./nav-item";

const NavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const meta: Meta<typeof NavItem> = {
  title: "UI/NavItem",
  component: NavItem,
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: { icon: <NavIcon />, label: "Inicio" },
};

export const Active: Story = {
  args: { icon: <NavIcon />, label: "Inicio", active: true },
};

export const Collapsed: Story = {
  args: { icon: <NavIcon />, label: "Inicio", collapsed: true },
};

export const CollapsedActive: Story = {
  args: { icon: <NavIcon />, label: "Inicio", collapsed: true, active: true },
};

export const Disabled: Story = {
  args: { icon: <NavIcon />, label: "Bloqueado", disabled: true },
};

export const MobileDefault: Story = {
  render: () => <NavItemMobile icon={<NavIcon />} label="Inicio" />,
};

export const MobileActive: Story = {
  render: () => <NavItemMobile icon={<NavIcon />} label="Inicio" active />,
};
