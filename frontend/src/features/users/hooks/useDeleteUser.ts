import ApiService from "@/core/api/ApiService";
import type { UserProfile } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<UserProfile>(`/users/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Utilisateur supprimé avec succès !");
    },
  });
};
