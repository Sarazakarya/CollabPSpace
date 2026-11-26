import { useTranslation } from "react-i18next";
import ProgressBar from "../../components/molecule/Prgressar";
import { fmtDate } from "../utils/Projectsdata";

interface Props {
  progress: number;
  startDate: string;
  deadline: string;
}

export default function DueDateCard({ progress, startDate, deadline }: Props) {
  const { t, i18n } = useTranslation();

  return (
    <div className="ds-card flex flex-col gap-2 p-4!">
      <p className="ds-text-sm ds-text-primary font-semibold">
        {t("projects.dueDate")}
      </p>
      <ProgressBar value={progress} />
      <div className="ds-text-xs ds-text-secondary flex justify-between">
        <span>
          {t("projects.startDate")}: {fmtDate(startDate, i18n.language)}
        </span>
        <span>
          {t("projects.deadline")}: {fmtDate(deadline, i18n.language)}
        </span>
      </div>
    </div>
  );
}
