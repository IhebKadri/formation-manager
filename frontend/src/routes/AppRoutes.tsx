import { Route, Routes } from "react-router-dom";
import { MainPage } from "@/pages";
import { RequireAuth } from "./RequireAuth";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainPage />} />

      {/* Private Routes */}
      <Route element={<RequireAuth />}></Route>
    </Routes>
  );
};
