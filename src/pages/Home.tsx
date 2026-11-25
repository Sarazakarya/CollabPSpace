import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <h1>{t("nav.home")}</h1>
      <p>{t("welcome", { name: "Ahmed" })}</p>
    </div>
  );
};

export default Home;
