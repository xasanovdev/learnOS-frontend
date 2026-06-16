import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "grid gap-4 lg:items-start",
        actions ? "lg:grid-cols-[minmax(0,1fr)_320px]" : "lg:grid-cols-1",
      )}
    >
      <div className="border border-[#0d0d0c] bg-white p-5 shadow-[8px_8px_0_#0d0d0c] md:p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-[#9d6550]">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-normal md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#0d0d0c]/62">
          {description}
        </p>
      </div>
      {actions}
    </section>
  );
}
