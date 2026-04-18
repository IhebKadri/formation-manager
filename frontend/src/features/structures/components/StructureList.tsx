import { Building2, Landmark, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Structure } from "@/types/structures/structure.types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UpdateStructureDialog } from "./dialogs/UpdateStructureDialog";
import { DeleteStructureDialog } from "./dialogs/DeleteStructureDialog";
import { useUpdateStructure, useDeleteStructure } from "../hooks";

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
          const isCentrale = structure.libelle.toLowerCase().includes("centrale");
          const isRegionale =
            structure.libelle.toLowerCase().includes("région") ||
            structure.libelle.toLowerCase().includes("region") ||
            structure.libelle.toLowerCase().includes("régionale");

          return (
            <div
              key={structure.id}
              className="group flex items-center space-x-4 p-4 transition-colors hover:bg-muted/50"
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-lg p-2 ${
                  isCentrale
                    ? "bg-info/10 text-info"
                    : isRegionale
                      ? "bg-success/10 text-success"
                      : "bg-muted-foreground/10 text-muted-foreground"
                }`}
              >
                {isCentrale ? (
                  <Building2 className="size-5" />
                ) : isRegionale ? (
                  <MapPin className="size-5" />
                ) : (
                  <Landmark className="size-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {structure.libelle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isCentrale
                    ? "Direction Centrale"
                    : isRegionale
                      ? "Direction Régionale"
                      : "Structure de formation"}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full"
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setUpdatingId(structure.id)}>
                    <Pencil className="mr-2 size-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => setDeletingId(structure.id)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
