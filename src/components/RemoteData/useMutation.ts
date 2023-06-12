import { useMutation as useTanstackMutation } from '@tanstack/react-query';
import axios from 'axios';
import Config from 'react-native-config';
import { MutationResponse } from './QueryResponse';

const apiUrl = Config.BETTER_ZKM_API_URL ?? 'http://localhost:6060/api';

export function useMutation<Results extends {}, Body extends {}>(href: string) {
  const { mutateAsync, isLoading, isError } = useTanstackMutation(
    async (body?: Body) => {
      const req = await axios.post<MutationResponse<Results>>(
        apiUrl + href,
        body,
      );
      return req.data;
    },
  );

  return {
    request: mutateAsync,
    isLoading,
    isError,
  };
}
