import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfilForm } from "../forms/ProfilForm";
import type { CreateProfilRequest, Profil } from "@/types";

interface UpdateProfilDialogProps {
  profil: Profil;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateProfilRequest) => void;
  isLoading: boolean;
}

export const UpdateProfilDialog = ({
  profil,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateProfilDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le Profil</DialogTitle>
          <DialogDescription>
            Modifiez les informations du profil <strong>{profil.libelle}</strong>.
          </DialogDescription>
        </DialogHeader>
        <ProfilForm
          initialData={{ libelle: profil.libelle }}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
