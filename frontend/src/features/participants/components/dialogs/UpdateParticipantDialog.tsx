import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ParticipantForm } from "../forms/ParticipantForm";
import type { Participant, ParticipantFormValues } from "@/types";

interface UpdateParticipantDialogProps {
  participant: Participant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ParticipantFormValues) => void;
  isLoading: boolean;
}

export const UpdateParticipantDialog = ({
  participant,
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: UpdateParticipantDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier le Participant</DialogTitle>
          <DialogDescription>
            Modifier les informations de <strong>{participant.prenom} {participant.nom}</strong>.
          </DialogDescription>
        </DialogHeader>
        <ParticipantForm
          initialData={{
            nom: participant.nom,
            prenom: participant.prenom,
            email: participant.email,
            tel: participant.tel,
            structureId: participant.structure.id,
            profilId: participant.profil.id,
          }}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
