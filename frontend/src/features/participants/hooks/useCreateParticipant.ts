import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Participant, CreateParticipantRequest } from "@/types";

export const useCreateParticipant = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Participant, CreateParticipantRequest>(
    "/participants",
  );

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      toast.success("Participant ajouté avec succès");
    },
  });
};
