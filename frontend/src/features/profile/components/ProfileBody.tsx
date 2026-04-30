import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import type { UserProfile } from "@/types";
import { ProfileForm } from "./ProfileForm";
import { ProfileStatusCard, ProfileSupportCard } from "./ProfileSidebar";

interface ProfileBodyProps {
  user: UserProfile;
}

export const ProfileBody = ({ user }: ProfileBodyProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Main edit card */}
    <Card className="lg:col-span-2 border-none shadow-md ring-1 ring-border/60 overflow-hidden">
      <CardHeader className="pb-2 pt-6 px-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary/10 text-primary shrink-0">
            <User className="h-4.5 w-4.5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold leading-tight">Modifier mon Profil</CardTitle>
            <CardDescription className="text-[12px] mt-0.5">
              Mettez à jour vos informations personnelles
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-8 pb-8 pt-4">
        <ProfileForm user={user} />
      </CardContent>
    </Card>

    {/* Sidebar */}
    <div className="space-y-5">
      <ProfileStatusCard user={user} />
      <ProfileSupportCard />
    </div>
  </div>
);
