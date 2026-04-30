import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, UserCog } from "lucide-react";
import type { UserProfile } from "@/types";

interface ProfileStatusCardProps {
  user: UserProfile;
}

const statusRows = (user: UserProfile) => [
  {
    label: "État du compte",
    value: (
      <span className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        Vérifié
      </span>
    ),
  },
  {
    label: "Type d'accès",
    value: (
      <span className="text-sm font-semibold flex items-center gap-1.5">
        <Lock className="h-3 w-3 text-muted-foreground" />
        {user.role === "ADMINISTRATEUR" ? "Total" : "Restreint"}
      </span>
    ),
  },
  {
    label: "Rôle",
    value: (
      <span className="text-sm font-semibold flex items-center gap-1.5">
        <UserCog className="h-3 w-3 text-muted-foreground" />
        {user.role.replace(/_/g, " ")}
      </span>
    ),
  },
];

export const ProfileStatusCard = ({ user }: ProfileStatusCardProps) => {
  return (
    <Card className="border-none shadow-md ring-1 ring-border/60 overflow-hidden">
      <CardHeader className="pb-3 pt-5 px-5">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Statut du compte
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 space-y-1">
        {statusRows(user).map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5 border-b border-dashed border-border/50 last:border-0"
          >
            <span className="text-sm text-muted-foreground">{row.label}</span>
            {row.value}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const ProfileSupportCard = () => {
  return (
    <div className="relative overflow-hidden p-5 rounded-2xl border border-primary/20 bg-primary/5">
      <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/10 blur-xl" />
      <div className="relative space-y-2">
        <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5" />
          Soutien Technique
        </h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Pour modifier vos permissions ou résoudre des problèmes d'accès, veuillez contacter votre administrateur système.
        </p>
      </div>
    </div>
  );
};
