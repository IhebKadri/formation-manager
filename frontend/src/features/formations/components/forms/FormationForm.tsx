import { useEffect, useMemo } from "react";
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
  formationSchema,
  type FormationFormValues,
  type Formation,
} from "@/types";
import { useDomaines } from "@/features/domaine/hooks";
import { useFormateurs } from "@/features/formateurs/hooks";
import { useParticipants } from "@/features/participants/hooks";
import MultipleSelector, { type Option } from "@/components/ui/multi-select";

interface FormationFormProps {
  defaultValues?: Partial<Formation>;
  onSubmit: (values: FormationFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export const FormationForm = ({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Enregistrer",
}: FormationFormProps) => {
  const { data: domaines = [] } = useDomaines();
  const { data: formateurs = [] } = useFormateurs();
  const { data: participants = [] } = useParticipants();

  const participantOptions: Option[] = useMemo(
    () =>
      participants.map((p) => ({
        label: `${p.prenom} ${p.nom}`,
        value: p.id,
      })),
    [participants],
  );

  const form = useForm({
    resolver: zodResolver(formationSchema),
    defaultValues: useMemo(() => ({
      titre: defaultValues?.titre || "",
      annee: defaultValues?.annee || new Date().getFullYear(),
      duree: defaultValues?.duree || 1,
      budget: defaultValues?.budget || 0,
      domaineId: defaultValues?.domaine?.id || "",
      formateurId: defaultValues?.formateur?.id || null,
      participantIds: defaultValues?.participants?.map((p) => p.id) || [],
    }), [defaultValues]),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (defaultValues) {
      reset({
        titre: defaultValues.titre || "",
        annee: defaultValues.annee || new Date().getFullYear(),
        duree: defaultValues.duree || 1,
        budget: defaultValues.budget || 0,
        domaineId: defaultValues.domaine?.id || "",
        formateurId: defaultValues.formateur?.id || null,
        participantIds: defaultValues.participants?.map((p) => p.id) || [],
      });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titre">Titre</Label>
        <Input
          id="titre"
          placeholder="Titre de la formation"
          {...register("titre")}
          error={errors.titre?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="annee">Année</Label>
          <Input
            id="annee"
            type="number"
            {...register("annee", { valueAsNumber: true })}
            error={errors.annee?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duree">Durée (jours)</Label>
          <Input
            id="duree"
            type="number"
            {...register("duree", { valueAsNumber: true })}
            error={errors.duree?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          type="number"
          step="0.01"
          {...register("budget", { valueAsNumber: true })}
          error={errors.budget?.message}
        />
      </div>

      <div className="space-y-2">
        <Label>Domaine</Label>
        <Controller
          control={control}
          name="domaineId"
          render={({ field }) => (
            <Select
              key={domaines.length}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un domaine" />
              </SelectTrigger>
              <SelectContent>
                {domaines.map((domaine) => (
                  <SelectItem key={domaine.id} value={domaine.id}>
                    {domaine.libelle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.domaineId && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.domaineId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Formateur</Label>
        <Controller
          control={control}
          name="formateurId"
          render={({ field }) => (
            <Select
              key={formateurs.length}
              onValueChange={(val) =>
                field.onChange(val === "none" ? null : val)
              }
              value={field.value || "none"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un formateur (optionnel)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun</SelectItem>
                {formateurs.map((formateur) => (
                  <SelectItem key={formateur.id} value={formateur.id}>
                    {formateur.prenom} {formateur.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.formateurId && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.formateurId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Participants</Label>
        <Controller
          control={control}
          name="participantIds"
          render={({ field }) => (
            <MultipleSelector
              value={participantOptions.filter((opt) =>
                field.value.includes(opt.value),
              )}
              onChange={(options) =>
                field.onChange(options.map((opt) => opt.value))
              }
              options={participantOptions}
              placeholder="Sélectionner les participants"
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  Aucun participant trouvé.
                </p>
              }
            />
          )}
        />
        {errors.participantIds && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.participantIds.message}
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading} className="min-w-[100px]">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
