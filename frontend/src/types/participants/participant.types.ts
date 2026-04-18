import type { Structure } from "../structures/structure.types";
import type { Profil } from "../profils/profils.types";

export interface Participant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  structure: Structure;
  profil: Profil;
}

export interface ParticipantRequest {
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  structureId: string;
  profilId: string;
}

// Keeping names consistent with other features for the specific request interfaces
export type CreateParticipantRequest = ParticipantRequest;
export type UpdateParticipantRequest = ParticipantRequest;
