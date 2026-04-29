import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmployeurForm } from "../forms/EmployeurForm";
import type { Employeur, CreateEmployeurDTO } from "@/types";

interface UpdateEmployeurDialogProps {
  employeur: Employeur;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateEmployeurDTO) => void;
  isLoading: boolean;
}

export const UpdateEmployeurDialog = ({
  employeur,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateEmployeurDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier l'Employeur</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de l'employeur.
          </DialogDescription>
        </DialogHeader>
        <EmployeurForm
          initialData={{ nom: employeur.nom }}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
