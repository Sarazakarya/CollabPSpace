import { Input } from "@/components/ui/input";
import { Search } from "@/assets/icons/Icons";
import { useTranslation } from "react-i18next";

const NavBarSearch = () => {
  const { t } = useTranslation();

  return (
    <div className="ds-bg relative hidden items-center rounded-full sm:flex">
      <Search className="ds-text-secondary absolute inset-s-3 size-3.5" />

      <Input
        type="search"
        placeholder={t("dashboard.search")}
        className="ds-text-xs ds-text-primary h-8 w-44 border-0 bg-transparent ps-8 pe-3 shadow-none focus-visible:ring-0"
      />
    </div>
  );
};

export default NavBarSearch;
