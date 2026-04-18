import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateProfilRequest } from "@/types";

interface ProfilFormProps {
  initialData?: CreateProfilRequest | null;
  onSubmit: SubmitHandler<CreateProfilRequest>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProfilForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ProfilFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfilRequest>({
    defaultValues: initialData || {
      libelle: "",
    },
  });

  const submit = (data: CreateProfilRequest) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 pt-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="libelle">Nom du Profil</Label>
          <Input
            id="libelle"
            placeholder="Ex: Cadre Supérieur"
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
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="min-w-[100px]"
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
};
