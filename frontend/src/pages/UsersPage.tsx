import { Button } from "@/components/ui/button";
import { DeleteUserDialog } from "@/features/users/components/dialogs/DeleteUserDialog";
import { UserDialog } from "@/features/users/components/dialogs/UserDialog";
import { UsersTable } from "@/features/users/components/UsersTable";
import type { UserProfile } from "@/types";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: UserProfile) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (user: UserProfile) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <p className="text-muted-foreground text-sm">
            Gestion des Utilisateurs
          </p>
        </div>

        <Button className="gap-2" onClick={handleAdd}>
          <UserPlus size={18} />
          Nouveau Utilisateur
        </Button>
      </div>

      <UsersTable onEdit={handleEdit} onDelete={handleDelete} />

      {/* Dialogs */}
      <UserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
      />

      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={selectedUser}
      />
    </div>
  );
};
