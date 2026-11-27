import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DeleteTaskProps } from "../types/Taskstype";

const DeletTaskModal = ({
  open,
  onOpenChange,
  task,
  onConfirm,
  isPending,
}: DeleteTaskProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("tasks.deleteTask")}</DialogTitle>

          <DialogDescription>
            {t("tasks.deleteConfirmation", { name: task?.name })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("common.cancel")}
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending || !task}
          >
            {isPending ? t("tasks.deleting") : t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletTaskModal;
