import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useVerifyResetOtp from "../hooks/useVerifyResetOtp";
import {
  verifyResetOtpSchema,
  type VerifyResetOtpValues,
} from "../schema/PasswordRecoverySchema";

export default function VerifyOtpPage() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email as string | undefined;

  const { isPending, onVerifyOtp } = useVerifyResetOtp();

  const form = useForm<VerifyResetOtpValues>({
    resolver: zodResolver(verifyResetOtpSchema(t)),
    defaultValues: {
      email: email || "",
      otp: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  const onSubmit = (values: VerifyResetOtpValues) => {
    onVerifyOtp(values);
  };

  if (!email) return null;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">{t("auth.verifyOtpTitle")}</h1>

        <p className="mb-6 text-sm text-gray-500">
          {t("auth.verifyOtpDescription")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("auth.email")}
            </label>

            <input
              {...register("email")}
              type="email"
              readOnly
              className="w-full rounded-lg border bg-gray-50 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              {t("auth.otp")}
            </label>

            <input
              {...register("otp")}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder={t("auth.otpPlaceholder")}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-primary"
            />

            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white disabled:opacity-50"
          >
            {isPending ? t("auth.verifyingCode") : t("auth.verifyCode")}
          </button>
        </form>

        <Link
          to="/forgot-password"
          className="mt-5 block text-center text-sm text-primary"
        >
          {t("auth.backToForgotPassword")}
        </Link>
      </div>
    </div>
  );
}
