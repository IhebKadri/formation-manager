import * as React from "react";

import { NavSections } from "@/components/ui/nav-sections";
import { NavUser } from "@/components/common/nav-user";
import { CompanyCard } from "@/components/ui/CompanyCard";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { filterNavigation, type NavigationSection } from "@/config/navigation";
import { useProfile } from "@/features/profile/hooks/useProfile";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useProfile();
  const sections = user ? filterNavigation(user.role) : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyCard />
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section: NavigationSection) => (
          <NavSections {...section} key={section.id} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
