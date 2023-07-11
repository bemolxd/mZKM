import { ScrollView } from 'native-base';
import React, { ReactElement, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { DataSetItem } from '../../components/StopsSearchBar';
import { RouteElement, useSearchRoute } from '../../mutations/searchRoute';
import { RoutePointsSelect } from './RoutePointsSelect';
import { dayjs } from '../../utils';
import { RoutesListItem } from './RoutesListItem';
import { useTranslation } from 'react-i18next';

export function RouteView(): ReactElement {
  const [startStop, setStartStop] = useState<DataSetItem | null>(null);
  const [endStop, setEndStop] = useState<DataSetItem | null>(null);
  const [routes, setRoutes] = useState<RouteElement[] | null>(null);
  const isRouteSelected = !!startStop && !!endStop;

  const fc = `${startStop?.coords.lng}:${startStop?.coords.lat}`;
  const tc = `${endStop?.coords.lng}:${endStop?.coords.lat}`;
  const date = dayjs().format('YYYY-MM-DD');
  const time = dayjs().format('HH:mm');

  const { request, isLoading, isError } = useSearchRoute();
  const handleOnRouteSearch = async () => {
    try {
      const res = await request({ fc, tc, time, date });
      setRoutes(res.result);
    } catch (error) {
      console.log('err', error);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <AppBar title={t('RouteView.appbarTitle')}>
        <RoutePointsSelect
          setStartStop={setStartStop}
          setEndStop={setEndStop}
          isRouteSelected={isRouteSelected}
          onRouteSearch={handleOnRouteSearch}
          isLoading={isLoading}
        />
      </AppBar>
      {!routes || isError ? null : (
        <ScrollView px={2} pt={2}>
          {routes.map(element => (
            <RoutesListItem key={element.id} element={element} />
          ))}
        </ScrollView>
      )}
    </>
  );
}
