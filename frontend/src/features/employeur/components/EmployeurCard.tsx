import { Building, MoreVertical, Edit2, Trash2 } from "lucide-react";
import type { Employeur } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface EmployeurCardProps {
  employeur: Employeur;
  setUpdatingId: (id: string) => void;
  setDeletingId: (id: string) => void;
}

export function EmployeurCard({
  employeur,
  setUpdatingId,
  setDeletingId,
}: EmployeurCardProps) {
  return (
    <div
      key={employeur.id}
      className="group flex items-center space-x-4 p-4 transition-colors hover:bg-muted/50"
    >
      <div className="flex shrink-0 items-center justify-center rounded-lg p-2 bg-success/10 text-success transition-colors">
        <Building className="size-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none">{employeur.nom}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Partenaire / Employeur
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => setUpdatingId(employeur.id)}
            className="cursor-pointer"
          >
            <Edit2 className="mr-2 size-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeletingId(employeur.id)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
