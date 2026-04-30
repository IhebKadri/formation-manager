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
      email: "",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Login Field */}
        <div className="space-y-2">
          <Label htmlFor="login">Nom d'utilisateur</Label>
          <Input
            id="login"
            placeholder="jean.dupont"
            disabled={isEdit}
            {...register("login", {
              required: !isEdit && "Le nom d'utilisateur est obligatoire",
              minLength: {
                value: 3,
                message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
              },
            })}
          />
          {errors.login && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.login.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jean.dupont@example.com"
            disabled={isEdit}
            {...register("email", {
              required: !isEdit && "L'adresse email est obligatoire",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "L'adresse email doit être valide",
              },
            })}
          />
          {errors.email && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.email.message}
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

        {!isEdit && (
          <div className="md:col-span-2 rounded-md bg-blue-50 p-4 border border-blue-200">
            <p className="text-sm text-blue-700">
              Un mot de passe aléatoire sera généré et envoyé par email à l'utilisateur.
            </p>
          </div>
        )}
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
          {isEdit ? "Mettre à jour le rôle" : "Créer l'utilisateur"}
        </Button>
      </div>
    </form>
  );
};
