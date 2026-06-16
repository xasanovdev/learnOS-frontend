"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { DashboardSearchField } from "@/features/workspace/components/dashboard-search-field";
import { getSearchPlaceholder } from "@/features/workspace/utils/dashboard-utils";

export function WorkspaceHeaderSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const placeholder = getSearchPlaceholder(pathname);

  if (!placeholder) {
    return null;
  }

  return (
    <DashboardSearchField
      value={searchParams.get("q") ?? ""}
      onChange={(value) => {
        const nextSearchParams = new URLSearchParams(searchParams.toString());
        const normalizedValue = value.trim();

        if (normalizedValue) {
          nextSearchParams.set("q", normalizedValue);
        } else {
          nextSearchParams.delete("q");
        }

        const query = nextSearchParams.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      }}
      placeholder={placeholder}
    />
  );
}
