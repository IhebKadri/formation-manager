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
import type { FormateurTypeStats } from "@/types/dashboard/stats.types";

const chartConfig = {
  INTERNE: {
    label: "Interne",
    color: "var(--chart-1)",
  },
  EXTERNE: {
    label: "Externe",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  data: FormateurTypeStats[];
}

export const FormateurTypeDonutChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    name: item.type,
    value: item.count,
    fill: item.type === "INTERNE" ? "var(--chart-1)" : "var(--chart-2)",
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Formateurs internes vs externes</CardTitle>
        <CardDescription>Répartition par type de formateur</CardDescription>
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
