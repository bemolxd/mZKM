import { StatusBar } from 'native-base';
import React, { ReactElement } from 'react';
import { Providers } from './providers';
import { StackNavigator } from './views';
import './views/registeredSheets';

export function App(): ReactElement {
  return (
    <Providers>
      <StatusBar barStyle="dark-content" />
      <StackNavigator />
    </Providers>
  );
}
