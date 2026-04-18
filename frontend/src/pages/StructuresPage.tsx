import { Button } from "@/components/ui/button";
import { Structures, useStructures } from "@/features/structures";
import { CreateStructureDialog } from "@/features/structures/components/dialogs/CreateStructureDialog";
import { StructureView } from "@/features/structures/components/StructureView";
import { useCreateStructure } from "@/features/structures/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function StructuresPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate, isPending } = useCreateStructure();
  const { data: structures, isLoading } = useStructures();
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Structures</h1>
          <p className="text-muted-foreground text-sm">
            Gestion des Structures
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus size={18} />
            Nouvelle Structure
          </Button>
          <StructureView view={view} setView={setView} />
        </div>
      </div>
      <Structures view={view} structures={structures} isLoading={isLoading} />
      <CreateStructureDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={(data) => mutate(data)}
        isLoading={isPending}
      />
    </div>
  );
}
