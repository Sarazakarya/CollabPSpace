import { Search, Plus } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TasToolbarProps } from "../types/Taskstype";

const TasksToolbar = ({
  search,
  onSearchChange,
  onCreateTask,
  isPending,
}: TasToolbarProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div className="relative w-full max-w-sm">
        <Search className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("tasks.search")}
          className="h-9 ps-9 bg-gray-200"
        />
      </div>

      <Button onClick={onCreateTask} disabled={isPending}>
        {t("tasks.createTask")}
        <Plus size={16} />
      </Button>
    </div>
  );
};

export default TasksToolbar;
