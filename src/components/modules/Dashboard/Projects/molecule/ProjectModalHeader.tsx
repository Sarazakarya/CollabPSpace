import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderPlus } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectModalHeader = () => {
  const { t } = useTranslation();
  return (
    <DialogHeader className="flex-row items-start gap-4 border-b border-border px-6 py-5 text-left">
      <div className="ds-bg-brand-soft ds-text-brand flex size-14 shrink-0 items-center justify-center rounded-2xl">
        <FolderPlus className="size-6" />
      </div>

      <div className="space-y-1 pr-6">
        <DialogTitle className="ds-title-lg">
          {t("projects.modal.title")}
        </DialogTitle>
        <DialogDescription className="ds-text-base ds-text-secondary">
          {t("projects.modal.description")}
        </DialogDescription>
      </div>
    </DialogHeader>
  );
};

export default ProjectModalHeader;
