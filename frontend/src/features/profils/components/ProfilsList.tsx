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
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (profils.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
        <Briefcase className="mb-4 size-12 opacity-20" />
        <p className="text-sm font-medium">Aucun profil trouvé</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
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
