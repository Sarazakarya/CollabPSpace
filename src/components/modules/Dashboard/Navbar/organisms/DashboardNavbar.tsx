import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

import { LangToggle } from "@/components/common/LangToggle";
import Logo from "@/components/modules/auth/atoms/Logo";
import NavBarSearch from "../molecule/NavBarSearch";
import NavBarLinks from "../molecule/NavBarLinks";
import UserMenu from "../molecule/UserMenu";

export default function DashboardNavbar() {
  const { t } = useTranslation();

  return (
    <header className="ds-bg-card border-b border-border p-3">
      <div className="ds-container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Logo />
          <NavBarLinks />
        </div>

        <div className="flex items-center gap-3">
          <NavBarSearch />
          <LangToggle />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("dashboard.notifications")}
            className="ds-text-secondary ds-hover size-8"
          >
            <Bell className="size-4" />
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
