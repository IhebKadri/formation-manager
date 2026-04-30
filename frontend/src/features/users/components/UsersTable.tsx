import { type ColumnDef } from "@tanstack/react-table";
import { sortableHeader } from "@/lib/table-utils";
import { useUsers } from "../hooks/useUsers";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, Edit, Trash } from "lucide-react";
import type { UserProfile } from "@/types";
import { DataTable } from "@/components/common/DataTable";

interface UsersTableProps {
  onEdit: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
}

export function UsersTable({ onEdit, onDelete }: UsersTableProps) {
  const { data: users, isLoading } = useUsers();

  const columns: ColumnDef<UserProfile>[] = [
    {
      accessorKey: "login",
      header: sortableHeader("Utilisateur"),
    },
    {
      accessorKey: "email",
      header: sortableHeader("Email"),
    },
    {
      accessorKey: "role",
      header: sortableHeader("Rôle"),
      cell: ({ row }) => (
        <span className="capitalize">
          {row.getValue<string>("role").toLowerCase().replace("_", " ")}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(user)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete(user)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable columns={columns} data={users || []} isLoading={isLoading} />
  );
}
