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
  participantSchema,
  type ParticipantFormValues,
} from "@/types/participants/participant.schema";
import { useStructures } from "@/features/structures/hooks";
import { useProfils } from "@/features/profils/hooks";

interface ParticipantFormProps {
  initialData?: Partial<ParticipantFormValues> | null;
  onSubmit: (values: ParticipantFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ParticipantForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ParticipantFormProps) => {
  const { data: structures = [] } = useStructures();
  const { data: profils = [] } = useProfils();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantSchema),
    defaultValues: initialData || {
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      structureId: "",
      profilId: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="+216 ..."
          {...register("tel")}
          error={errors.tel?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Structure</Label>
          <Controller
            control={control}
            name="structureId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une structure" />
                </SelectTrigger>
                <SelectContent>
                  {structures.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.structureId && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.structureId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Profil</Label>
          <Controller
            control={control}
            name="profilId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un profil" />
                </SelectTrigger>
                <SelectContent>
                  {profils.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.profilId && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.profilId.message}
            </p>
          )}
        </div>
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
