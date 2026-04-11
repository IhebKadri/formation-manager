import type { UserProfile } from "../users/user.types";

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
