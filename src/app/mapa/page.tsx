'use client';

import { Prisma } from '../../../generated/prisma/client';
import { useUbicacion } from '@/hooks/useUbicacion';
import { useState, useEffect, useRef } from 'react';
import {
  Map,
  type MapRef,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MapRoute,
} from '@/components/ui/map';
import { Button } from '@/components/ui/button';
import { Navigation, Loader2, Clock, Route } from 'lucide-react';
import { ConseguirNegocio, ConseguirTodosNegociosMapa } from '@/actions/Negocio';
import { IoLocationOutline } from 'react-icons/io5';
import { FaLocationCrosshairs } from 'react-icons/fa6';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { toast } from 'sonner';

interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

const styles = {
  default: undefined,
  openstreetmap: 'https://tiles.openfreemap.org/styles/bright',
  openstreetmap3d: 'https://tiles.openfreemap.org/styles/liberty',
};

type StyleKey = keyof typeof styles;
export type Negocios = Prisma.dir_verdeGetPayload<object>;

export default function CustomStyleExample() {
  const [negocio, setNegocios] = useState<Negocios[]>();
  const { lat, long } = useUbicacion();
  const [panel, setPanel] = useState<boolean>(false);
  const [dialog, setDialog] = useState<boolean>(false);
  const [rutaInicio, setRutaInicio] = useState<string>('');
  const [rutaFin, setRutaFin] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [alternativas, setAlternativas] = useState<string>('');

  const [rutaCoord, setRutaCoords] = useState<[number, number][]>([]);
  const [routes, setRoutes] = useState<
    { coordinates: [number, number][]; duration: number; distance: number }[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ConseguirNegocio = async () => {
      const negocios = await ConseguirTodosNegociosMapa();
      setNegocios(negocios);
    };
    ConseguirNegocio();
  }, []);

  const OnSumbit = async (
    inicio: number,
    final: number,
    transporte: string,
    conAlternativas: boolean,
  ) => {
    if (inicio == null || final == null || transporte == null) {
      throw new Error('Falta inicio, final o transporte');
    }

    setIsLoading(true);

    let iniGps: string | undefined;
    let finGps: string | undefined;

    if (inicio === 0) {
      if (!lat || !long) {
        throw new Error('No se pudo obtener tu ubicación');
      }
      iniGps = `${lat},${long}`;
    } else {
      const ini = await ConseguirNegocio(inicio);
      if (!ini?.pos_gps) {
        throw new Error('No se encontró la ubicación de inicio');
      }
      iniGps = ini.pos_gps;
    }

    if (final === 0) {
      if (!lat || !long) {
        throw new Error('No se pudo obtener tu ubicación');
      }
      finGps = `${lat},${long}`;
    } else {
      const fin = await ConseguirNegocio(final);
      if (!fin?.pos_gps) {
        throw new Error('No se encontró la ubicación de destino');
      }
      finGps = fin.pos_gps;
    }

    const [latIni, lngIni] = iniGps.split(',');
    const [latFin, lngFin] = finGps.split(',');

    const profileMap: Record<string, string> = {
      DRIVE: 'driving',
      TWO_WHEELER: 'motorcycle',
      BICYCLE: 'bicycle',
      WALK: 'foot',
      TRANSIT: 'driving',
    };

    const profile = profileMap[transporte] || 'driving';

    try {
      const alternativesParam = conAlternativas ? 'true' : 'false';
      const url = `https://router.project-osrm.org/route/v1/${profile}/${lngIni},${latIni};${lngFin},${latFin}?overview=full&geometries=geojson&alternatives=${alternativesParam}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes?.length > 0) {
        const routesData: RouteData[] = data.routes.map(
          (route: {
            geometry: { coordinates: [number, number][] };
            duration: number;
            distance: number;
          }) => ({
            coordinates: route.geometry.coordinates,
            duration: route.duration,
            distance: route.distance,
          }),
        );

        setRoutes(routesData);
        setRutaCoords(routesData[0]?.coordinates || []);
        setSelectedIndex(0);
      } else {
        throw new Error('No se encontraron rutas');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>('default');
  const selectedStyle = styles[style];
  const is3D = style === 'openstreetmap3d';

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  return (
    <>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="sm:max-w-sm dark:bg-zinc-900 flex flex-col items-center justify-center">
          <DialogHeader>
            <DialogTitle>Selecciona las 2 rutas</DialogTitle>
            <DialogDescription>Selecciona la ruta de inicio y fin</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <label
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                htmlFor="partida"
              >
                Ruta de partida<span className="text-red-500">*</span>
              </label>
              <select
                id="partida"
                className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
                onChange={(e) => {
                  setRutaInicio(e.target.value);
                }}
              >
                <option value="">Selecciona una ubicacion</option>
                <option value={0}>Mi ubicacion</option>
                <option disabled>──────────</option>
                {negocio?.map((n) => (
                  <option value={n.id_negocio} key={n.id_negocio}>
                    {n.negocio}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <label
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                htmlFor="final"
              >
                Ruta de final<span className="text-red-500">*</span>
              </label>
              <select
                id="final"
                onChange={(e) => {
                  setRutaFin(e.target.value);
                }}
                className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              >
                <option value="">Selecciona una ubicacion</option>
                <option value={0}>Mi ubicacion</option>
                <option disabled>──────────</option>
                {negocio?.map((n) => (
                  <option value={n.id_negocio} key={n.id_negocio}>
                    {n.negocio}
                  </option>
                ))}
              </select>
            </Field>
            <Field>
              <label
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                htmlFor="transporte"
              >
                Medio de transporte<span className="text-red-500">*</span>
              </label>
              <select
                id="transporte"
                onChange={(e) => {
                  setTransporte(e.target.value);
                }}
                className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white text-sm"
              >
                <option value="">Selecciona un transporte</option>
                <option value="DRIVE">Carro</option>
                <option value="TWO_WHEELER">Moto</option>
                <option value="BICYCLE">Bicicleta</option>
                <option value="WALK">A pie</option>
                <option value="TRANSIT">Transporte público</option>
              </select>
            </Field>
            <Field>
              <label
                className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                htmlFor="alternativas"
              >
                Rutas alternativas
              </label>
              <input
                type="checkbox"
                id="alternativas"
                onChange={(e) => {
                  setAlternativas(String(e.target.checked));
                }}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={() => {
                if (!rutaInicio || !rutaFin || !transporte) {
                  toast.error('seleccione una ruta de inicio, fin y transporte');
                  return;
                }

                if (rutaInicio === rutaFin || rutaFin === rutaInicio) {
                  toast.error('no se permiten estas direcciones');
                  return;
                }
                toast.promise(
                  OnSumbit(
                    Number(rutaInicio),
                    Number(rutaFin),
                    transporte,
                    alternativas === 'true',
                  ),
                  {
                    loading: 'consiguiendo ruta',
                    success: 'ruta conseguida',
                    error: (error) => String(error),
                  },
                );
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*Seleccion de modo de ruta*/}
      <Sheet open={panel} onOpenChange={setPanel}>
        <SheetContent className="dark:bg-zinc-900">
          <SheetHeader>
            <SheetTitle>Seleccionar modo de ruta</SheetTitle>
            <SheetDescription>Selecciona el modo de ruta que necesites porfavor</SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Button
              type="button"
              onClick={() => {
                setPanel(false);
                setDialog(true);
              }}
            >
              Ruta de 2 direcciones
            </Button>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cerrar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/*Mapa*/}
      <div className="w-full h-[50vh] md:h-[60vh] lg:h-[75vh] xl:h-[80vh] relative rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-zinc-800 dark:text-background-dark mt-5">
        <Map
          ref={mapRef}
          zoom={6}
          styles={selectedStyle ? { light: selectedStyle, dark: selectedStyle } : undefined}
          className="w-full h-full"
        >
          {/* rutas */}
          {rutaCoord.length > 0 && (
            <MapRoute coordinates={rutaCoord} color="#6366f1" width={5} opacity={0.8} />
          )}

          {lat && long && (
            <MapMarker longitude={long} latitude={lat}>
              <MarkerContent>
                <FaLocationCrosshairs size={25} className="text-accent" />
                <MarkerLabel position="bottom">Mi ubicacion</MarkerLabel>
              </MarkerContent>
            </MapMarker>
          )}
          {negocio?.map((place) => (
            <MapMarker
              key={place.id_negocio}
              longitude={Number.parseFloat(place.pos_gps?.split(',')[1] ?? '')}
              latitude={Number.parseFloat(place.pos_gps?.split(',')[0] ?? '')}
            >
              <MarkerContent>
                <IoLocationOutline size={25} className="text-red-500" />
                <MarkerLabel position="bottom">{place.negocio}</MarkerLabel>
              </MarkerContent>
              <MarkerPopup className="p-0 w-62">
                <div className="relative h-32 overflow-hidden rounded-t-md">
                  <img
                    src={place.logo ?? ''}
                    alt={place.negocio}
                    className="bg-cover"
                    loading="eager"
                  />
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
                    <Button
                      size="sm"
                      className="flex-1 h-8"
                      onClick={() => {
                        setPanel(true);
                      }}
                    >
                      <Navigation className="size-3.5 mr-1.5" />
                      Direccion
                    </Button>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
          <MapControls position="top-left" showZoom showCompass showLocate showFullscreen />
        </Map>

        {/* rutas */}
        {routes.length > 0 && (
          <div className="absolute top-50 left-2 flex flex-col gap-2">
            {routes.map((route, index) => {
              const isActive = index === selectedIndex;
              const isFastest = index === 0;
              return (
                <Button
                  key={index}
                  variant={isActive ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => {
                    setSelectedIndex(index);
                    setRutaCoords(route.coordinates);
                  }}
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
                      Rapida
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
        )}

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
    </>
  );
}
