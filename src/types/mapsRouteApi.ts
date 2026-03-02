export interface GoogleRuta {
  ok: boolean;
  message: Datum[];
}

export interface Datum {
  distance: Distance;
  duration: Distance;
  end_address: string;
  end_location: Location;
  start_address: string;
  start_location: Location;
  steps: Step[];
  traffic_speed_entry: any[];
  via_waypoint: any[];
}

export interface Distance {
  text: string;
  value: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Step {
  distance: Distance;
  duration: Distance;
  end_location: Location;
  html_instructions: string;
  polyline: Polyline;
  start_location: Location;
  travel_mode: TravelMode;
  maneuver?: string;
}

export interface Polyline {
  points: string;
}

export type TravelMode = 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT';
