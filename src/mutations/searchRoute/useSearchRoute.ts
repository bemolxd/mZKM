import { useMutation } from '../../components/RemoteData';
import { RouteElement, SearchRouteBody } from './types';

export function useSearchRoute() {
  const { request, isLoading, isError } = useMutation<
    RouteElement[],
    SearchRouteBody
  >('/route');

  return {
    request,
    isLoading,
    isError,
  };
}
