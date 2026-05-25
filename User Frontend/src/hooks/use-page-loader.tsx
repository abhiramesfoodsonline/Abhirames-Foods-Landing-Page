import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageLoader = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return isLoading;
};