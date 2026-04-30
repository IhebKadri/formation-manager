import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { UserRolePartition } from "@/types/dashboard/stats.types";

const chartConfig = {
  Administrateurs: {
    label: "Administrateurs",
    color: "var(--chart-1)",
  },
  Utilisateurs: {
    label: "Utilisateurs",
    color: "var(--chart-2)",
  },
  Responsables: {
    label: "Responsables",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrateurs",
  simple_utilisateur: "Utilisateurs",
  responsable: "Responsables",
};

interface Props {
  data: UserRolePartition[];
}

export const UserRolesDonutChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: ROLE_LABELS[item.role] ?? item.role,
    value: item.count,
    fill: `var(--color-${ROLE_LABELS[item.role] ?? item.role})`,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Répartition des Rôles</CardTitle>
        <CardDescription>Distribution des accès utilisateurs</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
