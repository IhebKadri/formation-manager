import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StructureForm } from "../forms/StructureForm";
import type { CreateStructureRequest, Structure } from "@/types";

interface UpdateStructureDialogProps {
  structure: Structure;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateStructureRequest) => void;
  isLoading: boolean;
}

export const UpdateStructureDialog = ({
  structure,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateStructureDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier la Structure</DialogTitle>
          <DialogDescription>
            Modifiez les informations de la structure{" "}
            <strong>{structure.libelle}</strong>.
          </DialogDescription>
        </DialogHeader>
        <StructureForm
          initialData={{ libelle: structure.libelle }}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
