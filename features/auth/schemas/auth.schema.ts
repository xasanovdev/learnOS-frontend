import z from "zod";

export const passcodeSchema = z.object({
  passcode: z.string().length(6, "Enter the 6-digit passcode."),
});

export type PasscodeForm = z.infer<typeof passcodeSchema>;
