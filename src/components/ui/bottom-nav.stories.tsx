import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BottomNav, BottomNavItem } from "./bottom-nav";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
  </svg>
);

const meta: Meta<typeof BottomNav> = {
  title: "UI/BottomNav",
  component: BottomNav,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  render: () => (
    <div className="relative h-20">
      <BottomNav>
        <BottomNavItem icon={<HomeIcon />} label="Inicio" active />
        <BottomNavItem icon={<WalletIcon />} label="Carteira" />
        <BottomNavItem icon={<WalletIcon />} label="Metas" />
        <BottomNavItem icon={<WalletIcon />} label="Perfil" />
      </BottomNav>
    </div>
  ),
};
