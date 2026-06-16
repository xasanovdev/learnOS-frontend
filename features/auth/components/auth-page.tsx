"use client";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  passcodeSchema,
  type PasscodeForm,
} from "@/features/auth/schemas/auth.schema";
import { verifyPasscode } from "@/features/auth/services/auth.service";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

type AuthPageProps = {
  nextPath?: string;
};

function getSafeNextPath(nextPath: string | undefined) {
  if (!nextPath?.startsWith("/") || nextPath.startsWith("//")) {
    return "/dashboard";
  }

  return nextPath;
}

export function AuthPage({ nextPath }: AuthPageProps) {
  const router = useRouter();
  const form = useForm<PasscodeForm>({
    defaultValues: {
      passcode: "",
    },
  });

  async function handleSubmit(values: PasscodeForm) {
    const result = passcodeSchema.safeParse(values);

    if (!result.success) {
      form.setError("passcode", {
        message: result.error.issues[0]?.message ?? "Invalid passcode.",
      });
      return;
    }

    try {
      await verifyPasscode(result.data.passcode);
      router.push(getSafeNextPath(nextPath));
      router.refresh();
    } catch {
      form.setError("passcode", {
        message: "That passcode could not be verified.",
      });
    }
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#fffdf9] text-[#0d0d0c]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[linear-gradient(180deg,#f4ded0_0%,#fffdf9_62%,#fffdf9_100%)]" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#0d0d0c 1px, transparent 1px), linear-gradient(90deg, #0d0d0c 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 sm:px-10">
        <Link href="/" className="flex items-center">
          <BrandLogo priority className="w-36" />
        </Link>
        <Link
          href="/"
          className="rounded-full border border-[#0d0d0c]/14 bg-white/50 px-5 py-2.5 text-sm font-semibold text-[#0d0d0c] shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          Back home
        </Link>
      </header>

      <section className="mx-auto flex min-h-[calc(100dvh-104px)] w-full max-w-7xl items-center justify-center px-6 pb-16 pt-6 sm:px-10">
        <div className="relative w-full max-w-md">
          <div className="absolute -right-3 -top-3 hidden h-full w-full border border-[#0d0d0c] bg-[#f4ded0] lg:block" />
          <div className="relative border border-[#0d0d0c] bg-white p-6 shadow-[12px_12px_0_#0d0d0c] sm:p-8">
            <div className="mb-10">
              <p className="mb-3 text-sm font-semibold uppercase text-[#9d6550]">
                Login
              </p>
              <h2 className="text-3xl font-semibold tracking-normal">
                Welcome back
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#0d0d0c]/62">
                Enter your 6-digit passcode to unlock your workspace.
              </p>
            </div>

            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <Controller
                name="passcode"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="auth-passcode">
                      Secure passcode
                    </FieldLabel>

                    <InputOTP
                      {...field}
                      id="auth-passcode"
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      aria-invalid={fieldState.invalid}
                      containerClassName="gap-3"
                      disabled={form.formState.isSubmitting}
                    >
                      <InputOTPGroup className="rounded-lg">
                        <InputOTPSlot
                          index={0}
                          className="size-12 rounded-none bg-[#fffdf9] text-base first:rounded-l-lg"
                        />
                        <InputOTPSlot
                          index={1}
                          className="size-12 rounded-none bg-[#fffdf9] text-base"
                        />
                        <InputOTPSlot
                          index={2}
                          className="size-12 rounded-none bg-[#fffdf9] text-base last:rounded-r-lg"
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator className="text-[#0d0d0c]/42" />
                      <InputOTPGroup className="rounded-lg">
                        <InputOTPSlot
                          index={3}
                          className="size-12 rounded-none bg-[#fffdf9] text-base first:rounded-l-lg"
                        />
                        <InputOTPSlot
                          index={4}
                          className="size-12 rounded-none bg-[#fffdf9] text-base"
                        />
                        <InputOTPSlot
                          index={5}
                          className="size-12 rounded-none bg-[#fffdf9] text-base last:rounded-r-lg"
                        />
                      </InputOTPGroup>
                    </InputOTP>

                    <FieldDescription className="text-[#0d0d0c]/55">
                      Use the 6-digit code you received.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-md bg-[#0d0d0c] text-white hover:bg-[#2a2927]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Verifying..." : "Continue"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
