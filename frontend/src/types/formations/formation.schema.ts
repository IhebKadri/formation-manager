import * as z from "zod";

export const formationSchema = z.object({
  titre: z.string().min(2, "Le titre doit contenir au moins 2 caractères"),
  annee: z.coerce.number().min(2000, "Année invalide"),
  duree: z.coerce.number().min(1, "La durée doit être d'au moins 1 jour"),
  budget: z.coerce.number().min(0, "Le budget ne peut pas être négatif"),
  domaineId: z.string().min(1, "Le domaine est obligatoire"),
  formateurId: z.string().nullish(),
  participantIds: z.array(z.string()).default([]),
});

export type FormationFormValues = z.infer<typeof formationSchema>;
