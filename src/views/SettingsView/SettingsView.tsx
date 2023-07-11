import React, { ReactElement } from 'react';
import { AppBar } from '../../components/AppBar';
import { ScrollView } from 'native-base';
import { AboutAppCard, TranslationCard } from './cards';
import { useTranslation } from 'react-i18next';

export function SettingsView(): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <AppBar
        title={t('SettingsView.appbarTitle')}
        withGoBack
        withSettings={false}
      />
      <ScrollView p={2}>
        <TranslationCard />
        <AboutAppCard />
      </ScrollView>
    </>
  );
}
