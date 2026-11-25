import SignUp from "@/components/modules/auth/organisms/SignUp";
import Seo from "@/core/seo/Seo";

const Register = () => {
  return (
    <>
      <Seo
        title="Dashboard | Sign-Up"
        description="Sign-Up."
        keywords={[
          "Dashboard",
          "Projects",
          "Tasks",
          "Teams",
          "Collabspace",
          "Login",
        ]}
        noIndex
      />
      <SignUp />;
    </>
  );
};

export default Register;
