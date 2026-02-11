import { useAuth } from "../../app/authContext";


export const useHasRole = (required: UserRole | UserRole[]) => {
  const { user } = useAuth();

  if (!user) return false;

  const requiredRoles = Array.isArray(required)
    ? required
    : [required];

  return requiredRoles.includes(user.role);
};

type UserRole =
  | "ADMIN"
  | "AUDIT"
  | "FINANCE"
  | "EMPLOYEE"
  | "MANAGERS"
  | "DIRECTORS";
