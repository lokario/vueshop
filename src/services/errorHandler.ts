import axios from "axios";

/**
 * Handles API and general errors, returning a user-friendly message.
 * @param error The error object to process
 * @returns A string message describing the error
 */
export const handleApiError = (error: unknown): string => {
  // Axios-specific error
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      "An API error occurred. Please try again."
    );
  }

  // General error
  if (error instanceof Error) {
    return error.message || "An unexpected error occurred.";
  }

  // Unknown error
  return "An unknown error occurred.";
};
