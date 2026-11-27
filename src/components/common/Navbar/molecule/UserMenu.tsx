import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Avatar from "../atoms/Avatar";
import { useUserMenu } from "../hooks/useUserMenu";

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
            className="hidden h-auto gap-2 md:flex"
          />
        }
      >
        <div className="text-end">
          <p className="ds-text-xs ds-text-primary font-semibold">{user.name}</p>
          <p className="ds-text-xs ds-text-secondary">{user.role}</p>
        </div>

        <Avatar initials={user.initials} src={user.avatar} size={32} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {items.map(({ key, icon: Icon, onSelect, destructive }) => (
          <Fragment key={key}>
            {destructive && <DropdownMenuSeparator />}

            <DropdownMenuItem
              onClick={onSelect}
              variant={destructive ? "destructive" : "default"}
              className="cursor-pointer gap-2"
            >
              <Icon className="size-4" />
              {t(`dashboard.userMenu.${key}`)}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}