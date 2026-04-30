import ApiService from "@/core/api/ApiService";
import type { UserPayload, UserProfile } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useUpdateProfile = () => {
  const apiService = new ApiService<UserProfile, UserPayload>("/users/me");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profil mis à jour avec succès !");
    },
  });
};
