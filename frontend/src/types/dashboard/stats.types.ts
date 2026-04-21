export interface UserRolePartition {
  role: string;
  count: number;
}

export interface Stats {
  totalUsers: number;
  totalProfils: number;
  totalStructures: number;
  totalParticipants: number;
  userRolePartition: UserRolePartition[];
}
