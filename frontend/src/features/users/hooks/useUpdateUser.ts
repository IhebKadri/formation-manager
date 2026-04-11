import ApiService from "@/core/api/ApiService";
import type { UserPayload, UserProfile } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useUpdateUser = (id: string) => {
  const apiService = new ApiService<UserProfile, UserPayload>(`/users/${id}`);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.put,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", id], exact: true });
      toast.success("Utilisateur mis à jour avec succès !");
    },
  });
};
