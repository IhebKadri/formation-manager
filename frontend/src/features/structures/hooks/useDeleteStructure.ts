import ApiService from "@/core/api/ApiService";
import type { UserProfile } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteStructure = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<UserProfile>(`/structures/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["structures"] });
      toast.success("Structure supprimée avec succès !");
    },
  });
};
