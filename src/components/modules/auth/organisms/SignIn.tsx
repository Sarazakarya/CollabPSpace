import AuthLayout from "@/components/modules/auth/templates/AuthLayout";
import SignInForm from "@/components/modules/auth/molecule/SignInForm";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <AuthLayout title={t("auth.signIn")} subtitle={t("auth.signInSubtitle")}>
      <SignInForm />
    </AuthLayout>
  );
}
