import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteFormateur = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<void>(`/formateurs/${id}`);

  return useMutation({
    mutationFn: () => apiService.delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formateurs"] });
      toast.success("Formateur supprimé avec succès");
    }
  });
};
