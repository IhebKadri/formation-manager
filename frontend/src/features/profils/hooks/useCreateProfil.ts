import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Profil, CreateProfilRequest } from "@/types";

export const useCreateProfil = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Profil, CreateProfilRequest>("/profils");

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profils"] });
      toast.success("Profil créé avec succès");
    },
  });
};
