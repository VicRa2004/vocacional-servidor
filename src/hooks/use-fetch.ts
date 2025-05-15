import { useEffect, useState } from "react";

export const useFetch = <T>(url: string, options?: RequestInit) => {

    const [loading, setLoading] = useState(true); 
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {data, loading, error}
}