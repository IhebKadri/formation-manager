import type { Participant } from "../participants/participant.types";
import type { Domaine } from "../domaines/domaine.types";
import type { Formateur } from "../formateurs/formateur.types";

export interface Formation {
  id: string;
  titre: string;
  annee: number;
  duree: number;
  budget: number;
  domaine: Domaine;
  formateur: Formateur | null;
  participants: Participant[];
}

export interface FormationRequest {
  titre: string;
  annee: number;
  duree: number;
  budget: number;
  domaineId: string;
  formateurId?: string | null;
  participantIds?: string[];
}

export type CreateFormationRequest = FormationRequest;
export type UpdateFormationRequest = FormationRequest;
