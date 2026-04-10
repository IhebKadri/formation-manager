import type { UserRole } from "@/types";
import {
  User,
  Settings,
  Users,
  type LucideIcon,
  LayoutDashboard,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  labelKey: string;
  path: string;
  icon?: LucideIcon;
  roles: UserRole[];
}

export interface NavigationSection {
  id: string;
  labelKey: string;
  items: NavigationItem[];
}

export const navigationSections: NavigationSection[] = [
  {
    id: "administration",
    labelKey: "Administration",
    items: [
      {
        id: "global-view",
        labelKey: "Tableau de bord",
        path: "/",
        icon: LayoutDashboard,
        roles: ["RESPONSABLE","ADMINISTRATEUR"],
      },
      {
        id: "formations",
        labelKey: "Formations",
        path: "/formations",
        icon: Users,
        roles: ["SIMPLE_UTILISATEUR","ADMINISTRATEUR"],
      },
    ],
  },

  {
    id: "configuration",
    labelKey: "Configuration",
    items: [
      {
        id: "my-profile",
        labelKey: "Mon profil",
        path: "/profile",
        icon: User,
        roles: ["SIMPLE_UTILISATEUR", "ADMINISTRATEUR","RESPONSABLE"],
      },
      {
        id: "settings",
        labelKey: "Paramètres",
        path: "/settings",
        icon: Settings,
        roles: ["SIMPLE_UTILISATEUR", "ADMINISTRATEUR","RESPONSABLE"],
      },
    ],
  },
];

export const filterNavigation = (userRole: UserRole): NavigationSection[] => {
  return navigationSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.roles || item.roles.includes(userRole),
      ),
    }))
    .filter((section) => section.items.length > 0);
};
