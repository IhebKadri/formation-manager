import { useProfile } from "@/features/profile/hooks/useProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Shield,
  Fingerprint,
  Settings,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ProfilePage = () => {
  const { data: user, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 text-center md:text-left">
            <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
            <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold text-destructive">Erreur</h2>
        <p className="text-muted-foreground">
          Impossible de charger le profil.
        </p>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMINISTRATEUR":
        return <ShieldCheck className="h-4 w-4 mr-1" />;
      case "RESPONSABLE":
        return <UserCheck className="h-4 w-4 mr-1" />;
      default:
        return <ShieldAlert className="h-4 w-4 mr-1" />;
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "ADMINISTRATEUR":
        return "destructive";
      case "RESPONSABLE":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-card p-8 rounded-2xl border shadow-sm transition-all hover:shadow-md">
        <Avatar className="h-28 w-28 border-4 border-primary/10 ring-4 ring-background shadow-xl">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${user.login}`}
            alt={user.login}
          />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
            {user.login.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-3 text-center md:text-left">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              {user.login}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start">
              <Fingerprint className="h-4 w-4 mr-2 opacity-70" />
              ID:{" "}
              <span className="font-mono text-xs ml-1 bg-muted px-1.5 py-0.5 rounded">
                {user.id}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <Badge
              variant={getRoleVariant(user.role)}
              className="px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center"
            >
              {getRoleIcon(user.role)}
              {user.role.replace("_", " ")}
            </Badge>
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs font-medium bg-background"
            >
              Actif
            </Badge>
          </div>
        </div>

        <div className="md:ml-auto">
          <button className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors shadow-sm">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Account Details */}
        <Card className="lg:col-span-2 overflow-hidden border-none shadow-lg ring-1 ring-border">
          <CardHeader className="pb-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  Informations du compte
                </CardTitle>
                <CardDescription>
                  Détails de votre profil utilisateur
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="w-full max-w-xs space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 bottom-5 peer-disabled:opacity-50">
                    <User className="size-4" />
                    <span className="sr-only">Username</span>
                  </div>
                  <Input
                    id="username"
                    type="text"
                    value={user.login}
                    className="peer"
                    disabled
                  />
                </div>
              </div>

              <div className="w-full max-w-xs space-y-2">
                <Label htmlFor="username">Role</Label>
                <div className="relative">
                  <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 bottom-5 peer-disabled:opacity-50">
                    <Shield className="size-4" />
                    <span className="sr-only">Role</span>
                  </div>
                  <Input
                    id="role"
                    type="text"
                    value={user.role}
                    className="peer"
                    disabled
                  />
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Sécurité & Accès
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Votre compte est configuré avec le rôle{" "}
                <span className="font-semibold text-foreground">
                  {user.role.toLowerCase()}
                </span>
                . Ceci détermine vos permissions de lecture, d'écriture et de
                gestion au sein de la plateforme.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status Card */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg ring-1 ring-border overflow-hidden group">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Statut du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                <span className="text-sm text-muted-foreground">État</span>
                <span className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                  Vérifié
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-dashed last:border-0">
                <span className="text-sm text-muted-foreground">
                  Type d'accès
                </span>
                <span className="text-sm font-semibold">
                  {user.role === "ADMINISTRATEUR" ? "Total" : "Restreint"}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-inner">
            <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2 uppercase tracking-tighter">
              <ShieldCheck className="h-4 w-4" />
              Soutien Technique
            </h4>
            <p className="text-xs text-muted-foreground leading-tight">
              Si vous avez besoin de changer vos permissions ou rencontrez des
              difficultés d'accès, veuillez contacter l'administrateur système.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
