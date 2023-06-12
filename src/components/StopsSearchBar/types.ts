import { AvailableStopLine } from '../../queries/searchQuery';

export type Coords = {
  lat: number;
  lng: number;
};

export type DataSetItem = {
  id: string;
  stopId: number;
  title: string;
  coords: Coords;
  lines: AvailableStopLine[];
};
