import { StatusBar } from 'native-base';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { Providers } from './providers';
import { StackNavigator } from './views';
import './views/registeredSheets';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from './locales/pl.json';
import en from './locales/en.json';
import { useAsyncStorage } from './utils';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: { pl: { translation: pl }, en: { translation: en } },
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v3',
});

export function App(): ReactElement {
  const { get } = useAsyncStorage('@i18n-locale', 'pl');
  const setLanguage = useCallback(async () => {
    const lang = await get();
    i18n.changeLanguage(lang);
  }, []);

  useEffect(() => {
    setLanguage();
  }, []);

  return (
    <Providers>
      <StatusBar barStyle="dark-content" />
      <StackNavigator />
    </Providers>
  );
}
