import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, ShieldCheck, ShieldAlert, UserCheck } from "lucide-react";
import type { UserProfile } from "@/types";

interface ProfileHeaderProps {
  user: UserProfile;
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case "ADMINISTRATEUR":
      return <ShieldCheck className="h-3.5 w-3.5 mr-1" />;
    case "RESPONSABLE":
      return <UserCheck className="h-3.5 w-3.5 mr-1" />;
    default:
      return <ShieldAlert className="h-3.5 w-3.5 mr-1" />;
  }
};

const getRoleVariant = (role: string): "destructive" | "default" | "secondary" => {
  switch (role) {
    case "ADMINISTRATEUR":
      return "destructive";
    case "RESPONSABLE":
      return "default";
    default:
      return "secondary";
  }
};

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row items-center gap-8 bg-card p-8 rounded-2xl border shadow-sm">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-110" />
        <Avatar className="relative h-28 w-28 border-4 border-background ring-2 ring-primary/20 shadow-2xl">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${user.login}&background=random&bold=true&size=128`}
            alt={user.login}
          />
          <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
            {user.login.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {/* Online indicator */}
        <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background shadow-sm" />
      </div>

      {/* Info */}
      <div className="space-y-3 text-center md:text-left">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {user.login}
          </h1>
          <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1.5 mt-1">
            <Fingerprint className="h-3.5 w-3.5 opacity-60" />
            <span className="font-mono text-[11px] bg-muted px-2 py-0.5 rounded-md tracking-wider">
              {user.id}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          <Badge
            variant={getRoleVariant(user.role)}
            className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest flex items-center gap-0.5 rounded-full"
          >
            {getRoleIcon(user.role)}
            {user.role.replace(/_/g, " ")}
          </Badge>
          <Badge
            variant="outline"
            className="px-3 py-1 text-[10px] font-semibold bg-green-500/10 text-green-600 border-green-500/20 rounded-full flex items-center gap-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Actif
          </Badge>
        </div>
      </div>
    </div>
  );
};
