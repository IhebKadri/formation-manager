import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  NotificationCard,
  type NotificationStatus,
  type NotificationAction,
} from "@/components/ui/notif-card";
import { Bell } from "lucide-react";

const MAX_VISIBLE = 5;
export type Notification = {
  id: string;
  title: string;
  body: string;
  status: NotificationStatus;
  createdAt: string;
  actions?: NotificationAction[];
};
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New team member joined",
    body: "Sarah Connor has joined the Engineering workspace.",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    actions: [
      {
        id: "view",
        label: "View workspace",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "2",
    title: "New product added",
    body: 'A new product "Dashboard Pro" has been added to the catalog.',
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    actions: [
      {
        id: "view-product",
        label: "View products",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "3",
    title: "Billing cycle updated",
    body: "Your Pro plan has been renewed. Next invoice on April 24, 2026.",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    actions: [
      {
        id: "billing",
        label: "View billing",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "4",
    title: "Task assigned to you",
    body: 'You have been assigned "Update dashboard analytics" on the Kanban board.',
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actions: [
      {
        id: "open",
        label: "Open kanban",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "5",
    title: "New message from Alex",
    body: 'Alex sent you a message: "Hey, can we sync on the overview dashboard?"',
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    actions: [
      {
        id: "open-chat",
        label: "Open chat",
        type: "redirect",
        style: "primary",
      },
    ],
  },
];

export function NotificationCenter() {
  const count = mockNotifications.filter((n) => n.status === "unread").length;
  const visibleNotifications = mockNotifications.slice(0, MAX_VISIBLE);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          {count > 0 && (
            <span className="bg-destructive text-destructive-foreground absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-medium">
              {count > 9 ? "9+" : count}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[calc(100vw-2rem)] p-0 sm:w-[380px]"
        sideOffset={8}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h4 className="text-sm font-semibold group-hover:underline">
            Notifications
          </h4>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                {count} new
              </span>
            )}
            {count > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-auto px-2 py-1 text-xs"
                // onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-[400px]">
          {mockNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="text-muted-foreground/40 mb-2 h-8 w-8" />
              <p className="text-muted-foreground text-sm">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-2">
              {visibleNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  body={notification.body}
                  status={notification.status}
                  createdAt={notification.createdAt}
                  actions={notification.actions}
                  //   onMarkAsRead={markAsRead}
                  //   onAction={(notifId, actionId) => {
                  //     const route = actionRoutes[actionId];
                  //     if (route) {
                  //       markAsRead(notifId);
                  //       router(route);
                  //     }
                  //   }}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
