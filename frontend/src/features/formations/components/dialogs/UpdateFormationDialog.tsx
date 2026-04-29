import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormationForm } from "../forms/FormationForm";
import type { Formation, FormationFormValues } from "@/types";

interface UpdateFormationDialogProps {
  formation: Formation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormationFormValues) => void;
  isLoading: boolean;
}

export const UpdateFormationDialog = ({
  formation,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateFormationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la Formation</DialogTitle>
        </DialogHeader>
        <FormationForm
          key={formation.id}
          defaultValues={formation}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitLabel="Mettre à jour"
        />
      </DialogContent>
    </Dialog>
  );
};
