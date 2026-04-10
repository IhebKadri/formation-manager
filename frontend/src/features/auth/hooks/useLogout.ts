import { tokenStorage } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    tokenStorage.clear();
    queryClient.clear();

    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  return { logout };
};