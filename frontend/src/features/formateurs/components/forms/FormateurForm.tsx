import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formateurSchema,
  type FormateurFormValues,
  TypeFormateur,
} from "@/types";
import { useEmployeurs } from "@/features/employeur/hooks/useEmployeurs";

interface FormateurFormProps {
  initialData?: Partial<FormateurFormValues> | null;
  onSubmit: (values: FormateurFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const FormateurForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: FormateurFormProps) => {
  const { data: employeurs = [] } = useEmployeurs();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormateurFormValues>({
    resolver: zodResolver(formateurSchema),
    defaultValues: initialData || {
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      type: TypeFormateur.INTERNE,
      employeurId: null,
    },
  });

  const selectedType = watch("type");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="prenom">Prénom</Label>
          <Input
            id="prenom"
            placeholder="John"
            {...register("prenom")}
            error={errors.prenom?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            placeholder="Doe"
            {...register("nom")}
            error={errors.nom?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="john.doe@example.com"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tel">Téléphone</Label>
        <Input
          id="tel"
          placeholder="12345678"
          {...register("tel")}
          error={errors.tel?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TypeFormateur.INTERNE}>Interne</SelectItem>
                  <SelectItem value={TypeFormateur.EXTERNE}>Externe</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.type.message}
            </p>
          )}
        </div>

        {selectedType === TypeFormateur.EXTERNE && (
          <div className="space-y-2">
            <Label>Employeur</Label>
            <Controller
              control={control}
              name="employeurId"
              render={({ field }) => (
                <Select 
                    onValueChange={(val) => field.onChange(val === "none" ? null : val)} 
                    value={field.value || "none"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un employeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeurs.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.employeurId && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {errors.employeurId.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
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
