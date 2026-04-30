import { Bar, BarChart, XAxis, YAxis } from "recharts";
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
import type { StructureStats } from "@/types/dashboard/stats.types";

const chartConfig = {
  count: {
    label: "Participants",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  data: StructureStats[];
}

export const ParticipantsByStructureHorizontalBarChart = ({ data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants par structure</CardTitle>
        <CardDescription>Nombre de participants par direction</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="structure"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
