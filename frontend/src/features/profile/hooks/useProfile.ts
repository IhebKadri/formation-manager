import ApiService from "@/core/api/ApiService";
import type { UserProfile } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const apiService = new ApiService<UserProfile>("/users/me");

  return useQuery({
    queryFn: apiService.get,
    queryKey: ["my-profile"],
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
