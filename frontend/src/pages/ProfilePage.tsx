import { useProfile } from "@/features/profile/hooks/useProfile";
import {
  ProfileHeader,
  ProfileBody,
  ProfileSkeleton,
} from "@/features/profile/components";

export const ProfilePage = () => {
  const { data: user, isLoading, error } = useProfile();

  if (isLoading) return <ProfileSkeleton />;

  if (error || !user) {
    return (
      <div className="container mx-auto py-20 text-center space-y-3">
        <p className="text-4xl">⚠️</p>
        <h2 className="text-2xl font-bold text-destructive">Erreur de chargement</h2>
        <p className="text-sm text-muted-foreground">Impossible de charger votre profil. Veuillez réessayer.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ProfileHeader user={user} />
      <ProfileBody user={user} />
    </div>
  );
};
