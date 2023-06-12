export type StopTimetable = {
  time: string;
  id: number;
  name: string;
  day: Day;
  departures: Departure[] | undefined;
};

type Day = {
  type: string;
  description: string;
};

type Departure = {
  id: number;
  direction: string;
  number: number;
  vehicleType: 'A' | 'T';
  secondsLeft: number;
  time: string;
};
