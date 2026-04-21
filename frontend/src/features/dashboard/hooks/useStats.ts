import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Stats } from "@/types/dashboard/stats.types";

export const useStats = () => {
  const apiService = new ApiService<Stats>("/stats");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["stats"],
    refetchInterval: 1000 * 60, // 1 minute
  });
};
