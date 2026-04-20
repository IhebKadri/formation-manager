import * as z from "zod";

export const participantSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  email: z
    .string()
    .min(1, "L'email est obligatoire")
    .email("Format d'email invalide")
    .refine((val) => /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val), {
      message:
        "L'extension de l'email (ex: .com, .fr) est manquante ou invalide",
    }),
  tel: z
    .string()
    .min(1, "Le numéro de téléphone est obligatoire")
    .transform((val) => val.replace(/[^0-9+]/g, ""))
    .pipe(
      z
        .string()
        .min(8, "Le numéro de téléphone doit contenir au moins 8 chiffres")
        .regex(
          /^\+?[1-9]\d{7,14}$/,
          "Format de téléphone invalide (ex: +21620123456)",
        ),
    ),
  structureId: z.string().min(1, "La structure est obligatoire"),
  profilId: z.string().min(1, "Le profil est obligatoire"),
});

export type ParticipantFormValues = z.infer<typeof participantSchema>;
