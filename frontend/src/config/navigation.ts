import type { UserRole } from "@/types";
import {
  User,
  Library,
  Users,
  type LucideIcon,
  LayoutDashboard,
  IdCardLanyard,
  Network,
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
        roles: ["RESPONSABLE", "ADMINISTRATEUR"],
      },
      {
        id: "formations",
        labelKey: "Formations",
        path: "/formations",
        icon: Library,
        roles: ["SIMPLE_UTILISATEUR", "ADMINISTRATEUR"],
      },
      {
        id: "utilisateurs",
        labelKey: "Utilisateurs",
        path: "/users",
        icon: Users,
        roles: ["ADMINISTRATEUR"],
      },
      {
        id: "referentials",
        labelKey: "Référentiels",
        path: "/referentials",
        icon: Network,
        roles: ["ADMINISTRATEUR"],
      },
      {
        id: "participants",
        labelKey: "Participants",
        path: "/participants",
        icon: IdCardLanyard,
        roles: ["ADMINISTRATEUR", "SIMPLE_UTILISATEUR"],
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
        roles: ["SIMPLE_UTILISATEUR", "ADMINISTRATEUR", "RESPONSABLE"],
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
