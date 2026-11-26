import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function ProjectsHeader({ onAdd }: { onAdd?: () => void }) {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between gap-3">
      <h1 className="ds-title-lg ds-text-primary">{t("projects.allTitle")}</h1>
      <Button onClick={onAdd} className="gap-1">
        {t("projects.add")}
        <Plus className="size-4" />
      </Button>
    </header>
  );
}
