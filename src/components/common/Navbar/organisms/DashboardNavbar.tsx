import { LangToggle } from "@/components/common/LangToggle";
import Logo from "@/components/modules/auth/atoms/Logo";
import NavBarLinks from "../molecule/NavBarLinks";
import NavBarSearch from "../molecule/NavBarSearch";
import UserMenu from "../molecule/UserMenu";
import NotificationsDropdown from "../molecule/NotificationsDropdown";

export default function DashboardNavbar() {
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

          <NotificationsDropdown />

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
