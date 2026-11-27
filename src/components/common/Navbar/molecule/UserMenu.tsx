import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../atoms/Avatar";
import { useUserMenu } from "../hooks/useUserMenu";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const { t } = useTranslation();
  const { user, items } = useUserMenu();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            aria-label={t("dashboard.userMenu.open")}
            variant="ghost"
            className="hidden md:flex gap-2"
          />
        }
      >
        <div className="text-end">
          <p className="ds-text-xs ds-text-primary font-semibold">
            {user.name}
          </p>
          <p className="ds-text-xs ds-text-secondary">{user.role}</p>
        </div>

        <Avatar initials={user.initials} size={32} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {items.map(({ key, icon: Icon, onSelect, destructive }) => (
          <div key={key}>
            {destructive && <DropdownMenuSeparator />}

            <DropdownMenuItem
              onClick={onSelect}
              variant={destructive ? "destructive" : "default"}
              className="cursor-pointer gap-2"
            >
              <Icon className="size-4" />
              {t(`dashboard.userMenu.${key}`)}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
