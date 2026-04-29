import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteDomaine = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<void>(`/domaines/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domaines"] });
      toast.success("Domaine supprimé avec succès");
    }
  });
};
