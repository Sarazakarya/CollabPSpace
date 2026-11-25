import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LangToggle() {
  const { i18n } = useTranslation();
  const isAr = i18n.resolvedLanguage === "ar";

  return (
    <Button
      variant="ghost"
      className={"border ds-border ds-rounded-lg p-2 cursor-pointer"}
      onClick={() => i18n.changeLanguage(isAr ? "en" : "ar")}
    >
      {isAr ? "English" : "العربية"}
    </Button>
  );
}
