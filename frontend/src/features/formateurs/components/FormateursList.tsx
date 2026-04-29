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
import type { Formateur } from "@/types";
import { sortableHeader } from "@/lib/table-utils";
import { Badge } from "@/components/ui/badge";

interface FormateursListProps {
  formateurs: Formateur[];
  isLoading: boolean;
  onEdit: (formateur: Formateur) => void;
  onDelete: (formateur: Formateur) => void;
}

export const FormateursList = ({
  formateurs,
  isLoading,
  onEdit,
  onDelete,
}: FormateursListProps) => {
  const columns: ColumnDef<Formateur>[] = [
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
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant={row.original.type === "INTERNE" ? "default" : "secondary"}>
          {row.original.type}
        </Badge>
      ),
    },
    {
      id: "employeur",
      header: "Employeur",
      accessorFn: (row) => row.employeurNom || "N/A",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const formateur = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(formateur)}>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(formateur)}
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
      data={formateurs}
      isLoading={isLoading}
      searchKey="prenom"
    />
  );
};
