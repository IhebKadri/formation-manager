import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ApiService from "@/core/api/ApiService";
import type {
  Structure,
  CreateStructureRequest,
} from "@/types/structures/structure.types";

export const useCreateStructure = () => {
  const queryClient = useQueryClient();
  const apiService = new ApiService<Structure, CreateStructureRequest>(
    "/structures",
  );

  return useMutation({
    mutationFn: apiService.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["structures"] });
      toast.success("Structure créée avec succès");
    },
  });
};
