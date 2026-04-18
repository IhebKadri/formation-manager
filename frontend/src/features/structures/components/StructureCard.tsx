import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Landmark,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Structure } from "@/types/structures/structure.types";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UpdateStructureDialog } from "./dialogs/UpdateStructureDialog";
import { DeleteStructureDialog } from "./dialogs/DeleteStructureDialog";
import { useUpdateStructure, useDeleteStructure } from "../hooks";

interface StructureCardProps {
  structure: Structure;
}

export function StructureCard({ structure }: StructureCardProps) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: updateStructure, isPending: isUpdating } = useUpdateStructure(
    structure.id,
  );
  const { mutate: deleteStructure, isPending: isDeleting } = useDeleteStructure(
    structure.id,
  );

  const isCentrale = structure.libelle.toLowerCase().includes("centrale");
  const isRegionale =
    structure.libelle.toLowerCase().includes("région") ||
    structure.libelle.toLowerCase().includes("region") ||
    structure.libelle.toLowerCase().includes("régionale");

  return (
    <>
      <Card className="group relative overflow-hidden transition-all hover:scale-[1.02] hover:bg-muted/50">
        <div
          className={`absolute inset-y-0 left-0 w-1.5 transition-colors ${
            isCentrale
              ? "bg-info"
              : isRegionale
                ? "bg-success"
                : "bg-muted-foreground"
          }`}
        />

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div
              className={`rounded-xl p-2.5 transition-colors ${
                isCentrale
                  ? "bg-info/10 text-info"
                  : isRegionale
                    ? "bg-success/10 text-success"
                    : "bg-muted-foreground/10 text-muted-foreground"
              }`}
            >
              {isCentrale ? (
                <Building2 className="size-6" />
              ) : isRegionale ? (
                <MapPin className="size-6" />
              ) : (
                <Landmark className="size-6" />
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>
                  <Pencil className="mr-2 size-4" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="mr-2 size-4" />
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <CardTitle className="mb-1 text-lg font-bold leading-tight line-clamp-2">
            {structure.libelle}
          </CardTitle>
          <CardDescription className="text-xs font-medium uppercase tracking-wider opacity-70">
            {isCentrale
              ? "Direction Centrale"
              : isRegionale
                ? "Direction Régionale"
                : "Structure"}
          </CardDescription>
        </CardContent>

        <div
          className={`absolute -right-4 -top-4 size-24 blur-3xl transition-opacity opacity-20 group-hover:opacity-40 pointer-events-none ${
            isCentrale
              ? "bg-info"
              : isRegionale
                ? "bg-success"
                : "bg-muted-foreground"
          }`}
        />
      </Card>

      <UpdateStructureDialog
        structure={structure}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
        onSubmit={(data) => {
          updateStructure(data, {
            onSuccess: () => setIsUpdateOpen(false),
          });
        }}
        isLoading={isUpdating}
      />

      <DeleteStructureDialog
        structureName={structure.libelle}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => {
          deleteStructure(undefined, {
            onSuccess: () => setIsDeleteOpen(false),
          });
        }}
        isLoading={isDeleting}
      />
    </>
  );
}
