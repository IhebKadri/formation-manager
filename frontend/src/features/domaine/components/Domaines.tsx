import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DomaineList } from "./DomaineList";
import { CreateDomaineDialog } from "./dialogs/CreateDomaineDialog";
import { useDomaines, useCreateDomaine } from "../hooks";

export function Domaines() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: domaines = [], isLoading } = useDomaines();
  const { mutate, isPending } = useCreateDomaine();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Domaines</h2>
          <p className="text-sm text-muted-foreground">
            Liste des domaines de formation
          </p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Plus className="mr-2 size-4" />
          Nouveau Domaine
        </Button>
      </div>

      <DomaineList domaines={domaines} isLoading={isLoading} />

      <CreateDomaineDialog
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
