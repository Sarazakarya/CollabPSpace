import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useForgotPassword from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const { form, isPending, onSubmit } = useForgotPassword();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">
          {t("auth.forgotPasswordTitle")}
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          {t("auth.forgotPasswordDescription")}
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("auth.email")}
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-primary"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white disabled:opacity-50"
          >
            {isPending ? t("auth.sendingCode") : t("auth.sendResetCode")}
          </button>
        </form>

        <Link
          to="/sign-in"
          className="mt-5 block text-center text-sm text-primary"
        >
          {t("auth.backToSignIn")}
        </Link>
      </div>
    </div>
  );
}
