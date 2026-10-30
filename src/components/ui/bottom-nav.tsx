"use client";

import { cn } from "@/lib/utils/cn";

interface BottomNavProps {
  className?: string;
  children: React.ReactNode;
}

interface BottomNavItemProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}

function BottomNav({ className, children }: BottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t border-neutral-200 bg-white px-2 pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      {children}
    </nav>
  );
}

function BottomNavItem({ className, icon, label, active = false, onClick }: BottomNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] transition-colors",
        active ? "text-primary-500" : "text-neutral-500",
        "hover:text-primary-500",
        className
      )}
    >
      <div className="size-6">{icon}</div>
      <span className="text-[10px] font-medium leading-[1.5]">{label}</span>
    </button>
  );
}

export { BottomNav, BottomNavItem, type BottomNavProps, type BottomNavItemProps };
