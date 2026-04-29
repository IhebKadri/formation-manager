import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DomaineForm } from "../forms/DomaineForm";
import type { Domaine, CreateDomaineDTO } from "@/types";

interface UpdateDomaineDialogProps {
  domaine: Domaine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDomaineDTO) => void;
  isLoading: boolean;
}

export const UpdateDomaineDialog = ({
  domaine,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateDomaineDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le Domaine</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations du domaine.
          </DialogDescription>
        </DialogHeader>
        <DomaineForm
          initialData={{ libelle: domaine.libelle }}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
