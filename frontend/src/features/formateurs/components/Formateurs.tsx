import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormateursList } from "./FormateursList";
import { CreateFormateurDialog } from "./dialogs/CreateFormateurDialog";
import { UpdateFormateurDialog } from "./dialogs/UpdateFormateurDialog";
import { DeleteFormateurDialog } from "./dialogs/DeleteFormateurDialog";
import {
  useFormateurs,
  useCreateFormateur,
  useUpdateFormateur,
  useDeleteFormateur,
} from "../hooks";
import type { Formateur } from "@/types";

export const Formateurs = () => {
  const { data: formateurs = [], isLoading } = useFormateurs();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingFormateur, setEditingFormateur] = useState<Formateur | null>(null);
  const [deletingFormateur, setDeletingFormateur] = useState<Formateur | null>(null);

  const { mutate: createMutate, isPending: isCreatePending } = useCreateFormateur();
  
  // These hooks are instantiated but we only call mutate when we have an ID
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateFormateur(
    editingFormateur?.id || ""
  );
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteFormateur(
    deletingFormateur?.id || ""
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Formateurs</h2>
          <p className="text-muted-foreground">
            Gérez vos formateurs internes et externes
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau Formateur
        </Button>
      </div>

      <FormateursList
        formateurs={formateurs}
        isLoading={isLoading}
        onEdit={(f) => setEditingFormateur(f)}
        onDelete={(f) => setDeletingFormateur(f)}
      />

      <CreateFormateurDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={(data) => {
          createMutate(data, {
            onSuccess: () => setIsCreateOpen(false),
          });
        }}
        isLoading={isCreatePending}
      />

      {editingFormateur && (
        <UpdateFormateurDialog
          formateur={editingFormateur}
          open={!!editingFormateur}
          onOpenChange={(open) => !open && setEditingFormateur(null)}
          onSubmit={(data) => {
            updateMutate(data, {
              onSuccess: () => setEditingFormateur(null),
            });
          }}
          isLoading={isUpdatePending}
        />
      )}

      {deletingFormateur && (
        <DeleteFormateurDialog
          formateurName={`${deletingFormateur.prenom} ${deletingFormateur.nom}`}
          open={!!deletingFormateur}
          onOpenChange={(open) => !open && setDeletingFormateur(null)}
          onConfirm={() => {
            deleteMutate(undefined, {
              onSuccess: () => setDeletingFormateur(null),
            });
          }}
          isLoading={isDeletePending}
        />
      )}
    </div>
  );
};
