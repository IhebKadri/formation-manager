import { useStats } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  FormationsByDomaineChart,
  FormateurTypeDonutChart,
  FormationsEvolutionLineChart,
  ParticipantsByStructureHorizontalBarChart,
  BudgetEvolutionAreaChart,
  FormationsStackedBarChart,
  UserRolesDonutChart,
} from "./charts";

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-3 w-[100px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);

export const DashboardCharts = () => {
  const { data, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <ChartSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-1">
        <FormationsByDomaineChart data={data.formationsByDomaine} />
      </div>
      <div className="lg:col-span-1">
        <FormateurTypeDonutChart data={data.formateursByType} />
      </div>
      <div className="lg:col-span-1">
        <FormationsEvolutionLineChart data={data.formationsByYear} />
      </div>
      <div className="lg:col-span-1">
        <ParticipantsByStructureHorizontalBarChart
          data={data.participantsByStructure}
        />
      </div>
      <div className="lg:col-span-1">
        <BudgetEvolutionAreaChart data={data.formationsByYear} />
      </div>
      <div className="lg:col-span-1">
        <FormationsStackedBarChart data={data.formationsByDomaineAndYear} />
      </div>
      <div className="lg:col-span-2">
        <UserRolesDonutChart data={data.userRolePartition} />
      </div>
    </div>
  );
};
