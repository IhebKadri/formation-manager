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
] as const satisfies readonly {
  key: keyof Stats;
  title: string;
  icon: LucideIcon;
}[];
