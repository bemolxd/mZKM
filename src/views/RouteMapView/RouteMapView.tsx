import { Box, Center, theme } from 'native-base';
import React, { ReactElement, useEffect } from 'react';
import Mapbox, {
  Camera,
  LineLayer,
  MapView,
  MarkerView,
  ShapeSource,
  UserLocation,
} from '@rnmapbox/maps';
import Config from 'react-native-config';
import { StyleSheet } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { ROUTE_ACTION_SHEET } from './RouteActionSheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigatorParamList } from '../types';
import { RouteElement } from '../../mutations/searchRoute';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<StackNavigatorParamList, 'RouteMapView'>;

export function RouteMapView(props: Props): ReactElement {
  const element: RouteElement = props.route.params;
  const coords = element.mapLines
    .map(mapLine => mapLine.coords.map(c => [c.lng, c.lat]))
    .reduce((acc, el) => [...acc, ...el], []);
  const centerCoords = coords[Math.floor((coords.length - 1) / 2)];
  const stops = element.routeStops.slice(1, element.routeStops.length - 1);

  useEffect(() => {
    Mapbox.setAccessToken(Config.MAPBOX_ACCESS_TOKEN ?? '');
    SheetManager.show(ROUTE_ACTION_SHEET, { payload: { element } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center w="100%" h="100%" flex={1} position="relative">
      <MapView
        style={styles.mapView}
        compassEnabled
        scaleBarEnabled={false}
        logoPosition={{ top: 21, left: 38 }}
        attributionPosition={{ top: 0, left: 0 }}>
        <UserLocation />
        <Camera
          centerCoordinate={centerCoords}
          zoomLevel={12}
          animationDuration={0}
        />
        {stops.map(stop => (
          <MarkerView coordinate={[stop.lng, stop.lat]} key={stop.id}>
            <Box
              borderRadius={4}
              borderColor={stop.vehicleType === 'A' ? 'orange.400' : 'teal.500'}
              borderStyle="solid"
              borderWidth="1px"
              background={theme.colors.white}>
              <MaterialIcons
                size={24}
                name={stop.vehicleType === 'A' ? 'directions-bus' : 'tram'}
                color={theme.colors.gray['600']}
              />
            </Box>
          </MarkerView>
        ))}
        <ShapeSource
          id="shape-source"
          shape={{
            type: 'FeatureCollection',
            features: element.mapLines.map(mapLine => ({
              type: 'Feature',
              properties: {
                color:
                  mapLine.vehicleType === 'A'
                    ? theme.colors.orange['300']
                    : theme.colors.teal['300'],
              },
              geometry: {
                type: 'LineString',
                coordinates: mapLine.coords.map(c => [c.lng, c.lat]),
              },
            })),
          }}>
          <LineLayer id="line-layer" style={styles.lineLayer} />
        </ShapeSource>
      </MapView>
    </Center>
  );
}

const styles = StyleSheet.create({
  mapView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lineLayer: {
    // @ts-ignore
    lineJoin: 'round',
    lineColor: ['get', 'color'],
    lineWidth: 5,
    lineCap: 'round',
  },
});
