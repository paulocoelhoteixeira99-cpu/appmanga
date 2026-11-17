import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface NavItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
}

function NavItem({ icon, label, active = false, collapsed = false, disabled, className, onClick, ...props }: NavItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-lg transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        collapsed ? "justify-center size-10" : "gap-3 px-3 py-2 w-full text-sm font-medium",
        active
          ? "bg-primary-50 text-primary-700"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        className
      )}
      title={collapsed ? label : undefined}
      {...props}
    >
      <span className="shrink-0 size-5 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

interface NavItemMobileProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

function NavItemMobile({ icon, label, active = false, disabled, className, onClick, ...props }: NavItemMobileProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[64px] transition-colors select-none",
        "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        active ? "text-primary-500" : "text-neutral-500",
        className
      )}
      {...props}
    >
      <span className="size-6 flex items-center justify-center">{icon}</span>
      <span className="text-[10px] font-medium leading-[1.5]">{label}</span>
    </button>
  );
}

export { NavItem, NavItemMobile, type NavItemProps, type NavItemMobileProps };
