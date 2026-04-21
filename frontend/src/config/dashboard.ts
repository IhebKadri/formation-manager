import type { Stats } from "@/types/dashboard/stats.types";
import {
  Briefcase,
  IdCard,
  Network,
  Users,
  type LucideIcon,
} from "lucide-react";

export const STAT_CONFIGS = [
  { key: "totalUsers", title: "Total Users", icon: Users },
  { key: "totalProfils", title: "Total Profils", icon: Briefcase },
  { key: "totalStructures", title: "Total Structures", icon: Network },
  { key: "totalParticipants", title: "Total Participants", icon: IdCard },
] as const satisfies readonly {
  key: keyof Stats;
  title: string;
  icon: LucideIcon;
}[];
