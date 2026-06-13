"use client";

import { verifyPasscode } from "@/lib/auth";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";

const passcodeSchema = z.object({
  passcode: z.string().length(6, "Enter the 6-digit passcode."),
});

type PasscodeForm = z.infer<typeof passcodeSchema>;

export function AuthPage() {
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
      router.push("/");
      router.refresh();
    } catch {
      form.setError("passcode", {
        message: "That passcode could not be verified.",
      });
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-6 py-10 sm:px-10">
      <div className="w-full max-w-sm">
        <div className="mb-10 space-y-2">
          <h1 className="text-2xl font-semibold tracking-normal">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your passcode to unlock your workspace.
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
                <FieldLabel htmlFor="auth-passcode">Secure passcode</FieldLabel>

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
                      className="size-12 rounded-none bg-background text-base first:rounded-l-lg"
                    />
                    <InputOTPSlot
                      index={1}
                      className="size-12 rounded-none bg-background text-base"
                    />
                    <InputOTPSlot
                      index={2}
                      className="size-12 rounded-none bg-background text-base last:rounded-r-lg"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-muted-foreground" />
                  <InputOTPGroup className="rounded-lg">
                    <InputOTPSlot
                      index={3}
                      className="size-12 rounded-none bg-background text-base first:rounded-l-lg"
                    />
                    <InputOTPSlot
                      index={4}
                      className="size-12 rounded-none bg-background text-base"
                    />
                    <InputOTPSlot
                      index={5}
                      className="size-12 rounded-none bg-background text-base last:rounded-r-lg"
                    />
                  </InputOTPGroup>
                </InputOTP>

                <FieldDescription>
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
            className="w-full rounded-lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
