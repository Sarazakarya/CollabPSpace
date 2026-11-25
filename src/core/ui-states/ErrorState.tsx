import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  message?: string;
  className?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function ErrorState({
  message,
  className = "",
  onRetry,
  retryLabel,
}: Props) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`flex min-h-87.5 flex-col items-center justify-center px-6 py-10 text-center ${className}`}
    >
      <div className="relative mb-6 animate-bounce">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 shadow-sm">
          <AlertCircle className="h-12 w-12 text-blue-500" strokeWidth={1.5} />
        </div>

        <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-blue-400" />
      </div>

      <div className="animate-[fadeIn_0.8s_ease-out]">
        <h3 className="mb-2 text-xl font-bold text-blue-950">
          {t("errorState.title")}
        </h3>

        <p className="max-w-sm text-sm leading-7 text-slate-500">
          {message || t("errorState.message")}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          {retryLabel || t("errorState.retry")}
        </button>
      )}
    </div>
  );
}
