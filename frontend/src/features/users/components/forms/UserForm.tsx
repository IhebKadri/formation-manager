import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserPayload, UserRole } from "@/types";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

interface UserFormProps {
  initialData?: UserPayload | null;
  onSubmit: SubmitHandler<UserPayload>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ROLES: { label: string; value: UserRole }[] = [
  { label: "Administrateur", value: "ADMINISTRATEUR" },
  { label: "Responsable", value: "RESPONSABLE" },
  { label: "Utilisateur simple", value: "SIMPLE_UTILISATEUR" },
];

export const UserForm = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: UserFormProps) => {
  const isEdit = !!initialData?.id;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserPayload>({
    defaultValues: initialData || {
      login: "",
      role: "SIMPLE_UTILISATEUR",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
      <div className="space-y-4">
        {/* Login Field */}
        <div className="space-y-2">
          <Label htmlFor="login">Nom d'utilisateur</Label>
          <Input
            id="login"
            placeholder="jean.dupont"
            {...register("login", {
              required: "L'identifiant est requis",
              minLength: {
                value: 3,
                message: "L'identifiant doit contenir au moins 3 caractères",
              },
              maxLength: {
                value: 50,
                message: "L'identifiant doit contenir au plus 50 caractères",
              },
            })}
          />
          {errors.login && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.login.message}
            </p>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <Label htmlFor="role">Rôle</Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Le rôle est requis" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="role" className="w-full h-10">
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.role.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">
            Mot de passe{" "}
            {isEdit && (
              <span className="text-muted-foreground text-xs font-normal">
                (Optionnel pour la modification)
              </span>
            )}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder={isEdit ? "••••••••" : "Entrez le mot de passe"}
            {...register("password", {
              required: isEdit ? false : "Le mot de passe est requis",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères",
              },
            })}
            error={errors.password?.message}
          />
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
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? "Mettre à jour" : "Créer l'utilisateur"}
        </Button>
      </div>
    </form>
  );
};
