import type { Notice } from "@/features/workspace/types/workspace.types";
import { cn } from "@/lib/utils";

export function DashboardNotice({
  notice,
  className,
}: {
  notice: Notice | null;
  className?: string;
}) {
  if (!notice) {
    return null;
  }

  return (
    <div
      className={cn(
        "border px-4 py-3 text-sm font-medium",
        notice.tone === "success"
          ? "border-[#1f7a5a]/20 bg-[#eaf5ef] text-[#1f7a5a]"
          : "border-[#b13f2d]/20 bg-[#fff0ec] text-[#b13f2d]",
        className,
      )}
    >
      {notice.text}
    </div>
  );
}
