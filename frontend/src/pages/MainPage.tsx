import { StatsList, DashboardCharts } from "@/features/dashboard/components";

export const MainPage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6 md:py-1">
          <div>
            <h1 className="text-3xl font-bold">Tableau de Bord</h1>
            <p className="text-muted-foreground text-sm">Aperçu des données</p>
          </div>
          <StatsList />
          <DashboardCharts />
        </div>
      </div>
    </div>
  );
};
