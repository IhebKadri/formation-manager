import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Formateur, FormateurRequestDTO } from "@/types";
import { toast } from "react-hot-toast";

export const useUpdateFormateur = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Formateur, FormateurRequestDTO>(`/formateurs/${id}`);

  return useMutation({
    mutationFn: (data: FormateurRequestDTO) => apiService.put(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formateurs"] });
      toast.success("Formateur mis à jour avec succès");
    }
  });
};
