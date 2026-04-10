import type { LoginPayload, LoginResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenStorage } from "@/services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ApiService from "@/core/api/ApiService";

export const useLogin = () => {
  const navigate = useNavigate();
  const apiService = new ApiService<LoginResponse, LoginPayload>("/auth/login");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.post,

    onSuccess: (data) => {
      const { user } = data;
      const tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
      tokenStorage.setTokens(tokens);
      queryClient.setQueryData(["my-profile"], data.user);

      toast.success(`Bienvenue ${user.login} with role ${user.role}!`);

      navigate("/");
    },
  });
};
