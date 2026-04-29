import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ApiService from "@/core/api/ApiService";
import type { Formation, UpdateFormationRequest } from "@/types";

export const useUpdateFormation = (id: string) => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Formation, UpdateFormationRequest>(
    `/formations/${id}`,
  );

  return useMutation({
    mutationFn: apiService.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formations"] });
      toast.success("Formation mise à jour avec succès");
    },
  });
};
