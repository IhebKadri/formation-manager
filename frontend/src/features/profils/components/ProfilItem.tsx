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

  // Color mapping based on hierarchy
  const getThemeColors = () => {
    if (label.includes("cadre") || label.includes("supérieur") || label.includes("superieur")) {
      return "bg-info/10 text-info border-info/20";
    }
    if (label.includes("technicien")) {
      return "bg-success/10 text-success border-success/20";
    }
    if (label.includes("ouvrier")) {
      return "bg-warning/10 text-warning border-warning/20";
    }
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="group relative flex items-center justify-between p-5 rounded-2xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex items-center gap-4">
        <div className={`flex size-12 items-center justify-center rounded-xl border transition-transform group-hover:scale-110 ${getThemeColors()}`}>
          <Briefcase className="size-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {profil.libelle}
          </h3>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
            Profil Professionnel
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full hover:bg-muted"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => onEdit(profil)} className="cursor-pointer">
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
