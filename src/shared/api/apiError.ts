import { AxiosError } from "axios";

export const parseApiError = (error: unknown): string => {
  if (!error) return "Unknown error occurred.";

  if ((error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<any>;

    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      "Request failed."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred.";
};
