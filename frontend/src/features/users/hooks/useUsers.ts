import ApiService from "@/core/api/ApiService";
import type { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const apiService = new ApiService<UserProfile[]>("/users");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["users"],
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
