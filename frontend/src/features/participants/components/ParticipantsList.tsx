import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/common/DataTable";
import type { Participant } from "@/types";
import { sortableHeader } from "@/lib/table-utils";

interface ParticipantsListProps {
  participants: Participant[];
  isLoading: boolean;
  onEdit: (participant: Participant) => void;
  onDelete: (participant: Participant) => void;
}

export const ParticipantsList = ({
  participants,
  isLoading,
  onEdit,
  onDelete,
}: ParticipantsListProps) => {
  const columns: ColumnDef<Participant>[] = [
    {
      accessorKey: "prenom",
      header: sortableHeader("Prenom"),
    },
    {
      accessorKey: "nom",
      header: sortableHeader("Nom"),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "tel",
      header: "Téléphone",
    },
    {
      id: "structure",
      header: "Structure",
      accessorFn: (row) => row.structure.libelle,
    },
    {
      id: "profil",
      header: "Profil",
      accessorFn: (row) => row.profil.libelle,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const participant = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(participant)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(participant)}
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
      data={participants}
      isLoading={isLoading}
      searchKey="prenom"
    />
  );
};
