import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Employeur } from "@/types";

export const useEmployeurs = () => {
  const apiService = new ApiService<Employeur[]>("/employeurs");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["employeurs"],
    staleTime: 1000 * 60 * 5,
  });
};
