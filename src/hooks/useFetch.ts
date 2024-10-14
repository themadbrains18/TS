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
  const token = session?.user?.access_token;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
          "Content-Type": "application/json",
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_APIBASEURL}${url}`, {
          ...options,
          headers,
          signal,
        });

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
        setData(result?.results);
        toaster && toast.success(result?.message);
        setError(null);
      } catch (e: any) {
        if (!signal.aborted) {
          console.error("Fetch error:", e);
          setError(e.message || "An unexpected error occurred");
          setData(null);
          toaster && toast.error(`An error occurred: ${e.message}`);
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
