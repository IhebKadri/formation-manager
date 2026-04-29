import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormationsList } from "./FormationsList";
import { CreateFormationDialog } from "./dialogs/CreateFormationDialog";
import { UpdateFormationDialog } from "./dialogs/UpdateFormationDialog";
import { DeleteFormationDialog } from "./dialogs/DeleteFormationDialog";
import {
  useFormations,
  useCreateFormation,
  useUpdateFormation,
  useDeleteFormation,
} from "../hooks";
import type {
  Formation,
  FormationFormValues,
  CreateFormationRequest,
  UpdateFormationRequest,
} from "@/types";

export const Formations = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFormation, setEditingFormation] =
    useState<Formation | null>(null);
  const [deletingFormation, setDeletingFormation] =
    useState<Formation | null>(null);

  const { data: formations = [], isLoading } = useFormations();
  const { mutate: createMutate, isPending: isCreating } =
    useCreateFormation();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateFormation(
    editingFormation?.id || "",
  );
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteFormation(
    deletingFormation?.id || "",
  );

  const handleCreate = (values: FormationFormValues) => {
    createMutate(values as CreateFormationRequest, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  const handleUpdate = (values: FormationFormValues) => {
    updateMutate(values as UpdateFormationRequest, {
      onSuccess: () => setEditingFormation(null),
    });
  };

  const handleDelete = () => {
    deleteMutate(undefined, {
      onSuccess: () => setDeletingFormation(null),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Formations</h2>
          <p className="text-muted-foreground">
            Liste de toutes les formations prévues ou réalisées.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle Formation
        </Button>
      </div>

      <FormationsList
        formations={formations}
        isLoading={isLoading}
        onEdit={setEditingFormation}
        onDelete={setDeletingFormation}
      />

      <CreateFormationDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />

      {editingFormation && (
        <UpdateFormationDialog
          formation={editingFormation}
          open={!!editingFormation}
          onOpenChange={(open) => !open && setEditingFormation(null)}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
        />
      )}

      {deletingFormation && (
        <DeleteFormationDialog
          open={!!deletingFormation}
          onOpenChange={(open) => !open && setDeletingFormation(null)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          formationTitle={deletingFormation.titre}
        />
      )}
    </div>
  );
};
