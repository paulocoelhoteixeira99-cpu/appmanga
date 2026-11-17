import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
}

function Sidebar({ collapsed = false, className, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-full bg-[var(--color-surface-default)] flex flex-col gap-6 transition-[width] duration-200",
        collapsed ? "w-[72px] items-center px-3.5 py-6" : "w-[260px] px-4 py-6",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export { Sidebar, type SidebarProps };
