import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmployeurForm } from "../forms/EmployeurForm";
import type { CreateEmployeurDTO } from "@/types";

interface CreateEmployeurDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateEmployeurDTO) => void;
  isLoading: boolean;
}

export const CreateEmployeurDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateEmployeurDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvel Employeur</DialogTitle>
          <DialogDescription>
            Ajoutez un nouvel employeur ou partenaire.
          </DialogDescription>
        </DialogHeader>
        <EmployeurForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
