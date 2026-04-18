import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateStructureRequest } from "@/types/structures/structure.types";

interface StructureFormProps {
  initialData?: CreateStructureRequest | null;
  onSubmit: SubmitHandler<CreateStructureRequest>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const StructureForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: StructureFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStructureRequest>({
    defaultValues: initialData || {
      libelle: "",
    },
  });

  const submit = (data: CreateStructureRequest) => {
    onSubmit(data);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 pt-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="libelle">Libellé de la structure</Label>
          <Input
            id="libelle"
            placeholder="Ex: Direction Centrale"
            {...register("libelle", {
              required: "Le libellé est requis",
              minLength: {
                value: 2,
                message: "Le libellé doit contenir au moins 2 caractères",
              },
              maxLength: {
                value: 100,
                message: "Le libellé doit contenir au plus 100 caractères",
              },
            })}
          />
          {errors.libelle && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.libelle.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
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
