import React, { PropsWithChildren, ReactElement } from 'react';
import { NativeBaseProvider } from './NativeBaseProvider';
import { NavigationContainer } from '@react-navigation/native';
import { TanstackProvider } from './TanstackProvider';
import { SheetProvider } from 'react-native-actions-sheet';

export function Providers({ children }: PropsWithChildren): ReactElement {
  return (
    <TanstackProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <SheetProvider>{children}</SheetProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </TanstackProvider>
  );
}
