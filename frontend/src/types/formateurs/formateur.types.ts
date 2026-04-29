export const TypeFormateur = {
  INTERNE: "INTERNE",
  EXTERNE: "EXTERNE",
} as const;

export type TypeFormateur = (typeof TypeFormateur)[keyof typeof TypeFormateur];

export interface Formateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  type: TypeFormateur;
  employeurId: string | null;
  employeurNom: string | null;
}

export interface FormateurRequestDTO {
  nom: string;
  prenom: string;
  email: string;
  tel?: string;
  type: TypeFormateur;
  employeurId?: string | null;
}
