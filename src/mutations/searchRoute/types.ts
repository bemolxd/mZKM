export type RouteElement = {
  id: string;
  startTime: number;
  endTime: number;
  mapLines: MapLine[];
  routeStops: RouteStop[];
};

export type MapLine = {
  line: number;
  coords: MapLineCoordsObject[];
  vehicleType: string;
};

export type MapLineCoordsObject = {
  lat: number;
  lng: number;
};

export type RouteStop = {
  id: number;
  name: string;
  lng: number;
  lat: number;
  line: number;
  vehicleType: string;
  departureDate: string;
  departureTime: number;
  lineIdx: number;
};

export type SearchRouteBody = {
  fc: string;
  tc: string;
  time: string;
  date: string;
};
