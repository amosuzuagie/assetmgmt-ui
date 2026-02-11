import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../app/authContext";


export const AppNavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition
     ${isActive ? "bg-blue-600 text-white" : "text-gray-200 hover:bg-gray-700"}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          
          {/* Left: App name + primary nav */}
          <div className="flex items-center gap-6">
            <span
              className="text-white font-semibold cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
                <img src="" alt="" />
              AssetMgmt
            </span>

            <nav className="flex gap-1">
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
          </div>

          {/* Right: User info */}
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">
              {user.firstName} ({user.role})
            </span>

            <button
              onClick={logout}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
