import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import type { JSX } from "react";

export const RequireRole = ({ role, children }: {
    role: Array<'ADMIN' | 'AUDIT' | 'FINANCE' | 'EMPLOYEE' | 'MANAGERS' | 'DIRECTORS'>;
    children: JSX.Element;
}) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />

    if (!role.includes(user.role)) {
        return<Navigate to="/dashboard" replace />
    }
    return children;
}