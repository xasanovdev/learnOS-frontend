import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AuthPage } from "@/features/auth/components/auth-page";

const ACCESS_TOKEN_COOKIE_NAME = "access_token";

type AuthRouteProps = {
  searchParams: Promise<{
    next?: string | string[];
  }>;
};

function getSafeNextPath(nextPath: string | undefined) {
  if (!nextPath?.startsWith("/") || nextPath.startsWith("//")) {
    return "/dashboard";
  }

  if (nextPath.startsWith("/auth")) {
    return "/dashboard";
  }

  return nextPath;
}

export default async function Page({ searchParams }: AuthRouteProps) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : undefined;
  const cookieStore = await cookies();

  if (cookieStore.has(ACCESS_TOKEN_COOKIE_NAME)) {
    redirect(getSafeNextPath(nextPath));
  }

  return <AuthPage nextPath={nextPath} />;
}
