import { useState } from "react";

type Methods = "POST" | "PUT" | "DELETE" | "GET";

export const useMutation = <TBody, TRes>(url: string,options?: RequestInit) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TRes | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (
    body: TBody,
    method: Methods = 'POST',
    onSuccess?: (data: TRes) => void
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        ...options,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const jsonData = await response.json();
      
      setData(jsonData);

      if (onSuccess) {
        onSuccess(jsonData);
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
};