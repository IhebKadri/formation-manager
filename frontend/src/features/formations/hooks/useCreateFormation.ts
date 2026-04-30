import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Formation, CreateFormationRequest } from "@/types";

export const useCreateFormation = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Formation, CreateFormationRequest>(
    "/formations",
  );

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      toast.success("Formation ajoutée avec succès");
    },
  });
};
