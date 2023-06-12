import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren, ReactElement } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
  },
});

export function TanstackProvider({
  children,
}: PropsWithChildren): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
