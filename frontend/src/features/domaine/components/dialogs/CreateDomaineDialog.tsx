import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DomaineForm } from "../forms/DomaineForm";
import type { CreateDomaineDTO } from "@/types";

interface CreateDomaineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDomaineDTO) => void;
  isLoading: boolean;
}

export const CreateDomaineDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateDomaineDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau Domaine</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau domaine de formation.
          </DialogDescription>
        </DialogHeader>
        <DomaineForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
