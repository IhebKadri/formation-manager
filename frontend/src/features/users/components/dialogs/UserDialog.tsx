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
  const { mutate: updateUser, isPending: isUpdatePending } = useUpdateUser(
    user?.id,
  );

  const isEdit = !!user;
  const isLoading = isCreatePending || isUpdatePending;

  const handleSubmit = (data: UserPayload) => {
    if (isEdit && user) {
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
            {isEdit ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifiez les informations de l'utilisateur."
              : "Remplissez le formulaire pour créer un nouvel utilisateur."}
          </DialogDescription>
        </DialogHeader>
        <UserForm
          initialData={
            user
              ? {
                  id: user.id,
                  login: user.login,
                  role: user.role,
                }
              : null
          }
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
