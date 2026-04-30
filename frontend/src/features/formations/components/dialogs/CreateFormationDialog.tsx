import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormationForm } from "../forms/FormationForm";
import type { FormationFormValues } from "@/types";

interface CreateFormationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: FormationFormValues) => void;
  isLoading: boolean;
}

export const CreateFormationDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateFormationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle Formation</DialogTitle>
        </DialogHeader>
        <FormationForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitLabel="Créer la formation"
        />
      </DialogContent>
    </Dialog>
  );
};
