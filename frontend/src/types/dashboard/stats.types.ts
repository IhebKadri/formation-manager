export interface UserRolePartition {
  role: string;
  count: number;
}

export interface FormationYearStats {
  year: number;
  count: number;
  budget: number;
}

export interface DomaineStats {
  domaine: string;
  count: number;
}

export interface StructureStats {
  structure: string;
  count: number;
}

export interface FormateurTypeStats {
  type: string;
  count: number;
}

export interface DomaineYearStats {
  year: number;
  domaine: string;
  count: number;
}

export interface Stats {
  totalUsers: number;
  totalProfils: number;
  totalStructures: number;
  totalParticipants: number;
  totalFormations: number;
  totalFormateurs: number;
  totalDomaines: number;
  totalEmployeurs: number;
  userRolePartition: UserRolePartition[];
  formationsByYear: FormationYearStats[];
  formationsByDomaine: DomaineStats[];
  participantsByStructure: StructureStats[];
  formateursByType: FormateurTypeStats[];
  formationsByDomaineAndYear: DomaineYearStats[];
}
