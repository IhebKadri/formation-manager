import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Domaine, CreateDomaineDTO } from "@/types";
import { toast } from "react-hot-toast";

export const useUpdateDomaine = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Domaine, CreateDomaineDTO>(`/domaines/${id}`);

  return useMutation({
    mutationFn: apiService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domaines"] });
      toast.success("Domaine mis à jour avec succès");
    }
  });
};
