import type { Structure } from "@/types";
import {
  Building2,
  Landmark,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const StructureCard = ({
  structure,
  setUpdatingId,
  setDeletingId,
}: {
  structure: Structure;
  setUpdatingId: (id: string) => void;
  setDeletingId: (id: string) => void;
}) => {
  const isCentrale = structure.libelle.toLowerCase().includes("centrale");
  const isRegionale =
    structure.libelle.toLowerCase().includes("région") ||
    structure.libelle.toLowerCase().includes("region") ||
    structure.libelle.toLowerCase().includes("régionale");

  return (
    <div
      key={structure.id}
      className="group flex items-center space-x-4 p-4 transition-colors hover:bg-muted/50"
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg p-2 ${
          isCentrale
            ? "bg-info/10 text-info"
            : isRegionale
              ? "bg-success/10 text-success"
              : "bg-muted-foreground/10 text-muted-foreground"
        }`}
      >
        {isCentrale ? (
          <Building2 className="size-5" />
        ) : isRegionale ? (
          <MapPin className="size-5" />
        ) : (
          <Landmark className="size-5" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">
          {structure.libelle}
        </p>
        <p className="text-xs text-muted-foreground">
          {isCentrale
            ? "Direction Centrale"
            : isRegionale
              ? "Direction Régionale"
              : "Structure de formation"}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => setUpdatingId(structure.id)}>
            <Pencil className="mr-2 size-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={() => setDeletingId(structure.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
