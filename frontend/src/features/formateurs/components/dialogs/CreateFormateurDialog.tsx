import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormateurForm } from "../forms/FormateurForm";
import type { FormateurFormValues } from "@/types";

interface CreateFormateurDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormateurFormValues) => void;
  isLoading: boolean;
}

export const CreateFormateurDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateFormateurDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau Formateur</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau formateur interne ou externe.
          </DialogDescription>
        </DialogHeader>
        <FormateurForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
