import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { UserSummary } from "../shared/types/user";
import { setAuthToken } from "../shared/api/http";

type AuthContexType = {
    user: UserSummary | null;
    token: string | null;
    initializing: boolean;
    login: (token: string, user: UserSummary) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContexType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserSummary | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('auth');
        if (stored) {
            const parsed = JSON.parse(stored)
            setUser(parsed.user);
            setToken(parsed.token);
            setAuthToken(parsed.token);
        }
        setInitializing(false);
    }, []);

    const login = useCallback((token: string, user: UserSummary) => {
        setAuthToken(token);
        setUser(user);
        localStorage.setItem('auth', JSON.stringify({ token, user }));
    }, []);

    const logout = useCallback(() => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('auth');
    }, []);

    const value = useMemo(
        () => ({ user, token, initializing, login, logout }),
        [user, login, initializing, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}