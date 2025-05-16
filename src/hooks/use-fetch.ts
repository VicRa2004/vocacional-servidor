import { useEffect, useState, useCallback } from "react";

export const useFetch = <T>(url: string, options?: RequestInit) => {
    const [loading, setLoading] = useState(true); 
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setData(data);
            setError(null);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Función para recargar manualmente
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
};