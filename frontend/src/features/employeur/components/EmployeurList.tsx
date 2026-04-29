import { Building } from "lucide-react";
import type { Employeur } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { EmployeurCard } from "./EmployeurCard";
import { UpdateEmployeurDialog } from "./dialogs/UpdateEmployeurDialog";
import { DeleteEmployeurDialog } from "./dialogs/DeleteEmployeurDialog";
import { useUpdateEmployeur, useDeleteEmployeur } from "../hooks";

interface EmployeurListProps {
  employeurs: Employeur[];
  isLoading: boolean;
}

export function EmployeurList({ employeurs, isLoading }: EmployeurListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const selectedForUpdate = employeurs.find((e) => e.id === updatingId);
  const selectedForDelete = employeurs.find((e) => e.id === deletingId);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateEmployeur(
    updatingId || "",
  );
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteEmployeur(
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

  if (employeurs.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
        <Building className="mb-4 size-12 opacity-20" />
        <p className="text-sm font-medium">Aucun employeur trouvé</p>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {employeurs.map((employeur) => (
          <EmployeurCard
            key={employeur.id}
            employeur={employeur}
            setUpdatingId={setUpdatingId}
            setDeletingId={setDeletingId}
          />
        ))}
      </div>

      {selectedForUpdate && (
        <UpdateEmployeurDialog
          employeur={selectedForUpdate}
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
        <DeleteEmployeurDialog
          employeurName={selectedForDelete.nom}
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
