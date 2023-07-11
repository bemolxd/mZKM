import React, { ReactElement, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { DataSetItem, StopsSearchBar } from '../../components/StopsSearchBar';
import { TimetableDataSwitch } from './TimetableDataSwitch';
import { TimetableViewContainer } from './TimetableViewContainer';
import { useTranslation } from 'react-i18next';

export function TimetableView(): ReactElement {
  const [stop, setStop] = useState<DataSetItem | null>(null);
  const [tab, setTab] = useState<number>(0);

  const { t } = useTranslation();

  return (
    <>
      <AppBar title={t('TimetableView.appbarTitle')}>
        <StopsSearchBar
          placeholder={t('TimetableView.searchPlaceholder')}
          onSelect={item => setStop(item)}
          onClear={() => {
            console.log('onClear');
          }}
        />
        <TimetableDataSwitch setTab={setTab} tab={tab} />
      </AppBar>
      <TimetableViewContainer stop={stop} />
    </>
  );
}
