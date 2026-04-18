import { useState } from "react";
import { ProfilsHeader } from "./ProfilsHeader";
import { ProfilsList } from "./ProfilsList";
import { CreateProfilDialog } from "./dialogs/CreateProfilDialog";
import { UpdateProfilDialog } from "./dialogs/UpdateProfilDialog";
import { DeleteProfilDialog } from "./dialogs/DeleteProfilDialog";
import {
  useProfils,
  useCreateProfil,
  useUpdateProfil,
  useDeleteProfil,
} from "../hooks";
import type { Profil } from "@/types";

export const Profils = () => {
  const { data: profils, isLoading } = useProfils();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProfil, setEditingProfil] = useState<Profil | null>(null);
  const [deletingProfil, setDeletingProfil] = useState<Profil | null>(null);

  const { mutate: CreateMutate, isPending: CreatePending } = useCreateProfil();
  const { mutate: UpdateMutate, isPending: UpdatePending } = useUpdateProfil(
    editingProfil?.id || "",
  );
  const { mutate: DeleteMutate, isPending: DeletePending } = useDeleteProfil(
    deletingProfil?.id || "",
  );

  return (
    <div className="space-y-6">
      <ProfilsHeader onAdd={() => setIsCreateOpen(true)} />

      <ProfilsList
        profils={profils}
        isLoading={isLoading}
        onEdit={(p) => setEditingProfil(p)}
        onDelete={(p) => setDeletingProfil(p)}
      />

      <CreateProfilDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={(data) => {
          CreateMutate(data, {
            onSuccess: () => setIsCreateOpen(false),
          });
        }}
        isLoading={CreatePending}
      />

      {editingProfil && (
        <UpdateProfilDialog
          profil={editingProfil}
          open={!!editingProfil}
          onOpenChange={(open) => !open && setEditingProfil(null)}
          onSubmit={(data) => {
            UpdateMutate(data, {
              onSuccess: () => setEditingProfil(null),
            });
          }}
          isLoading={UpdatePending}
        />
      )}

      {deletingProfil && (
        <DeleteProfilDialog
          profilName={deletingProfil.libelle}
          open={!!deletingProfil}
          onOpenChange={(open) => !open && setDeletingProfil(null)}
          onConfirm={() => {
            DeleteMutate(undefined, {
              onSuccess: () => setDeletingProfil(null),
            });
          }}
          isLoading={DeletePending}
        />
      )}
    </div>
  );
};
