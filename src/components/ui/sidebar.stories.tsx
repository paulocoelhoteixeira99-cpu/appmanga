import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar } from "./sidebar";
import { NavItem } from "./nav-item";

const NavIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Expanded: Story = {
  render: () => (
    <div className="h-96">
      <Sidebar>
        <NavItem icon={<NavIcon />} label="Inicio" active />
        <NavItem icon={<NavIcon />} label="Transacoes" />
        <NavItem icon={<NavIcon />} label="Metas" />
        <NavItem icon={<NavIcon />} label="Configuracoes" />
      </Sidebar>
    </div>
  ),
};

export const CollapsedSidebar: Story = {
  render: () => (
    <div className="h-96">
      <Sidebar collapsed>
        <NavItem icon={<NavIcon />} label="Inicio" active collapsed />
        <NavItem icon={<NavIcon />} label="Transacoes" collapsed />
        <NavItem icon={<NavIcon />} label="Metas" collapsed />
        <NavItem icon={<NavIcon />} label="Config" collapsed />
      </Sidebar>
    </div>
  ),
};
