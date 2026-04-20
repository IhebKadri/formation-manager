import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfilForm } from "../forms/ProfilForm";
import type { CreateProfilRequest } from "@/types";

interface CreateProfilDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateProfilRequest) => void;
  isLoading: boolean;
}

export const CreateProfilDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateProfilDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau Profil</DialogTitle>
          <DialogDescription>
            Créez un nouveau profil professionnel pour organiser les participants aux formations.
          </DialogDescription>
        </DialogHeader>
        <ProfilForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
