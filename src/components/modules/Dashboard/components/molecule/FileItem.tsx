import {  FileText } from "@/assets/icons/Icons"
import { useTranslation } from "react-i18next";

import { toneMap, type Tone } from "../../../utils/DashboardData";

interface Props {
  name: string;
  by: string;
  time: string;
  tone: Tone;
}

export default function FileItem({ name, by, time, tone }: Props) {
  const { t } = useTranslation();

  return (
    <li className="flex items-center gap-3">
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: toneMap[tone].bg }}
      >
        <FileText className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="ds-text-sm ds-text-primary truncate font-medium">
          {name}
        </p>
        <p className="ds-text-xs ds-text-secondary truncate">
          {t("dashboard.recentFiles.by", { name: by, time })}
        </p>
      </div>
    </li>
  );
}
