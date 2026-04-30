import type { Stats } from "@/types/dashboard/stats.types";
import {
  Briefcase,
  IdCard,
  Network,
  Users,
  type LucideIcon,
} from "lucide-react";

export const STAT_CONFIGS = [
  { key: "totalUsers", title: "Total des utilisateurs", icon: Users },
  { key: "totalProfils", title: "Total des profils", icon: Briefcase },
  { key: "totalStructures", title: "Total des structures", icon: Network },
  { key: "totalParticipants", title: "Total des participants", icon: IdCard },
  { key: "totalFormations", title: "Total des formations", icon: Briefcase },
  { key: "totalFormateurs", title: "Total des formateurs", icon: Users },
  { key: "totalDomaines", title: "Total des domaines", icon: Network },
  { key: "totalEmployeurs", title: "Total des employeurs", icon: IdCard },
] as const satisfies readonly {
  key: keyof Stats;
  title: string;
  icon: LucideIcon;
}[];
