import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";

export const useDeleteFormation = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<void>(`/formations/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      toast.success("Formation supprimée avec succès");
    },
  });
};
