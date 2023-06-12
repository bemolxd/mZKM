import { useQuery } from '../../components/RemoteData';
import { StopTimetable } from './types';

export function useTimetableQuery(stopId: number) {
  const { data, isLoading, isError } = useQuery<StopTimetable>(
    ['timetable', String(stopId)],
    `/timetable?stopId=${stopId}`,
    15000,
  );

  return {
    results: data?.result ?? undefined,
    isLoading,
    isError,
  };
}
