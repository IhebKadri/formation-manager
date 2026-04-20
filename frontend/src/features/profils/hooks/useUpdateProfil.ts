import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Profil, CreateProfilRequest } from "@/types";

export const useUpdateProfil = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Profil, CreateProfilRequest>(
    `/profils/${id}`,
  );

  return useMutation({
    mutationFn: apiService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profils"] });
      toast.success("Profil mis à jour avec succès");
    },
  });
};
