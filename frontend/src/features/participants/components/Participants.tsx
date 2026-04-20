import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticipantsList } from "./ParticipantsList";
import { CreateParticipantDialog } from "./dialogs/CreateParticipantDialog";
import { UpdateParticipantDialog } from "./dialogs/UpdateParticipantDialog";
import { DeleteParticipantDialog } from "./dialogs/DeleteParticipantDialog";
import {
  useParticipants,
  useCreateParticipant,
  useUpdateParticipant,
  useDeleteParticipant,
} from "../hooks";
import type {
  Participant,
  ParticipantFormValues,
  CreateParticipantRequest,
  UpdateParticipantRequest,
} from "@/types";

export const Participants = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingParticipant, setEditingParticipant] =
    useState<Participant | null>(null);
  const [deletingParticipant, setDeletingParticipant] =
    useState<Participant | null>(null);

  const { data: participants = [], isLoading } = useParticipants();
  const { mutate: createMutate, isPending: isCreating } =
    useCreateParticipant();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateParticipant(
    editingParticipant?.id || "",
  );
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteParticipant(
    deletingParticipant?.id || "",
  );

  const handleCreate = (values: ParticipantFormValues) => {
    createMutate(values as CreateParticipantRequest, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  const handleUpdate = (values: ParticipantFormValues) => {
    updateMutate(values as UpdateParticipantRequest, {
      onSuccess: () => setEditingParticipant(null),
    });
  };

  const handleDelete = () => {
    deleteMutate(undefined, {
      onSuccess: () => setDeletingParticipant(null),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Participants</h2>
          <p className="text-muted-foreground">
            Liste de tous les participants enregistrés.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Participant
        </Button>
      </div>

      <ParticipantsList
        participants={participants}
        isLoading={isLoading}
        onEdit={setEditingParticipant}
        onDelete={setDeletingParticipant}
      />

      <CreateParticipantDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        isLoading={isCreating}
      />

      {editingParticipant && (
        <UpdateParticipantDialog
          participant={editingParticipant}
          open={!!editingParticipant}
          onOpenChange={(open) => !open && setEditingParticipant(null)}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
        />
      )}

      {deletingParticipant && (
        <DeleteParticipantDialog
          open={!!deletingParticipant}
          onOpenChange={(open) => !open && setDeletingParticipant(null)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
          participantName={`${deletingParticipant.prenom} ${deletingParticipant.nom}`}
        />
      )}
    </div>
  );
};
