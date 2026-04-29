import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteEmployeur = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<void>(`/employeurs/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeurs"] });
      toast.success("Employeur supprimé avec succès");
    },
  });
};
