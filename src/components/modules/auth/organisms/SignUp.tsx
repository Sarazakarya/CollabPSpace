import SignInForm from "@/components/modules/auth/molecule/SignUpForm";
import AuthLayout from "@/components/modules/auth/templates/AuthLayout";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const { t } = useTranslation();
  return (
    <AuthLayout
      title={t("auth.signUpTitle")}
      subtitle={t("auth.signUpSubtitle")}
    >
      <SignInForm />
    </AuthLayout>
  );
}
