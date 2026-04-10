import type { LoginPayload } from "@/types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogin } from "../../hooks";

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      login: "JohnDoe",
      password: "Password123",
    },
  });

  const onSubmit = (values: LoginPayload) => {
    mutate(values);
  };

  return (
    <Card className="w-full sm:w-md p-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-2"
        >
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Nom d'utilisateur</Label>
            <Input
              id="name"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              {...register("login", {
                required: "nom d'utilisateur est obligatoire",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              error={errors.login?.message}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              {...register("password", {
                required: "Le mot de passe est obligatoire",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              error={errors.password?.message}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size={"lg"}
            isLoading={isPending}
            className="w-full"
          >
            Se connecter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
