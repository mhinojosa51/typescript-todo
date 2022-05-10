import { useState, useEffect } from "react";

export function useFetchData(url: string) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url);
            if (res.ok) {
                try {
                    const data = await res.json();
                    setData(data);
                    setIsLoading(false);
                } catch (err) {
                    setHasError(true);
                }
            }
            if (!res.ok) {
                setHasError(true);
            }
        }
        setIsLoading(true);
        fetchData();
    }, []);

    return { isLoading, data, hasError };
}
