
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { parseApiError } from "./apiError";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

http.interceptors.request.use((config) => {
    const stored = localStorage.getItem('auth');
    if (stored) {
        const { token } = JSON.parse(stored)
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

/**
 * Global response error handling
 */
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.error("Unauthorized — redirect to login");
        localStorage.removeItem("auth");
        window.location.href = "/login";
      }

      if (status === 403) {
        toast.error("You do not have permission to perform this action.");
        return Promise.reject(error);
      }

      if (status >= 500) {
        toast.error("Server error. Please try again later.");
        return Promise.reject(error);
      }

       toast.error(parseApiError(error));
    }

    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
    if (token) {
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete http.defaults.headers.common.Authorization;
    }
};