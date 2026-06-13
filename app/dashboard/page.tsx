import type { Metadata } from "next";

import { DashboardPage } from "@/components/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard | learnOS",
};

export default function Page() {
  return <DashboardPage />;
}
