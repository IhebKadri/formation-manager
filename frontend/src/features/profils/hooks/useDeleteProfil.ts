import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Profil } from "@/types";

export const useDeleteProfil = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Profil>(`/profils/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profils"] });
      toast.success("Profil supprimé avec succès");
    },
  });
};
