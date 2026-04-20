import { Landmark } from "lucide-react";
import type { Structure } from "@/types/structures/structure.types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { UpdateStructureDialog } from "./dialogs/UpdateStructureDialog";
import { DeleteStructureDialog } from "./dialogs/DeleteStructureDialog";
import { useUpdateStructure, useDeleteStructure } from "../hooks";
import { StructureCard } from "./StructureCard";

interface StructureListProps {
  structures: Structure[];
  isLoading: boolean;
}

export function StructureList({ structures, isLoading }: StructureListProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const selectedForUpdate = structures.find((s) => s.id === updatingId);
  const selectedForDelete = structures.find((s) => s.id === deletingId);

  if (isLoading) {
    return (
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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
        {structures.map((structure) => {
          return (
            <StructureCard
              structure={structure}
              setUpdatingId={setUpdatingId}
              setDeletingId={setDeletingId}
            />
          );
        })}

        {structures.length === 0 && (
          <div className="flex h-32 flex-col items-center justify-center text-muted-foreground">
            <Landmark className="mb-2 size-8 opacity-20" />
            <p className="text-sm">Aucune structure trouvée</p>
          </div>
        )}
      </div>

      {selectedForUpdate && (
        <UpdateStructureWrapper
          structure={selectedForUpdate}
          open={!!updatingId}
          onOpenChange={(open) => !open && setUpdatingId(null)}
        />
      )}

      {selectedForDelete && (
        <DeleteStructureWrapper
          structure={selectedForDelete}
          open={!!deletingId}
          onOpenChange={(open) => !open && setDeletingId(null)}
        />
      )}
    </>
  );
}

// Wrapper components to handle hook lifecycle correctly since we can't call hooks conditionally
function UpdateStructureWrapper({
  structure,
  open,
  onOpenChange,
}: {
  structure: Structure;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutate, isPending } = useUpdateStructure(structure.id);
  return (
    <UpdateStructureDialog
      structure={structure}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={(data) => {
        mutate(data, {
          onSuccess: () => onOpenChange(false),
        });
      }}
      isLoading={isPending}
    />
  );
}

function DeleteStructureWrapper({
  structure,
  open,
  onOpenChange,
}: {
  structure: Structure;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { mutate, isPending } = useDeleteStructure(structure.id);
  return (
    <DeleteStructureDialog
      structureName={structure.libelle}
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={() => {
        mutate(undefined, {
          onSuccess: () => onOpenChange(false),
        });
      }}
      isLoading={isPending}
    />
  );
}
