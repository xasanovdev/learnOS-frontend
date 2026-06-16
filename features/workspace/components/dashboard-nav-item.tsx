import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function DashboardNavItem({
  href,
  active = false,
  icon: Icon,
  label,
  disabled = false,
}: {
  href?: string;
  active?: boolean;
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
}) {
  const className = cn(
    "flex h-10 w-full items-center gap-3 px-3 text-left transition-colors",
    active
      ? "bg-[#0d0d0c] text-white"
      : "text-[#0d0d0c]/62 hover:bg-[#fff7f1] hover:text-[#0d0d0c]",
    disabled &&
      "cursor-default opacity-55 hover:bg-transparent hover:text-[#0d0d0c]/62",
  );

  const content = (
    <>
      <Icon className="size-4" />
      <span>{label}</span>
    </>
  );

  if (!href || disabled) {
    return (
      <div aria-disabled="true" className={className}>
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
