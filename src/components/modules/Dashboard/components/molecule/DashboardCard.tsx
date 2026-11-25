import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  viewAll?: boolean;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function DashboardCard({
  title,
  viewAll,
  action,
  className = "",
  children,
}: Props) {
  const { t } = useTranslation();

  return (
    <section className={`ds-card flex flex-col gap-4 ${className}`}>
      <header className="flex items-center justify-between gap-2">
        <h2 className="ds-title-md ds-text-primary">{title}</h2>
        {action}
        {viewAll && (
          <Link to="#" className="ds-text-xs ds-text-brand hover:underline">
            {t("dashboard.viewAll")}
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}
