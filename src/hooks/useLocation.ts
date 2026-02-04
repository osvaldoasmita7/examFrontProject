import { useState, useEffect } from 'react';
interface ILocation { latitude: string, longitude: string }
export const useLocation = () => {
    const [position, setPosition] = useState<ILocation | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setError("La geolocalización no está disponible en tu navegador.");
            return;
        }

        const onSuccess = (location: GeolocationPosition) => {
            setPosition({
                latitude: String(location.coords.latitude),
                longitude: String(location.coords.longitude),
            });
        };

        const onError = (error: GeolocationPositionError) => {
            setError(error.message);
        };

        // Solicitar ubicación
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return { position, error };
};