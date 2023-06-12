import React, { ReactElement, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { DataSetItem, StopsSearchBar } from '../../components/StopsSearchBar';
import { TimetableDataSwitch } from './TimetableDataSwitch';
import { TimetableViewContainer } from './TimetableViewContainer';

export function TimetableView(): ReactElement {
  const [stop, setStop] = useState<DataSetItem | null>(null);
  const [tab, setTab] = useState<number>(0);

  return (
    <>
      <AppBar title="Rozkład jazdy">
        <StopsSearchBar
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
