import type { Profil } from "@/types";
import { ProfilItem } from "./ProfilItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

interface ProfilsListProps {
  profils: Profil[];
  isLoading: boolean;
  onEdit: (profil: Profil) => void;
  onDelete: (profil: Profil) => void;
}

export const ProfilsList = ({
  profils,
  isLoading,
  onEdit,
  onDelete,
}: ProfilsListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profils.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 text-muted-foreground">
        <Briefcase className="mb-4 size-12 opacity-20" />
        <p className="text-sm font-medium">Aucun profil trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      {profils.map((profil) => (
        <ProfilItem
          key={profil.id}
          profil={profil}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
