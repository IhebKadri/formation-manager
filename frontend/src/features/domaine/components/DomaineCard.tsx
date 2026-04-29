import { BookOpen, MoreVertical, Edit2, Trash2 } from "lucide-react";
import type { Domaine } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DomaineCardProps {
  domaine: Domaine;
  setUpdatingId: (id: string) => void;
  setDeletingId: (id: string) => void;
}

export function DomaineCard({
  domaine,
  setUpdatingId,
  setDeletingId,
}: DomaineCardProps) {
  return (
    <div
      key={domaine.id}
      className="group flex items-center space-x-4 p-4 transition-colors hover:bg-muted/50"
    >
      <div className="flex shrink-0 items-center justify-center rounded-lg p-2 bg-primary/10 text-primary transition-colors">
        <BookOpen className="size-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-none">{domaine.libelle}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Domaine de formation
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0 ">
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => setUpdatingId(domaine.id)}
            className="cursor-pointer"
          >
            <Edit2 className="mr-2 size-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeletingId(domaine.id)}
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
