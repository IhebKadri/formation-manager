/* eslint-disable @typescript-eslint/no-explicit-any */

import type { AxiosResponse } from "axios";
import apiClient from "./ApiClient";

class ApiService<TData, TInput = void> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (params?: Record<string, any>) =>
    apiClient.get<TData>(this.endpoint, { params }).then((res) => res.data);

  post = (input: TInput) =>
    apiClient
      .post<TInput, AxiosResponse<TData>>(this.endpoint, input)
      .then((res) => res.data);

  patch = (input: TInput) =>
    apiClient
      .patch<TInput, AxiosResponse<TData>>(this.endpoint, input)
      .then((res) => res.data);

  put = (input: TInput) =>
    apiClient
      .put<TInput, AxiosResponse<TData>>(this.endpoint, input)
      .then((res) => res.data);

  delete = () => apiClient.delete<unknown>(this.endpoint).then((res) => res.data);
}

export default ApiService;