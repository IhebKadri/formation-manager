import { Briefcase, MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Profil } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfilItemProps {
  profil: Profil;
  onEdit: (profil: Profil) => void;
  onDelete: (profil: Profil) => void;
}

export const ProfilItem = ({ profil, onEdit, onDelete }: ProfilItemProps) => {
  const label = profil.libelle.toLowerCase();

  const getThemeColors = () => {
    if (
      label.includes("cadre") ||
      label.includes("supérieur") ||
      label.includes("superieur")
    ) {
      return "bg-info/10 text-info";
    }
    if (label.includes("technicien")) {
      return "bg-success/10 text-success";
    }
    if (label.includes("ouvrier")) {
      return "bg-warning/10 text-warning";
    }
    return "bg-muted text-muted-foreground";
  };

  return (
    <div
      key={profil.id}
      className="group flex items-center space-x-4 p-4 transition-colors hover:bg-muted/50"
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg p-2 ${getThemeColors()}`}
      >
        <Briefcase className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {profil.libelle}
        </h3>
        <p className="text-xs text-muted-foreground">Profil Professionnel</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => onEdit(profil)}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 size-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete(profil)}
            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
          >
            <Trash2 className="mr-2 size-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
