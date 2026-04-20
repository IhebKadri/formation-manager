import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Profil } from "@/types";

export const useProfils = () => {
  const apiService = new ApiService<Profil[]>("/profils");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["profils"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
