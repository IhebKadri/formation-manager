import type { UserProfile } from "./user.types";

export type LoginPayload = {
  login: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
};

export type RefreshTokenPayload = {
  refreshToken: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};
