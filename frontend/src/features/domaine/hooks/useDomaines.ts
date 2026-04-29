import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Domaine } from "@/types";

export const useDomaines = () => {
  const apiService = new ApiService<Domaine[]>("/domaines");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["domaines"],
    staleTime: 1000 * 60 * 5,
  });
};
