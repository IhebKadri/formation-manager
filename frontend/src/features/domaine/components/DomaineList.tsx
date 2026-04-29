import { BookOpen } from "lucide-react";
import type { Domaine } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { DomaineCard } from "./DomaineCard";
import { UpdateDomaineDialog } from "./dialogs/UpdateDomaineDialog";
import { DeleteDomaineDialog } from "./dialogs/DeleteDomaineDialog";
import { useUpdateDomaine, useDeleteDomaine } from "../hooks";

interface DomaineListProps {
  domaines: Domaine[];
  isLoading: boolean;
}

export function DomaineList({ domaines, isLoading }: DomaineListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const selectedForUpdate = domaines.find((d) => d.id === updatingId);
  const selectedForDelete = domaines.find((d) => d.id === deletingId);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateDomaine(
    updatingId || "",
  );
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteDomaine(
    deletingId || "",
  );

  if (isLoading) {
    return (
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {domaines.map((domaine) => (
          <DomaineCard
            key={domaine.id}
            domaine={domaine}
            setUpdatingId={setUpdatingId}
            setDeletingId={setDeletingId}
          />
        ))}

        {domaines.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
            <BookOpen className="mb-4 size-12 opacity-20" />
            <p className="text-sm font-medium">Aucun domaine trouvé</p>
          </div>
        )}
      </div>

      {selectedForUpdate && (
        <UpdateDomaineDialog
          domaine={selectedForUpdate}
          open={!!updatingId}
          onOpenChange={(open) => !open && setUpdatingId(null)}
          onSubmit={(data) => {
            updateMutate(data, {
              onSuccess: () => setUpdatingId(null),
            });
          }}
          isLoading={isUpdating}
        />
      )}

      {selectedForDelete && (
        <DeleteDomaineDialog
          domaineName={selectedForDelete.libelle}
          open={!!deletingId}
          onOpenChange={(open) => !open && setDeletingId(null)}
          onConfirm={() => {
            deleteMutate(undefined, {
              onSuccess: () => setDeletingId(null),
            });
          }}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
