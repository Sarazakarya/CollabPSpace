import { LockKeyhole, Mail, UserRound } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import PasswordField from "./PasswordField";
import FormField from "./FormField";
import Divider from "../atoms/Divider";
import GoogleButton from "./GoogleButton";
import AuthSwitchLink from "./AuthSwitchLink";
import useSignUpForm from "../hooks/useSignUpForm";

export default function SignUpForm() {
  const { register, handleSubmit, errors, isPending, onSubmit } =
    useSignUpForm();

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
        label={t("auth.fullName")}
        type="text"
        placeholder={t("auth.fullNamePlaceholder")}
        autoComplete="name"
        startAdornment={<UserRound className="size-4" />}
        error={errors.name?.message}
        {...register("name")}
      />

      <FormField
        label={t("auth.email")}
        type="email"
        placeholder={t("auth.emailPlaceholder")}
        autoComplete="email"
        startAdornment={<Mail className="size-4" />}
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.passwordPlaceholder")}
        autoComplete="new-password"
        startAdornment={<LockKeyhole className="size-4" />}
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordField
        label={t("auth.confirmPassword")}
        placeholder={t("auth.confirmPasswordPlaceholder")}
        autoComplete="new-password"
        startAdornment={<LockKeyhole className="size-4" />}
        error={errors.password_confirmation?.message}
        {...register("password_confirmation")}
      />
      <Button type="submit" disabled={isPending} className="h-11 w-full">
        {isPending ? t("auth.creating") : t("auth.signUp")}
      </Button>

      <AuthSwitchLink
        text={t("auth.haveAccount")}
        linkText={t("auth.signIn")}
        to="/sign-in"
      />
    </form>
  );
}
