'use client';

import { Prisma } from '../../../generated/prisma/client';

import { useState, useEffect, useRef } from 'react';
import {
  Map,
  type MapRef,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  // MapRoute,
} from '@/components/ui/map';
import { Button } from '@/components/ui/button';
import {
  Navigation,
  // Loader2, Clock, Route
} from 'lucide-react';
import { ConseguirTodosNegocios } from '@/actions/Negocio';

//*marcador

//*rutas
// const start = { name: 'Amsterdam', lng: 4.9041, lat: 52.3676 };
// const end = { name: 'Rotterdam', lng: 4.4777, lat: 51.9244 };
// const waypoint = { name: 'Utrecht', lng: 5.1214, lat: 52.0907 };
// const third = { name: 'The Hague', lng: 4.3007, lat: 52.0705 };

// interface RouteData {
//   coordinates: [number, number][];
//   duration: number; // seconds
//   distance: number; // meters
// }

// function formatDuration(seconds: number): string {
//   const mins = Math.round(seconds / 60);
//   if (mins < 60) return `${mins} min`;
//   const hours = Math.floor(mins / 60);
//   const remainingMins = mins % 60;
//   return `${hours}h ${remainingMins}m`;
// }

// function formatDistance(meters: number): string {
//   if (meters < 1000) return `${Math.round(meters)} m`;
//   return `${(meters / 1000).toFixed(1)} km`;
// }

//*estilos
const styles = {
  default: undefined,
  openstreetmap: 'https://tiles.openfreemap.org/styles/bright',
  openstreetmap3d: 'https://tiles.openfreemap.org/styles/liberty',
};

type StyleKey = keyof typeof styles;
type Negocios = Prisma.dir_verdeGetPayload<object>;

export default function CustomStyleExample() {
  const [negocio, setNegocios] = useState<Negocios[]>();

  useEffect(() => {
    const ConseguirNegocio = async () => {
      const negocios = await ConseguirTodosNegocios();
      setNegocios(negocios);
    };
    ConseguirNegocio();
  }, []);
  //*rutas
  // const [routes, setRoutes] = useState<RouteData[]>([]);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchRoutes() {
  //     try {
  //       const response = await fetch(
  //         `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${waypoint.lng},${waypoint.lat};${end.lng},${end.lat};${third.lng},${third.lat}?overview=full&geometries=geojson`,
  //       );
  //       const data = await response.json();

  //       if (data.routes?.length > 0) {
  //         const routeData: RouteData[] = data.routes.map(
  //           (route: {
  //             geometry: { coordinates: [number, number][] };
  //             duration: number;
  //             distance: number;
  //           }) => ({
  //             coordinates: route.geometry.coordinates,
  //             duration: route.duration,
  //             distance: route.distance,
  //           }),
  //         );
  //         setRoutes(routeData);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch routes:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchRoutes();
  // }, []);

  // const sortedRoutes = routes
  //   .map((route, index) => ({ route, index }))
  //   .sort((a, b) => {
  //     if (a.index === selectedIndex) return 1;
  //     if (b.index === selectedIndex) return -1;
  //     return 0;
  //   });

  //*estilos
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>('default');
  const selectedStyle = styles[style];
  const is3D = style === 'openstreetmap3d';

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  return (
    <div className="w-full h-[50vh] md:h-[60vh] lg:h-[75vh] xl:h-[80vh] relative rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-zinc-800 dark:text-background-dark mt-5">
      <Map
        ref={mapRef}
        zoom={6}
        styles={selectedStyle ? { light: selectedStyle, dark: selectedStyle } : undefined}
        className="w-full h-full"
      >
        {/* rutas */}
        {/* {sortedRoutes.map(({ route, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <MapRoute
              key={index}
              coordinates={route.coordinates}
              color={isSelected ? '#6366f1' : '#94a3b8'}
              width={isSelected ? 6 : 5}
              opacity={isSelected ? 1 : 0.6}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })} */}

        {/* <MapMarker longitude={start.lng} latitude={start.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="top">{start.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>
        <MapMarker longitude={waypoint.lng} latitude={waypoint.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="top">{waypoint.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>

        <MapMarker longitude={end.lng} latitude={end.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="bottom">{end.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker>

        <MapMarker longitude={third.lng} latitude={third.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
            <MarkerLabel position="bottom">{third.name}</MarkerLabel>
          </MarkerContent>
        </MapMarker> */}

        {/* marcador */}
        {negocio?.map((place) => (
          <MapMarker
            key={place.id_negocio}
            longitude={Number.parseFloat(place.pos_gps?.split(',')[1] ?? '')}
            latitude={Number.parseFloat(place.pos_gps?.split(',')[0] ?? '')}
          >
            <MarkerContent>
              <div className="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              <MarkerLabel position="bottom">{place.negocio}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="p-0 w-62">
              <div className="relative h-32 overflow-hidden rounded-t-md">
                <img src={place.logo ?? ''} alt={place.negocio} className="bg-cover" />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {place.descripcion}
                  </span>
                  <h3 className="font-semibold text-foreground leading-tight dark:text-amber-50">
                    {place.actividad}
                  </h3>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 h-8">
                    <Navigation className="size-3.5 mr-1.5" />
                    Directions
                  </Button>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
        <MapControls position="top-left" showZoom showCompass showLocate showFullscreen />
      </Map>

      {/* rutas */}
      {/* {routes.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {routes.map((route, index) => {
            const isActive = index === selectedIndex;
            const isFastest = index === 0;
            return (
              <Button
                key={index}
                variant={isActive ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setSelectedIndex(index)}
                className="justify-start gap-3"
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="font-medium">{formatDuration(route.duration)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <Route className="size-3" />
                  {formatDistance(route.distance)}
                </div>
                {isFastest && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Fastest
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )} */}

      {/* estilos */}
      <div className="absolute top-2 right-2 z-10 sm:top-3 sm:right-3">
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as StyleKey)}
          className="bg-background/90 backdrop-blur-sm text-foreground border rounded-md px-2 py-1.5 text-xs sm:text-sm shadow-md cursor-pointer"
        >
          <option value="default">Default</option>
          <option value="openstreetmap">OSM</option>
          <option value="openstreetmap3d">3D</option>
        </select>
      </div>
    </div>
  );
}
