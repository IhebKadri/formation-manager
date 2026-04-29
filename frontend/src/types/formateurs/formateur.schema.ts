import * as z from "zod";
import { TypeFormateur } from "./formateur.types";

export const formateurSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Format d'email invalide"),
  tel: z.string().regex(/^[0-9]{8}$/, "Le téléphone doit contenir 8 chiffres").optional().or(z.literal("")),
  type: z.nativeEnum(TypeFormateur),
  employeurId: z.string().optional().nullable(),
}).refine((data) => {
  if (data.type === TypeFormateur.EXTERNE) {
    return !!data.employeurId;
  }
  return true;
}, {
  message: "L'employeur est obligatoire pour un formateur externe",
  path: ["employeurId"],
});

export type FormateurFormValues = z.infer<typeof formateurSchema>;
