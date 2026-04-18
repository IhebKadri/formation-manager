import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StructureForm } from "../forms/StructureForm";
import type { CreateStructureRequest } from "@/types";

interface CreateStructureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateStructureRequest) => void;
  isLoading: boolean;
}

export const CreateStructureDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateStructureDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Structure</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle direction ou structure de formation à
            l'organisation.
          </DialogDescription>
        </DialogHeader>
        <StructureForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
