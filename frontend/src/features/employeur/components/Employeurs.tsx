import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EmployeurList } from "./EmployeurList";
import { CreateEmployeurDialog } from "./dialogs/CreateEmployeurDialog";
import { useEmployeurs, useCreateEmployeur } from "../hooks";

export function Employeurs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: employeurs = [], isLoading } = useEmployeurs();
  const { mutate, isPending } = useCreateEmployeur();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Employeurs</h2>
          <p className="text-sm text-muted-foreground">
            Liste des employeurs et partenaires
          </p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <Plus className="mr-2 size-4" />
          Nouvel Employeur
        </Button>
      </div>

      <EmployeurList employeurs={employeurs} isLoading={isLoading} />

      <CreateEmployeurDialog
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
