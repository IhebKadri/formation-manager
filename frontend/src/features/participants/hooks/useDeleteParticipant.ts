import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Participant } from "@/types";

export const useDeleteParticipant = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Participant>(`/participants/${id}`);

  return useMutation({
    mutationFn: apiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      toast.success("Participant supprimé avec succès");
    },
  });
};
