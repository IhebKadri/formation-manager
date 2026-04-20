import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Participant, UpdateParticipantRequest } from "@/types";

export const useUpdateParticipant = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Participant, UpdateParticipantRequest>(
    `/participants/${id}`,
  );

  return useMutation({
    mutationFn: apiService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      toast.success("Participant mis à jour avec succès");
    },
  });
};
