import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ParticipantForm } from "../forms/ParticipantForm";
import type { ParticipantFormValues } from "@/types";

interface CreateParticipantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ParticipantFormValues) => void;
  isLoading: boolean;
}

export const CreateParticipantDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateParticipantDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouveau Participant</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau participant à la base de données.
          </DialogDescription>
        </DialogHeader>
        <ParticipantForm
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
