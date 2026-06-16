import type { ReactNode } from "react";

export function DashboardStateMessage({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center border border-dashed border-[#0d0d0c]/18 bg-white px-6 text-center">
      <p className="text-lg font-semibold text-[#0d0d0c]">{title}</p>
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-6 text-[#0d0d0c]/56">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
