import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ActionModalButtonsProps {
  setOpen: (open: boolean) => void;
  isPending: boolean;
}

const ActionModalButtons = ({
  setOpen,
  isPending,
}: ActionModalButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
      <p className="ds-text-sm ds-text-secondary">
        <span className="ds-text-danger">*</span>{" "}
        {t("projects.modal.requiredFields")}
      </p>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={isPending}
        >
          {t("common.cancel")}
        </Button>

        <Button type="submit" disabled={isPending}>
          <Plus className="size-4" />
          {isPending
            ? t("projects.modal.creating")
            : t("projects.modal.create")}
        </Button>
      </div>
    </div>
  );
};

export default ActionModalButtons;
