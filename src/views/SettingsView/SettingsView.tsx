import React, { ReactElement } from 'react';
import { AppBar } from '../../components/AppBar';
import { ScrollView } from 'native-base';
import { AboutAppCard, TranslationCard } from './cards';

export function SettingsView(): ReactElement {
  return (
    <>
      <AppBar title="Ustawienia" withGoBack withSettings={false} />
      <ScrollView p={2}>
        <TranslationCard />
        <AboutAppCard />
      </ScrollView>
    </>
  );
}
