/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { tokenStorage } from "@/services";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

/* ------------------------------------------------
   Request → Attach Access Token
------------------------------------------------ */

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ------------------------------------------------
   Response → Refresh Token Handling
------------------------------------------------ */

const AUTH_EXCLUDED = ["/auth/login", "/auth/refresh"];

let isRefreshing = false;
let queue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const resolveQueue = (error: unknown, token?: string) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  queue = [];
};

apiClient.interceptors.response.use(
  (res) => res,

  async (error: AxiosError<{ error: { message: string } }>) => {
    const original = error.config as any;
    const url = error.config?.url || "";

    const statusCode = error.response?.status;
    const data = error.response?.data;
    console.log(data);

    if (statusCode === 400 || statusCode === 422) {
      toast.error(
        data?.error?.message || "Une erreur est survenue lors de la validation",
      );
      return;
    }

    if (statusCode === 500) {
      toast.error(
        data?.error?.message ||
          "Un problème est survenu de notre côté. Veuillez réessayer dans quelques instants.",
      );
      return;
    }

    if (
      statusCode === 401 &&
      !original._retry &&
      !AUTH_EXCLUDED.some((p) => url.includes(p))
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        tokenStorage.setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        resolveQueue(null, data.accessToken);

        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(original);
      } catch (err) {
        resolveQueue(err);
        tokenStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
