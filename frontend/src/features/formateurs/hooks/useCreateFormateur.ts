import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Formateur, FormateurRequestDTO } from "@/types";
import { toast } from "react-hot-toast";

export const useCreateFormateur = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Formateur, FormateurRequestDTO>("/formateurs");

  return useMutation({
    mutationFn: (data: FormateurRequestDTO) => apiService.post(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formateurs"] });
      toast.success("Formateur créé avec succès");
    }
  });
};
