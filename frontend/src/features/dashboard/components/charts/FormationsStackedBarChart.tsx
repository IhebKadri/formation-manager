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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { type DomaineYearStats } from "@/types/dashboard/stats.types";
import { useMemo } from "react";

interface Props {
  data: DomaineYearStats[];
}

export const FormationsStackedBarChart = ({ data }: Props) => {
  const { transformedData, years, chartConfig } = useMemo(() => {
    const domainMap = new Map<string, unknown>();
    const yearsSet = new Set<number>();

    data.forEach((item) => {
      const domaine = item.domaine;
      if (!domainMap.has(domaine)) {
        domainMap.set(domaine, { domaine: domaine });
      }
      domainMap.get(domaine)[`year_${item.year}`] = item.count;
      yearsSet.add(item.year);
    });

    const transformed = Array.from(domainMap.values());
    const yearList = Array.from(yearsSet).sort();

    const config: ChartConfig = {};
    yearList.forEach((year, index) => {
      config[`year_${year}`] = {
        label: year.toString(),
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });

    return { transformedData: transformed, years: yearList, chartConfig: config };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formations par domaine & année</CardTitle>
        <CardDescription>Répartition croisée domaine / année</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={transformedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="domaine"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              fontSize={12}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {years.map((year) => (
              <Bar
                key={year}
                dataKey={`year_${year}`}
                name={`year_${year}`}
                stackId="a"
                fill={`var(--color-year_${year})`}
                radius={[0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
