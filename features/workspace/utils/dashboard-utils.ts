import type { User } from "@/features/auth/types/auth.types";

export type DashboardLoadingSkeletonKind = "profile" | "room" | "rooms" | "video";

export function getDisplayName(user: User | null) {
  if (!user) {
    return "Student";
  }

  return (
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Student"
  );
}

export function getUserHandle(user: User) {
  if (user.username) {
    return `@${user.username}`;
  }

  if (user.email) {
    return user.email;
  }

  return `ID ${user.externalId}`;
}

export function getInitials(
  source: User | string | null,
  options: { uppercase?: boolean } = {},
) {
  const name = typeof source === "string" ? source : getDisplayName(source);
  const initials =
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2) || "LO";

  return options.uppercase ? initials.toUpperCase() : initials;
}

export function getSearchPlaceholder(pathname: string) {
  if (pathname === "/dashboard") {
    return "Search rooms";
  }

  if (pathname.startsWith("/room/") && !pathname.includes("/video/")) {
    return "Search room videos";
  }

  return null;
}

export function getDashboardLoadingSkeletonKind(
  pathname: string,
): DashboardLoadingSkeletonKind {
  if (pathname === "/profile") {
    return "profile";
  }

  if (pathname.startsWith("/room/") && pathname.includes("/video/")) {
    return "video";
  }

  if (pathname.startsWith("/room/")) {
    return "room";
  }

  return "rooms";
}
