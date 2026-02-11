import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { AuthProvider } from "./authContext";
import { BrowserRouter } from "react-router-dom";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
}