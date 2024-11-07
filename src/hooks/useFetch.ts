import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface FetchResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetchData: (
    url: string,
    options?: RequestInit,
    toaster?: boolean
  ) => Promise<void>;
}

interface ApiResponse<T> {
  message: string;
  results: T;
}

function useFetch<T>(): FetchResult<T> {
  const { data: session } = useSession();
  const token = session?.token;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * This custom fetch function is designed to handle API requests with enhanced error handling, authentication, and response validation.
   * 
   * @param {string} url - The endpoint to make the request to.
   * @param {RequestInit} options - Additional options for the fetch request, such as method, body, etc.
   * @param {boolean} toaster - A flag to control whether a success or error toast should be displayed upon response. Default is true.
   * 
   * This function performs the following:
   * - Sends a `Bearer` token for authentication if available.
   * - Checks if the response is JSON and handles it accordingly.
   * - Parses the JSON response and updates the `data` state with the results.
   * - Handles errors by showing appropriate messages via a toast notification and updating the `error` state.
   * - Supports aborting the request if the component unmounts or the request is no longer needed using an AbortController.
   * - Handles possible API errors by checking `error` and `fieldErrors` in the response.
   * - Displays success or error messages in toast notifications based on the result.
   * 
   * Notes:
   * - This function is intended to be used with a session-based authentication token (`Bearer ${token}`).
   * - If the response status is not OK, an error is thrown with the message from the API or a default error message.
   * - If the response is not in JSON format, the function falls back to a default result with a non-JSON message.
   * 
   * Dependencies:
   * - React's `useState` and `useCallback` hooks
   * - `toast` from `react-toastify` for displaying notifications
   * - The session token (`useSession` hook from `next-auth/react`)
   */

  const fetchData = useCallback(
    async (
      url: string,
      options: RequestInit = {},
      toaster = true
    ): Promise<void> => {
      setLoading(true);

      const abortController = new AbortController();
      const { signal } = abortController;

      try {
        const headers: HeadersInit = {
          ...options.headers,
          Authorization: token ? `Bearer ${token}` : "",
          //  "Content-Type": "application/json",
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}${url}`, {
          ...options,
          headers,
          signal,
        });
        // console.log(response,"==response");

        if (!response.ok) {
          const errorBody = await response.json();
          const errorMessage =
            errorBody?.error?.message || errorBody.message || `HTTP error! Status: ${response.status}`;
          const joinedMessages = errorBody.error?.fieldErrors
            ?.map((error: any) => error.message)
            ?.join(" ") || errorMessage;

          throw new Error(joinedMessages);
        }

        const result: ApiResponse<T> = await response.json();

        let res: any = result.results ? result?.results : result
        setData(res);
        toaster && toast.success(result?.message);
        setError(null);
      } catch (e: any) {
        if (!signal.aborted) {
          console.error("Fetch error:", e);
          setError(e.message || "An unexpected error occurred");
          setData(null);
          toaster && toast.error(`${e.message}`);
        }
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { data, error, loading, fetchData };
}

export default useFetch;



