import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import type { UserPayload, UserProfile } from "@/types";
import { useEffect } from "react";

interface ProfileFormProps {
  user: UserProfile;
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserPayload>({
    defaultValues: {
      login: user.login,
      email: user.email,
      password: "",
    },
  });

  useEffect(() => {
    reset({ login: user.login, email: user.email, password: "" });
  }, [user, reset]);

  const onSubmit = (data: UserPayload) => {
    const payload = { ...data };
    if (!payload.password) delete payload.password;
    updateProfile(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Login Field */}
        <div className="space-y-2">
          <Label htmlFor="login">Nom d'utilisateur</Label>
          <Input
            id="login"
            {...register("login", {
              required: "Le nom d'utilisateur est obligatoire",
              minLength: { value: 3, message: "3 caractères minimum" },
              maxLength: { value: 50, message: "50 caractères maximum" },
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
            {...register("email", {
              required: "L'adresse email est obligatoire",
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

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Nouveau mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="Laissez vide pour conserver le mot de passe actuel"
            {...register("password", {
              minLength: { value: 6, message: "6 caractères minimum" },
            })}
          />
          {errors.password && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button in the 4th position */}
        <div className="flex items-center justify-end">
          <Button type="submit" isLoading={isPending} disabled={!isDirty} className="w-full md:w-auto">
            Enregistrer
          </Button>
        </div>
      </div>
    </form>
  );
};
