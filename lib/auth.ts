import { fetcher } from "./fetcher";

export async function verifyPasscode(passcode: string): Promise<void> {
  await fetcher("/auth/passcodes/verify", {
    method: "POST",
    body: JSON.stringify({ passcode }),
  });
}

export async function logout(): Promise<void> {
  await fetcher("/auth/logout", { method: "POST" });
}
