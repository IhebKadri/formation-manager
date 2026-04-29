import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateEmployeurDTO } from "@/types";

interface EmployeurFormProps {
  initialData?: CreateEmployeurDTO | null;
  onSubmit: SubmitHandler<CreateEmployeurDTO>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EmployeurForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: EmployeurFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEmployeurDTO>({
    defaultValues: initialData || {
      nom: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom de l'employeur</Label>
          <Input
            id="nom"
            placeholder="Ex: Entreprise X"
            {...register("nom", {
              required: "Le nom est requis",
              minLength: { value: 2, message: "Minimum 2 caractères" },
              maxLength: { value: 100, message: "Maximum 100 caractères" },
            })}
          />
          {errors.nom && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.nom.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading} className="min-w-[100px]">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
