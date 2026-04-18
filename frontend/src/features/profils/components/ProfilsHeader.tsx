import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProfilsHeaderProps {
  onAdd: () => void;
}

export const ProfilsHeader = ({ onAdd }: ProfilsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profils</h1>
        <p className="text-muted-foreground">
          Gérez les catégories professionnelles des participants.
        </p>
      </div>
      <Button onClick={onAdd} className="gap-2 shadow-sm">
        <Plus className="size-4" />
        Nouveau Profil
      </Button>
    </div>
  );
};
