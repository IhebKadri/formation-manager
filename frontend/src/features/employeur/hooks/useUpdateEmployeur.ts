import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Employeur, CreateEmployeurDTO } from "@/types";
import { toast } from "react-hot-toast";

export const useUpdateEmployeur = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Employeur, CreateEmployeurDTO>(
    `/employeurs/${id}`,
  );

  return useMutation({
    mutationFn: apiService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeurs"] });
      toast.success("Employeur mis à jour avec succès");
    },
  });
};
