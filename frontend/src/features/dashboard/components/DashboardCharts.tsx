import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  LabelList,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
} from "recharts";
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
import { useStats } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";

const entityChartConfig = {
  Utilisateurs: {
    label: "Utilisateurs",
    color: "var(--chart-1)",
  },
  Profils: {
    label: "Profils",
    color: "var(--chart-2)",
  },
  Structures: {
    label: "Structures",
    color: "var(--chart-3)",
  },
  Participants: {
    label: "Participants",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const roleChartConfig = {
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

const ChartSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-3 w-[100px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[200px] w-full" />
    </CardContent>
  </Card>
);

export const DashboardCharts = () => {
  const { data, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  // ── Bar chart data ──────────────────────────────────────────────────────────
  // Keys must match entityChartConfig keys so ChartTooltip resolves labels
  const barData = [
    {
      category: "Utilisateurs",
      count: data?.totalUsers ?? 0,
      fill: "var(--color-Utilisateurs)",
    },
    {
      category: "Profils",
      count: data?.totalProfils ?? 0,
      fill: "var(--color-Profils)",
    },
    {
      category: "Structures",
      count: data?.totalStructures ?? 0,
      fill: "var(--color-Structures)",
    },
    {
      category: "Participants",
      count: data?.totalParticipants ?? 0,
      fill: "var(--color-Participants)",
    },
  ];

  // ── Pie chart data ──────────────────────────────────────────────────────────
  const pieData =
    data?.userRolePartition.map((item) => ({
      name: ROLE_LABELS[item.role] ?? item.role,
      value: item.count,
      fill: `var(--color-${ROLE_LABELS[item.role] ?? item.role})`,
    })) ?? [];

  // ── Radial bar chart data (roles as % of total users) ──────────────────────
  const totalUsers = data?.totalUsers ?? 1; // avoid division by zero
  const radialData =
    data?.userRolePartition.map((item, index) => ({
      name: ROLE_LABELS[item.role] ?? item.role,
      value: Math.round((item.count / totalUsers) * 100),
      fill: `var(--chart-${index + 1})`,
    })) ?? [];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* ── 1. Bar Chart — entity distribution ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution des Entités</CardTitle>
          <CardDescription>Nombre total par catégorie</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={entityChartConfig}
            className="min-h-[220px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={barData}
              margin={{ top: 16, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} axisLine={false} width={30} />
              {/* FIX: tooltip inside the chart, using nameKey="category" */}
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" />}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {/* FIX: Cell needed to apply per-bar fill from data */}
                {barData.map((entry, index) => (
                  <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="count"
                  position="top"
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* ── 2. Donut Pie Chart — role breakdown ────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Rôles</CardTitle>
          <CardDescription>Distribution des rôles utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={roleChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                // innerRadius={55}
                // outerRadius={90}
                // paddingAngle={3}
                // strokeWidth={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                ))}
                {/* FIX: LabelList must be INSIDE <Pie>, not a sibling */}
                <LabelList
                  dataKey="value"
                  position="outside"
                  className="fill-foreground"
                  stroke="none"
                  fontSize={11}
                  // FIX: show the actual count value, not a config lookup
                  formatter={(value: number) => value}
                />
              </Pie>
              {/* Legend to identify each slice */}
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* ── 3. Radial Bar Chart — role % of total ──────────────────────────── */}
      {/*
        BONUS CHART: RadialBarChart
        Great for showing "how much of the whole" each role represents.
        Each arc length = percentage of total users.
      */}
      <Card>
        <CardHeader>
          <CardTitle>Part des Rôles</CardTitle>
          <CardDescription>
            Pourcentage de chaque rôle sur le total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={roleChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={radialData}
              // innerRadius={30}
              // outerRadius={100}
              // startAngle={90}
              // endAngle={-270}
              // barSize={18}
            >
              {/* Scale goes 0–100 since values are percentages */}
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                dataKey="value"
                background={{ fill: "var(--muted)" }}
                cornerRadius={6}
                label={{
                  position: "insideStart",
                  fill: "#fff",
                  fontSize: 11,
                  formatter: (value: number) => `${value}%`,
                }}
              >
                {radialData.map((entry, index) => (
                  <Cell key={`radial-cell-${index}`} fill={entry.fill} />
                ))}
              </RadialBar>
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                align="right"
                wrapperStyle={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    nameKey="name"
                    formatter={(value) => [`${value}%`, ""]}
                  />
                }
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
