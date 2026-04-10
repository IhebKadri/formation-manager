import { Route, Routes } from "react-router-dom";
import { MainPage } from "@/pages";
import { RequireAuth } from "./RequireAuth";
import { LoginPage } from "@/pages/LoginPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProfilePage } from "@/pages/ProfilePage";
import { UnderWork } from "@/components/common";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private Routes */}
      <Route element={<RequireAuth />}>
        <Route
          path="/"
          element={
            <AppLayout>
              <MainPage />
            </AppLayout>
          }
        />
        <Route
          path="/formations"
          element={
            <AppLayout>
              <UnderWork />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          }
        />
      </Route>
    </Routes>
  );
};
