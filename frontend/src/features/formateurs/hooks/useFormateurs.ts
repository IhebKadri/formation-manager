import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Formateur } from "@/types";

export const useFormateurs = () => {
  const apiService = new ApiService<Formateur[]>("/formateurs");

  return useQuery({
    queryKey: ["formateurs"],
    queryFn: apiService.get,
    staleTime: 1000 * 60 * 5,
  });
};
