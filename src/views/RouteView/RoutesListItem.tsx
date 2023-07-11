import { Box, theme, VStack, Text, HStack } from 'native-base';
import React, { ReactElement } from 'react';
import { RouteElement } from '../../mutations/searchRoute';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { dayjs } from '../../utils';
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigatorParamList } from '../types';
import { LineBadge } from '../../components/LineBadge';
import { useTranslation } from 'react-i18next';

type Props = {
  element: RouteElement;
};

export function RoutesListItem({ element }: Props): ReactElement {
  const firstStop = element.routeStops[1];
  const lastStop = element.routeStops[element.routeStops.length - 2];

  const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RouteMapView', element)}>
      <Box bg={theme.colors.white} borderRadius={4} my={1} p={4}>
        <HStack w="100%">
          <VStack flexGrow={1}>
            <Text fontSize={16}>{firstStop.name}</Text>
            <Text>{lastStop.name}</Text>
          </VStack>
          <HStack>
            {element.mapLines.map((line, idx) => (
              <HStack key={line.line} alignItems="center">
                <LineBadge
                  vehicleType={line.vehicleType}
                  number={
                    element.routeStops.find(
                      stop => stop.id !== 0 && stop.lineIdx === line.line,
                    )?.line
                  }
                />
                {idx < element.mapLines.length - 1 && (
                  <MaterialCommunityIcons name="chevron-right" size={16} />
                )}
              </HStack>
            ))}
          </HStack>
        </HStack>
        <HStack justifyContent="flex-end" w="100%">
          <Text color={theme.colors.gray['600']}>
            {`${t('RouteListItem.departure')} ${dayjs()
              .add(firstStop.departureTime, 's')
              .fromNow()}`}
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
