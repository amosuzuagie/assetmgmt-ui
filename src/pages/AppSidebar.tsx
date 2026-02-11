import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../app/authContext";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 text-sm font-medium transition
     ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800">
      {/* Logo */}
      <div
        className="flex items-center gap-2 px-4 h-16 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img src="/asset.png" alt="AssetMgmt" className="h-8 w-8" />
        <span className="text-white font-semibold text-lg">
          WGG Assets
        </span>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/assets" className={linkClass}>
          Assets
        </NavLink>

        <NavLink to="/branches" className={linkClass}>
          Branches
        </NavLink>

        <NavLink to="/categories" className={linkClass}>
          Categories
        </NavLink>

        {user.role === "ADMIN" && (
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full px-4 py-3 border-t border-gray-800">
        <div className="text-xs text-gray-400 mb-2">
          {user.firstName} ({user.role})
        </div>

        <button
          onClick={logout}
          className="w-full text-left text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};
