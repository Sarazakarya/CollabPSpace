import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DeleteModalProps } from "../types/FileType";

const DeleteFileModal = ({
  open,
  setOpen,
  file,
  onConfirm,
  isPending,
}: DeleteModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("projects.files.deleteTitle")}</DialogTitle>

          <DialogDescription>
            {t("projects.files.deleteDescription")}{" "}
            <span className="font-semibold text-foreground">{file?.name}</span>
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
            disabled={isPending || !file}
            className={"cursor-pointer"}
          >
            {isPending
              ? t("projects.files.deleting")
              : t("projects.files.confirmDelete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFileModal;
