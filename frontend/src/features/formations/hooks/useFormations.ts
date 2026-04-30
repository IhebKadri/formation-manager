import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Formation } from "@/types";

export const useFormations = () => {
  const apiService = new ApiService<Formation[]>("/formations");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["formations"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
