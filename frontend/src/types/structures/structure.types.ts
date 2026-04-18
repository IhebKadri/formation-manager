import { UUID } from "../auth/auth.types";

export interface Structure {
  id: UUID;
  libelle: string;
}

export interface CreateStructureRequest {
  libelle: string;
}
