
export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

class TokenStorage {
  getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
  }

  getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
  }

  setTokens(tokens: AuthTokens) {
    localStorage.setItem(ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  }

  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
}

export const tokenStorage = new TokenStorage();
