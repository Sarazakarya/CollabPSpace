import { z } from "zod";

export const forgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired"))
      .email(t("auth.validation.emailInvalid")),
  });

export const verifyResetOtpSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired"))
      .email(t("auth.validation.emailInvalid")),

    otp: z
      .string()
      .min(1, t("auth.validation.otpRequired"))
      .length(6, t("auth.validation.otpLength"))
      .regex(/^\d{6}$/, t("auth.validation.otpLength")),
  });

export const resetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z
        .string()
        .min(1, t("auth.validation.emailRequired"))
        .email(t("auth.validation.emailInvalid")),

      otp: z
        .string()
        .min(1, t("auth.validation.otpRequired"))
        .length(6, t("auth.validation.otpLength"))
        .regex(/^\d{6}$/, t("auth.validation.otpLength")),

      password: z.string().min(8, t("auth.validation.passwordMinLength")),

      password_confirmation: z
        .string()
        .min(1, t("auth.validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("auth.validation.passwordsDoNotMatch"),
      path: ["password_confirmation"],
    });

export type ForgotPasswordValues = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;

export type VerifyResetOtpValues = z.infer<
  ReturnType<typeof verifyResetOtpSchema>
>;

export type ResetPasswordValues = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
