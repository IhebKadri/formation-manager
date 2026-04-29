import ApiService from "@/core/api/ApiService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Employeur, CreateEmployeurDTO } from "@/types";
import { toast } from "react-hot-toast";

export const useCreateEmployeur = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Employeur, CreateEmployeurDTO>(
    "/employeurs",
  );

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeurs"] });
      toast.success("Employeur créé avec succès");
    }
  });
};
