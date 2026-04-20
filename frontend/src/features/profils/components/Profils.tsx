import { useState } from "react";
import { ProfilsList } from "./ProfilsList";
import { CreateProfilDialog } from "./dialogs/CreateProfilDialog";
import { UpdateProfilDialog } from "./dialogs/UpdateProfilDialog";
import { DeleteProfilDialog } from "./dialogs/DeleteProfilDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Profils</h2>
          <p className="text-sm text-muted-foreground">
            Gestion des profils professionnels
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Plus className="mr-2 size-4" />
          Nouveau Profil
        </Button>
      </div>

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
