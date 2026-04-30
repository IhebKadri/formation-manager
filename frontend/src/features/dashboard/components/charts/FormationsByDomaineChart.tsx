import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
} from "@/components/ui/chart";
import { type DomaineStats } from "@/types/dashboard/stats.types";

const chartConfig = {
  count: {
    label: "Formations",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  data: DomaineStats[];
}

export const FormationsByDomaineChart = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Formations par domaine</CardTitle>
        <CardDescription>Nombre de formations par domaine</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="domaine"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
