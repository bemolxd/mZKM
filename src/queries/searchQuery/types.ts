export type AvailableStop = {
  id: number;
  name: string;
  comments: string;
  lng: number;
  lat: number;
  lines: AvailableStopLine[];
};

export type AvailableStopLine = {
  number: number;
  vehicleType: 'A' | 'T';
};
