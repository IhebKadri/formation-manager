import { TrendingUp } from "lucide-react";
import { SkeletonStatCard, StatCard } from "./StatCard";
import { useStats } from "../hooks";
import { STAT_CONFIGS } from "@/config";

export const StatsList = () => {
  const { data, isLoading } = useStats();

  return (
    <div
      className={
        "grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card"
      }
    >
      {STAT_CONFIGS.map(({ key, title, icon }) =>
        isLoading ? (
          <SkeletonStatCard key={key} />
        ) : (
          <StatCard
            key={key}
            title={title}
            value={data?.[key]}
            icon={icon}
            trend="+12.5%"
            trendIcon={TrendingUp}
          />
        ),
      )}
    </div>
  );
};
