import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { RequireRole } from "./RequireRole";
import {
  ReferentialPage,
  ParticipantsPage,
  FormateursPage,
  MainPage,
  UsersPage,
  LoginPage,
  ProfilePage,
  FormationsPage,
} from "@/pages";

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
                <FormationsPage />
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
        <Route
          path="/formateurs"
          element={
            <RequireRole roles={["ADMINISTRATEUR", "SIMPLE_UTILISATEUR"]}>
              <AppLayout>
                <FormateursPage />
              </AppLayout>
            </RequireRole>
          }
        />
      </Route>
    </Routes>
  );
};
