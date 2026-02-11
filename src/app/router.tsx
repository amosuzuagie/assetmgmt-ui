import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./requireAuth";
import { RequireRole } from "./RequireRole";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";

import { AssetListPage } from "../features/assets/pages/AssetListPage";
import { CreateAssetPage } from "../features/assets/pages/CreateAssetPage";
import { EditAssetPage } from "../features/assets/pages/EditAssetPage";
import { AssetDetailsPage } from "../features/assets/pages/AssetDetailsPage";
import { BranchListPage } from "../features/branches/pages/BranchListPage";
import { CreateBranchPage } from "../features/branches/pages/CreateBranchPage";
import { EditBranchPage } from "../features/branches/pages/EditBranchPage";
import { CategoryListPage } from "../features/category/pages/CategoryListPage";
import { CategoryCreatePage } from "../features/category/pages/CategoryCreatePage";
import { CategoryEditPage } from "../features/category/pages/CategoryEditPage";
import { BranchDetailPage } from "../features/branches/pages/BranchDetailPage";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />

      {/* ASSETS (Protected) */}
      <Route
        path="/assets"
        element={
          <RequireAuth>
            <AssetListPage />
          </RequireAuth>
        }
      />

      {/* Future asset routes (placeholders for now) */}
      <Route
        path="/assets/new"
        element={
          <RequireAuth>
            <CreateAssetPage />
          </RequireAuth>
        }
      />

      <Route
        path="/assets/:id/edit"
        element={
          <RequireAuth>
            <EditAssetPage />
          </RequireAuth>
        }
      />

      <Route 
        path="/branches"
        element={
          <RequireAuth>
            <BranchListPage />
          </RequireAuth>
        } 
      />

      <Route 
        path="/branches/new"
        element={
          <RequireRole role={["ADMIN", "FINANCE"]}>
            <CreateBranchPage />
          </RequireRole>
        }
      />

      <Route 
        path="/branches/:id/edit"
        element={
          <RequireRole role={["ADMIN", "FINANCE"]}>
            <EditBranchPage />
          </RequireRole>
        }
      />

      <Route
        path="/branches/:id"
        element={
          <RequireAuth>
            <BranchDetailPage />
          </RequireAuth>
        }
      />

      <Route 
        path="/categories"
        element={
          <RequireAuth>
            <CategoryListPage />
          </RequireAuth>
        }
      />

      <Route 
        path="/categories/new"
        element={
          <RequireRole role={["ADMIN", "FINANCE"]}>
            <CategoryCreatePage />
          </RequireRole>
        }
      />

      <Route 
        path="/categories/:id/edit"
        element={
          <RequireRole role={["ADMIN", "FINANCE"]}>
            <CategoryEditPage />
          </RequireRole>
        }
      />

      <Route
        path="/assets/:id"
        element={
          <RequireAuth>
            <AssetDetailsPage />
          </RequireAuth>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <RequireRole role={["ADMIN"]}>
            <p>AdminDashboard</p>
          </RequireRole>
        }
      />
    </Routes>
  );
};
