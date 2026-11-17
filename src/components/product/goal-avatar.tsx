import { cn } from "@/lib/utils/cn";

type GoalAvatarSize = 32 | 48 | 72;
type GoalAvatarContent = "initials" | "icon" | "placeholder";

interface GoalAvatarProps {
  size?: GoalAvatarSize;
  content?: GoalAvatarContent;
  initials?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

const sizeMap: Record<GoalAvatarSize, string> = {
  32: "size-8 text-xs",
  48: "size-12 text-sm",
  72: "size-18 text-lg",
};

const iconSizeMap: Record<GoalAvatarSize, string> = {
  32: "size-4",
  48: "size-5",
  72: "size-7",
};

function GoalAvatar({
  size = 48,
  content = "initials",
  initials,
  icon,
  color,
  className,
}: GoalAvatarProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-full font-semibold leading-[1] select-none shrink-0",
    sizeMap[size],
    className
  );

  if (content === "placeholder") {
    return (
      <div
        className={cn(
          baseClasses,
          "bg-neutral-100 text-neutral-500"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={iconSizeMap[size]}>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
      </div>
    );
  }

  if (content === "icon" && icon) {
    return (
      <div
        className={cn(baseClasses, "bg-primary-50 text-primary-700")}
        style={color ? { backgroundColor: color } : undefined}
      >
        <span className={iconSizeMap[size]}>{icon}</span>
      </div>
    );
  }

  // Initials (default)
  return (
    <div
      className={cn(baseClasses, "bg-primary-50 text-primary-700")}
      style={color ? { backgroundColor: color } : undefined}
    >
      {initials?.slice(0, 2).toUpperCase() || "?"}
    </div>
  );
}

export { GoalAvatar, type GoalAvatarProps, type GoalAvatarSize, type GoalAvatarContent };
