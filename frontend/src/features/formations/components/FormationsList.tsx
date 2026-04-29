import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/common/DataTable";
import type { Formation } from "@/types";
import { sortableHeader } from "@/lib/table-utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormationsListProps {
  formations: Formation[];
  isLoading: boolean;
  onEdit: (formation: Formation) => void;
  onDelete: (formation: Formation) => void;
}

export const FormationsList = ({
  formations,
  isLoading,
  onEdit,
  onDelete,
}: FormationsListProps) => {
  const columns: ColumnDef<Formation>[] = [
    {
      accessorKey: "titre",
      header: sortableHeader("Titre"),
    },
    {
      accessorKey: "annee",
      header: sortableHeader("Année"),
    },
    {
      id: "domaine",
      accessorFn: (row) => row.domaine?.libelle,
      header: "Domaine",
    },
    {
      id: "formateur",
      accessorFn: (row) => row.formateur ? `${row.formateur.prenom} ${row.formateur.nom}` : "N/A",
      header: "Formateur",
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budget"));
        const formatted = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "TND",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "participants",
      header: "Participants",
      cell: ({ row }) => {
        const participants = row.original.participants || [];
        const count = participants.length;
        
        if (count === 0) {
          return (
            <Badge variant="outline" className="text-muted-foreground">
              Aucun
            </Badge>
          );
        }

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <Badge variant="secondary" className="gap-1 px-2 py-0.5 hover:bg-secondary/80">
                    <Users className="h-3 w-3" />
                    {count}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] p-2">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-semibold mb-1 border-b pb-1">Participants</p>
                  {participants.map((p) => (
                    <span key={p.id} className="text-[10px] truncate">
                      • {p.prenom} {p.nom}
                    </span>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const formation = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(formation)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(formation)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={formations}
      isLoading={isLoading}
      searchKey="titre"
    />
  );
};
