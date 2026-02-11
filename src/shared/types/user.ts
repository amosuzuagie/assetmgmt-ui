export type UserSummary = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'AUDIT' | 'FINANCE' | 'EMPLOYEE' | 'MANAGERS' | 'DIRECTORS';
}

export const formatUserName = (user?: UserSummary) =>
    user ? `${user.firstName} ${user.lastName}` : "—";

export const ROLE_LABELS: Record<UserSummary["role"], string> = {
  ADMIN: "Administrator",
  AUDIT: "Audit",
  FINANCE: "Finance",
  EMPLOYEE: "Employee",
  MANAGERS: "Manager",
  DIRECTORS: "Director",
};