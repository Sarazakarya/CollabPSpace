import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PasswordField from "./PasswordField";
import FormField from "./FormField";
import Divider from "../atoms/Divider";
import GoogleButton from "./GoogleButton";
import AuthSwitchLink from "./AuthSwitchLink";
import useSignInForm from "../hooks/useSignInForm";
import { LockKeyhole, Mail } from "@/assets/icons/Icons";

export default function SignInForm() {
  const { register, control, handleSubmit, errors, onSubmit, isPending } =
    useSignInForm();

  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <GoogleButton label={t("auth.googleSignIn")} />
      <Divider />

      <FormField
        label={t("auth.email")}
        type="email"
        placeholder={t("auth.emailPlaceholder")}
        autoComplete="email"
        error={errors.email?.message}
        startAdornment={<Mail className="size-4" />}
        {...register("email")}
      />

      <PasswordField
        placeholder={t("auth.passwordPlaceholder")}
        autoComplete="current-password"
        error={errors.password?.message}
        startAdornment={<LockKeyhole className="size-4" />}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="remember"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
              />
            )}
          />

          <Label htmlFor="remember" className="ds-text-sm ds-text-secondary">
            {t("auth.remember")}
          </Label>
        </div>

        <Link
          to="/forgot-password"
          className="ds-text-sm ds-text-brand hover:underline"
        >
          {t("auth.forgot")}
        </Link>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="h-11 w-full cursor-pointer"
      >
        {isPending ? t("auth.signingIn") : t("auth.submit")}
      </Button>

      <AuthSwitchLink
        text={t("auth.noAccount")}
        linkText={t("auth.signUp")}
        to="/sign-up"
      />
    </form>
  );
}
