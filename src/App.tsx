import { StatusBar } from 'native-base';
import React, { ReactElement } from 'react';
import { Providers } from './providers';
import { StackNavigator } from './views';
import './views/registeredSheets';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './locales/pl.json';
import en from './locales/en.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'pl',
  lng: 'pl',
  resources: { pl: { translation: pl }, en: { translation: en } },
  interpolation: { escapeValue: false },
});

export function App(): ReactElement {
  return (
    <Providers>
      <StatusBar barStyle="dark-content" />
      <StackNavigator />
    </Providers>
  );
}
