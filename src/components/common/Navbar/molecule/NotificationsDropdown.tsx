import { useTranslation } from "react-i18next";
import { Bell, CheckCheck, Trash2 } from "@/assets/icons/Icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetNotifications } from "../hooks/useGetNotification";
import { useGetUnreadCount } from "../hooks/useGetCount";
import { useMarkNotificationAsRead } from "../hooks/useMark";
import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";
import { useDeleteNotification } from "../hooks/useDeleteNotification";



export default function NotificationsDropdown() {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isError } = useGetNotifications();
  const { data: countData } = useGetUnreadCount();
  const markReadMutation = useMarkNotificationAsRead();
  const markAllMutation = useMarkAllNotificationsAsRead();
  const deleteMutation = useDeleteNotification();
  const notifications = data?.data ?? [];

  const unreadCount =
    countData?.data.unread_count ?? data?.meta.unread_count ?? 0;

  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markReadMutation.mutate(id);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(i18n.language, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("notifications.title")}
          className="ds-text-secondary ds-hover relative size-8"
        >
          <Bell className="size-4" />

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-87.5 max-w-[calc(100vw-2rem)] p-0"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-base font-semibold">{t("notifications.title")}</p>

          {unreadCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={markAllMutation.isPending}
              onClick={() => markAllMutation.mutate()}
              className="h-8 gap-1 text-xs"
            >
              <CheckCheck className="size-4" />
              {t("notifications.markAllRead")}
            </Button>
          )}
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              {t("notifications.loading")}
            </p>
          ) : isError ? (
            <p className="px-4 py-8 text-center text-sm text-destructive">
              {t("notifications.error")}
            </p>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-4 py-10 text-center">
              <Bell className="size-8 text-muted-foreground" />
              <p className="text-sm font-semibold">
                {t("notifications.emptyTitle")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("notifications.emptyMessage")}
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 border-b px-4 py-3 transition-colors ${
                  notification.is_read ? "bg-background" : "bg-primary/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleNotificationClick(
                      notification.id,
                      notification.is_read,
                    )
                  }
                  className="min-w-0 flex-1 text-start"
                >
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">
                      {notification.title}
                    </p>

                    {!notification.is_read && (
                      <span className="size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {formatDate(notification.created_at)}
                  </p>
                </button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(notification.id)}
                  aria-label={t("notifications.delete")}
                  className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
