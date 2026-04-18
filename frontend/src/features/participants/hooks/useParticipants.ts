import ApiService from "@/core/api/ApiService";
import { useQuery } from "@tanstack/react-query";
import type { Participant } from "@/types";

export const useParticipants = () => {
  const apiService = new ApiService<Participant[]>("/participants");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["participants"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
