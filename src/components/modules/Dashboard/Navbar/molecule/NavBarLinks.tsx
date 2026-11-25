import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Avatar from "../atoms/Avatar";
import { useUserMenu } from "../hooks/useUserMenu";
import { links } from "../utils/NavBarData";

export default function NavBarLinks() {
  const { t, i18n } = useTranslation();
  const { user, items } = useUserMenu();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ds-text-primary order-first size-8 md:hidden"
            />
          }
        >
          <Menu className="size-5" />
        </SheetTrigger>

        <SheetContent
          side={i18n.dir() === "rtl" ? "right" : "left"}
          className="w-72"
        >
          <SheetHeader>
            <SheetTitle>Collabspace</SheetTitle>

            <div className="flex items-center gap-3 border-b border-border pb-4 mt-4">
              <Avatar initials={user.initials} size={36} />

              <div className="text-start">
                <p className="ds-text-sm ds-text-primary font-semibold">
                  {user.name}
                </p>
                <p className="ds-text-xs ds-text-secondary">{user.role}</p>
              </div>
            </div>
          </SheetHeader>

          <nav className="flex flex-col gap-1 px-4">
            {links.map(([key, to]) => (
              <NavLink
                key={key}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `ds-text-base rounded-lg px-3 py-2.5 font-medium ${
                    isActive
                      ? "ds-bg-brand ds-text-white"
                      : "ds-text-primary hover:bg-accent"
                  }`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>

          {/*  menu  */}
          <div className="mt-auto flex flex-col gap-1 border-t border-border p-4">
            {items.map(({ key, icon: Icon, onSelect, destructive }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setOpen(false);
                  onSelect();
                }}
                className={`ds-text-base flex items-center gap-3 rounded-lg px-3 py-2.5 text-start font-medium hover:bg-accent ${
                  destructive ? "ds-text-danger" : "ds-text-primary"
                }`}
              >
                <Icon className="size-4" />
                {t(`dashboard.userMenu.${key}`)}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <nav className="ds-bg hidden items-center gap-1 rounded-full p-1 md:flex">
        {links.map(([key, to]) => (
          <NavLink
            key={key}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `ds-text-xs rounded-full px-3 py-1.5 font-medium ${
                isActive
                  ? "ds-bg-brand ds-text-white"
                  : "ds-text-primary ds-hover"
              }`
            }
          >
            {t(`nav.${key}`)}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
