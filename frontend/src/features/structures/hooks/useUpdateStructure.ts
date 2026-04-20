import ApiService from "@/core/api/ApiService";
import type { Structure, CreateStructureRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useUpdateStructure = (id: string) => {
  const apiService = new ApiService<Structure, CreateStructureRequest>(
    `/structures/${id}`,
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiService.put,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["structures"] });
      toast.success("Structure mise à jour avec succès !");
    },
  });
};
