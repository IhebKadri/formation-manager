import { StructureList } from "./StructureList";
import type { Structure } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateStructureDialog } from "./dialogs/CreateStructureDialog";
import { useCreateStructure } from "../hooks";

interface StructuresProps {
  structures: Structure[];
  isLoading: boolean;
}

export function Structures({ structures, isLoading }: StructuresProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate, isPending } = useCreateStructure();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Structures</h2>
          <p className="text-sm text-muted-foreground">
            Liste des directions et structures de formation
          </p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Plus className="mr-2 size-4" />
          Nouvelle Structure
        </Button>
      </div>

      <StructureList structures={structures} isLoading={isLoading} />

      <CreateStructureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={(data) => {
          mutate(data, {
            onSuccess: () => setIsDialogOpen(false),
          });
        }}
        isLoading={isPending}
      />
    </div>
  );
}
