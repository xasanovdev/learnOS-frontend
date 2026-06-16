"use client";

import { useSearchParams } from "next/navigation";

import { DashboardOverviewContent } from "./dashboard-overview-content";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { getDisplayName } from "@/features/workspace/utils/dashboard-utils";

export function DashboardPage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();

  return (
    <DashboardOverviewContent
      displayName={getDisplayName(user)}
      searchQuery={searchParams.get("q") ?? ""}
    />
  );
}
