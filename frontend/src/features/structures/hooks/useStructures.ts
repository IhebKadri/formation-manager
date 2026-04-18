import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Structure } from "@/types/structures/structure.types";

export const useStructures = () => {
  const apiService = new ApiService<Structure[]>("/structures");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["structures"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
