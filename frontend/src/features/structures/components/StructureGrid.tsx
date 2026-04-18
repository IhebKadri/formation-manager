import type { Structure } from "@/types";
import { StructureCard } from "./StructureCard";
import { Skeleton } from "@/components/ui/skeleton";

export const StructureGrid = ({
  structures,
  isLoading,
}: {
  structures: Structure[];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-4 bg-card">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (structures?.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border text-muted-foreground">
        <p>Aucune structure ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {structures?.map((structure) => (
        <StructureCard key={structure.id} structure={structure} />
      ))}
    </div>
  );
};
