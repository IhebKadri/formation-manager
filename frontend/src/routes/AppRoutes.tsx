import { Route, Routes } from "react-router-dom";
import { MainPage } from "@/pages";
import { RequireAuth } from "./RequireAuth";
import { LoginPage } from "@/pages/LoginPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProfilePage } from "@/pages/ProfilePage";
import { UnderWork } from "@/components/common";
import { RequireRole } from "./RequireRole";
import { UsersPage } from "@/pages/UsersPage";
import ReferentialPage from "@/pages/ReferentialPage";
import ParticipantsPage from "@/pages/ParticipantsPage";

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
            <RequireRole roles={["ADMINISTRATEUR", "SIMPLE_UTILISATEUR"]}>
              <AppLayout>
                <UnderWork />
              </AppLayout>
            </RequireRole>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireRole
              roles={["RESPONSABLE", "ADMINISTRATEUR", "SIMPLE_UTILISATEUR"]}
            >
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </RequireRole>
          }
        />
        <Route
          path="/users"
          element={
            <RequireRole roles={["ADMINISTRATEUR"]}>
              <AppLayout>
                <UsersPage />
              </AppLayout>
            </RequireRole>
          }
        />
        <Route
          path="/referentials"
          element={
            <RequireRole roles={["ADMINISTRATEUR", "SIMPLE_UTILISATEUR"]}>
              <AppLayout>
                <ReferentialPage />
              </AppLayout>
            </RequireRole>
          }
        />
        <Route
          path="/participants"
          element={
            <RequireRole roles={["ADMINISTRATEUR", "SIMPLE_UTILISATEUR"]}>
              <AppLayout>
                <ParticipantsPage />
              </AppLayout>
            </RequireRole>
          }
        />
      </Route>
    </Routes>
  );
};
