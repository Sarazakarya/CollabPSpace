import { useTranslation } from "react-i18next";
import type { descriptionProps } from "../types/overviewtype";

const ProjectDescriptionCard = ({ description }: descriptionProps) => {
  const { t } = useTranslation();

  return (
    <div className="ds-card space-y-2">
      <h3 className="ds-title-md ds-text-primary">
        {t("projects.description")}
      </h3>
      {description ? (
        <p className="ds-text-sm ds-text-secondary leading-relaxed">
          {description}
        </p>
      ) : (
        <p className="ds-text-sm ds-text-disabled">
          {t("projects.overview.noDescription")}
        </p>
      )}
    </div>
  );
};

export default ProjectDescriptionCard;
