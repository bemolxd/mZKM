import Config from 'react-native-config';
import { useQuery as useTanstackQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryResponse } from './QueryResponse';

const apiUrl = Config.BETTER_ZKM_API_URL ?? 'http://localhost:6060/api';

export function useQuery<T extends {}>(
  keys: string[],
  route: string,
  refetchInterval: number = 0,
) {
  const {
    data,
    isLoading,
    isError,
    isLoadingError,
    isRefetchError,
    error,
    isFetching,
  } = useTanstackQuery(
    keys,
    async () => await axios.get<QueryResponse<T>>(apiUrl + route),
    { refetchInterval },
  );

  const hasErrorOcurred = isError || isLoadingError || isRefetchError;

  return {
    data: data?.data,
    isLoading,
    isError: hasErrorOcurred,
    error,
    isFetching,
  };
}
