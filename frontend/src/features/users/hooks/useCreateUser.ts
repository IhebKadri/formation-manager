import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import type { UserPayload, UserProfile } from "@/types";

export const useCreateUser = () => {
  const apiService = new ApiService<UserProfile, UserPayload>("/users");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilisateur enregistré avec succès !");
    },
  });
};
