import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useResetPassword from "../hooks/useResetPassword";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email as string | undefined;
  const otp = location.state?.otp as string | undefined;

  const { form, isPending, onSubmit } = useResetPassword();

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!email || !otp) {
      navigate("/forgot-password", { replace: true });
      return;
    }

    setValue("email", email);
    setValue("otp", otp);
  }, [email, otp, navigate, setValue]);

  if (!email || !otp) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">
          {t("auth.resetPasswordTitle")}
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          {t("auth.resetPasswordDescription")}
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          <input type="hidden" {...register("email")} />
          <input type="hidden" {...register("otp")} />

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("auth.newPassword")}
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder={t("auth.newPasswordPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-primary"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("auth.confirmPassword")}
            </label>

            <input
              {...register("password_confirmation")}
              type="password"
              placeholder={t("auth.confirmPasswordPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-primary"
            />

            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white disabled:opacity-50"
          >
            {isPending ? t("auth.resettingPassword") : t("auth.resetPassword")}
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
