import SignIn from "@/components/modules/auth/organisms/SignIn";
import Seo from "@/core/seo/Seo";

const Login = () => {
  return (
    <>
      <Seo
        title="Dashboard | Sign-In"
        description="Sign-In."
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
      <SignIn />;
    </>
  );
};

export default Login;
