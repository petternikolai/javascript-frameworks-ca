import { useState, useEffect } from "react";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: T = await response.json();
        setData(json);
      } catch (error) {
        console.error("Fetching error:", error);
        setError((error as Error).message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, error };
}

export default useApi;
