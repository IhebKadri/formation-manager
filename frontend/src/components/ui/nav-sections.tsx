import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavigationItem, NavigationSection } from "@/config/navigation";
import { Link, useLocation } from "react-router-dom";

export function NavSections(section: NavigationSection) {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.labelKey}</SidebarGroupLabel>
      <SidebarMenu>
        {section.items.map((item: NavigationItem) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");
          const Icon = item.icon!;
          return (
            <SidebarMenuItem key={item.id} className="pt-1">
              <SidebarMenuButton asChild isActive={isActive}>
                <Link to={item.path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{item.labelKey}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
