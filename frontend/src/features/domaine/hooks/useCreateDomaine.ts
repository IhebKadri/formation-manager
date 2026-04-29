import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Domaine, CreateDomaineDTO } from "@/types";
import { toast } from "react-hot-toast";

export const useCreateDomaine = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Domaine, CreateDomaineDTO>("/domaines");

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domaines"] });
      toast.success("Domaine créé avec succès");
    }
  });
};
