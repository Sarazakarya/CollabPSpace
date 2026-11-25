import { z } from "zod";

export const Signschema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.errors.emailRequired"))
      .email(t("auth.errors.emailInvalid")),
    password: z.string().min(6, t("auth.errors.passwordMin")),
    remember: z.boolean(),
  });

export type SignInValues = z.infer<ReturnType<typeof Signschema>>;
