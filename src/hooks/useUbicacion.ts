import { useEffect, useState } from 'react';

export function useUbicacion() {
  const soportaGeo = typeof window !== 'undefined' && 'geolocation' in navigator;

  const [long, setLong] = useState<number>();
  const [lat, setLat] = useState<number>();
  const [error, setError] = useState<string | null>(
    soportaGeo ? null : 'Geolocalización no soportada',
  );

  useEffect(() => {
    if (!soportaGeo) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLong(pos.coords.longitude);
        setLat(pos.coords.latitude);
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, [soportaGeo]);

  return { long, lat, error };
}
