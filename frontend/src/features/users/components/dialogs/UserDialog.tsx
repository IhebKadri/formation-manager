import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserPayload, UserProfile } from "@/types";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { UserForm } from "../forms/UserForm";

interface UserDialogProps {
  user?: UserProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UserDialog = ({ user, open, onOpenChange }: UserDialogProps) => {
  const { mutate: createUser, isPending: isCreatePending } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdatePending } = useUpdateUser(user?.id);

  const isEdit = !!user;
  const isLoading = isCreatePending || isUpdatePending;

  const handleSubmit = (data: UserPayload) => {
    if (isEdit) {
      updateUser(data);
    } else {
      createUser(data);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier le rôle" : "Nouvel utilisateur"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifiez le rôle de cet utilisateur."
              : "Remplissez le formulaire pour créer un nouvel utilisateur."}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          initialData={user}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
