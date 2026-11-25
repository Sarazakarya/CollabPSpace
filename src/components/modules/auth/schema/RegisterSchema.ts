import { z } from "zod";

export const RegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(1, t("auth.errors.nameMin")),
      email: z
        .string()
        .min(1, t("auth.errors.emailRequired"))
        .email(t("auth.errors.emailInvalid")),
      password: z.string().min(6, t("auth.errors.passwordMin")),
      password_confirmation: z
        .string()
        .min(1, t("auth.errors.confirmRequired")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("auth.errors.passwordsMismatch"),
      path: ["password_confirmation"],
    });

export type RegisterValues = z.infer<ReturnType<typeof RegisterSchema>>;
