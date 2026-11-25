import { FolderOpen } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";

interface Props {
  message?: string;
  title?: string;
  className?: string;
}

export default function EmptyState({ title, message, className = "" }: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex min-h-87.5 flex-col items-center justify-center px-6 py-10 text-center ${className}`}
    >
      <div className="relative mb-6 animate-bounce">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 shadow-sm">
          <FolderOpen className="h-12 w-12 text-blue-500" strokeWidth={1.4} />
        </div>

        <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-blue-400" />
      </div>

      <div className="animate-[fadeIn_0.8s_ease-out]">
        <h3 className="mb-2 text-xl font-bold text-blue-950">
          {title || t("emptyState.title")}
        </h3>

        <p className="max-w-sm text-sm leading-7 text-slate-500">
          {message || t("emptyState.message")}
        </p>
      </div>
    </div>
  );
}
