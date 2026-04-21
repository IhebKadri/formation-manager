import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  trend: string;
  icon: LucideIcon;
  trendIcon: LucideIcon;
}

export const SkeletonStatCard = () => (
  <Card className="@container/card">
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="size-4 rounded-full" />
      </div>
      <Skeleton className="h-8 w-[60px]" />
    </CardHeader>
  </Card>
);

export const StatCard = ({
  title,
  value,
  trend,
  trendIcon,
  icon: StatIcon,
}: StatCardProps) => {
  const Icon = trendIcon;
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <StatIcon className="size-4 text-muted-foreground" />
          <CardDescription>{title}</CardDescription>
        </div>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <Icon />
            {trend}
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
};
