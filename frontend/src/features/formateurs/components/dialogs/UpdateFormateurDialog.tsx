import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormateurForm } from "../forms/FormateurForm";
import type { Formateur, FormateurFormValues } from "@/types";

interface UpdateFormateurDialogProps {
  formateur: Formateur;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormateurFormValues) => void;
  isLoading: boolean;
}

export const UpdateFormateurDialog = ({
  formateur,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateFormateurDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier le Formateur</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations du formateur.
          </DialogDescription>
        </DialogHeader>
        <FormateurForm
          initialData={formateur}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
