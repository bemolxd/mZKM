import React, { ReactElement } from 'react';
import {
  ColorMode,
  ITheme,
  NativeBaseProvider as NBProvider,
  NativeBaseProviderProps,
  StorageManager,
  extendTheme,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const nbExtendedTheme: ITheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@my-app-color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      console.log(e);
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@my-app-color-mode', value || '');
    } catch (e) {
      console.log(e);
    }
  },
};

export function NativeBaseProvider({
  children,
}: NativeBaseProviderProps): ReactElement {
  return (
    <NBProvider theme={nbExtendedTheme} colorModeManager={colorModeManager}>
      {children}
    </NBProvider>
  );
}
