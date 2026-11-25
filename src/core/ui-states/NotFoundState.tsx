import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center"
    >
      <div className="relative mb-8 animate-bounce">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-blue-50">
          <SearchX className="h-16 w-16 text-blue-500" strokeWidth={1.3} />
        </div>

        <span className="absolute -right-2 top-2 h-5 w-5 animate-ping rounded-full bg-blue-400" />
      </div>

      <div className="animate-[fadeIn_0.8s_ease-out]">
        <h1 className="mb-3 text-3xl font-bold text-blue-950 md:text-5xl">
          404
        </h1>

        <h2 className="mb-3 text-xl font-semibold text-gray-800">
          {t("notFound.title")}
        </h2>

        <p className="mb-7 max-w-md text-sm leading-7 text-gray-500">
          {t("notFound.description")}
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
      >
        <Home className="h-4 w-4" />
        {t("notFound.backToHome")}
      </Link>
    </div>
  );
}
