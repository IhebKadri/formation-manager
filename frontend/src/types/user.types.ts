export type UserRole = "SIMPLE_UTILISATEUR" | "ADMINISTRATEUR" | "RESPONSABLE";

export type UserProfile = {
  id: string;
  login: string;
  role: UserRole;
};
