import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DeleteTaskProps } from "../types/TaskType";

const DeleteTaskDialog = ({
  open,
  setOpen,
  task,
  onConfirm,
  isPending,
}: DeleteTaskProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("projects.taskActions.deleteTitle")}</DialogTitle>

          <DialogDescription>
            {t("projects.taskActions.deleteConfirmation")}{" "}
            <span className="font-semibold text-foreground">{task?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            {t("common.cancel")}
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending || !task}
          >
            {isPending
              ? t("projects.taskActions.deleting")
              : t("projects.taskActions.confirmDelete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskDialog;
