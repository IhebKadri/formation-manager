export type UserRole = "SIMPLE_UTILISATEUR" | "ADMINISTRATEUR" | "RESPONSABLE";

export type UserProfile = {
  id: string;
  login: string;
  email: string;
  role: UserRole;
};

export type UserPayload = {
  id?: string;
  login: string;
  email: string;
  password?: string;
  role: UserRole;
};
