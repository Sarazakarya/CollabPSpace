import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateTask: () => void;
  isPending?: boolean;
}

const TasksToolbar = ({
  search,
  onSearchChange,
  onCreateTask,
  isPending,
}: Props) => {
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
