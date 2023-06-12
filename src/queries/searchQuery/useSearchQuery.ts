import { useQuery } from '../../components/RemoteData';
import { AvailableStop } from './types';

export function useSearchQuery(q: string) {
  const { data, isLoading, isError } = useQuery<AvailableStop[]>(
    ['search', q],
    `/search?q=${q}`,
  );

  return {
    results: data?.result ?? [],
    isLoading,
    isError,
  };
}
