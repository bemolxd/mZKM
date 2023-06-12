import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Text,
  theme,
  VStack,
} from 'native-base';
import React, { ReactElement, useRef } from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import { RouteElement, RouteStop } from '../../mutations/searchRoute';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { dayjs } from '../../utils';
import { LineBadge } from '../../components/LineBadge';

export const ROUTE_ACTION_SHEET = 'route-action-sheet';

export function RouteActionSheet({
  sheetId,
  payload,
}: SheetProps<{ element: RouteElement }>): ReactElement {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation();

  const routeElement = payload?.element!;

  const firstStop = routeElement.routeStops[1];
  const lastStop = routeElement.routeStops[routeElement.routeStops.length - 2];
  const allStops = routeElement.routeStops.slice(
    1,
    routeElement.routeStops.length - 1,
  );

  const lineStops = allStops.reduce((acc, el) => {
    acc[el.lineIdx] = acc[el.lineIdx] || [];
    acc[el.lineIdx].push(el);
    return acc;
  }, {} as Record<number, RouteStop[]>);

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      useBottomSafeAreaPadding
      statusBarTranslucent
      drawUnderStatusBar={false}
      backgroundInteractionEnabled
      gestureEnabled
      snapPoints={[10, 40]}
      initialSnapIndex={1}
      closable
      onClose={() => {
        navigation.goBack();
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{
        height: '100%',
      }}>
      <VStack w="100%" px={4}>
        <HStack w="100%" alignItems="center">
          <VStack flexGrow={1}>
            <Heading size="md">{firstStop.name}</Heading>
            <Text fontSize={18}>{lastStop.name}</Text>
          </VStack>
          <TouchableOpacity
            onPress={() => {
              actionSheetRef.current?.hide();
            }}>
            <Box bg={theme.colors.gray['200']} borderRadius="full" p={1}>
              <MaterialCommunityIcons
                name="close"
                color={theme.colors.gray['400']}
                size={24}
              />
            </Box>
          </TouchableOpacity>
        </HStack>
        <Divider my={2} />
        <VStack w="100%" space={1}>
          <HStack w="100%" justifyContent="space-between" alignItems="center">
            <Heading size="sm">Trasa:</Heading>
            <Text fontSize={16}>
              odjazd: {dayjs().add(firstStop.departureTime, 's').fromNow()}
            </Text>
          </HStack>
          <VStack space={1}>
            {routeElement.mapLines.map((line, idx, next) => {
              const stops = lineStops[line.line];
              const from = stops[0];
              const to = stops[stops.length - 1];
              const betweenStops = stops.slice(1, stops.length - 1);

              return (
                <VStack key={from.id} w="100%">
                  <HStack w="100%" space={2}>
                    <VStack w={10} alignItems="flex-start">
                      <LineBadge
                        vehicleType={from.vehicleType}
                        number={from.line}
                      />
                    </VStack>
                    <VStack flexGrow={1}>
                      <HStack flexGrow={1} justifyContent="space-between">
                        <Text fontWeight={500} fontSize={16}>
                          {from.name}
                        </Text>
                        <Box w={12}>
                          <Text fontWeight={500} fontSize={16}>
                            {dayjs()
                              .add(from.departureTime, 's')
                              .format('HH:mm')}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack space={2}>
                        <Box
                          ml={1}
                          w={1}
                          minH={2}
                          h="100%"
                          borderColor={
                            from.vehicleType === 'A' ? 'orange.400' : 'teal.500'
                          }
                          borderStyle="solid"
                          borderWidth={2}
                        />
                        <VStack flexGrow={1}>
                          {betweenStops.map(s => (
                            <HStack
                              key={s.id}
                              flexGrow={1}
                              justifyContent="space-between">
                              <Text>{s.name}</Text>
                              <Box w={12}>
                                <Text>
                                  {dayjs()
                                    .add(s.departureTime, 's')
                                    .format('HH:mm')}
                                </Text>
                              </Box>
                            </HStack>
                          ))}
                        </VStack>
                      </HStack>
                      <HStack flexGrow={1} justifyContent="space-between">
                        <Text fontWeight={500} fontSize={16}>
                          {to.name}
                        </Text>
                        <Box w={12}>
                          <Text fontWeight={500} fontSize={16}>
                            {dayjs().add(to.departureTime, 's').format('HH:mm')}
                          </Text>
                        </Box>
                      </HStack>
                      {next[idx + 1] && (
                        <HStack flexGrow={1} alignItems="center" my={1}>
                          <Box
                            flexGrow={1}
                            borderColor={theme.colors.gray['400']}
                            borderStyle="solid"
                            borderWidth="0.5px"
                          />
                          <Text color={theme.colors.gray['600']} mx={2}>
                            {dayjs(
                              (lineStops[next[idx + 1].line][0].departureTime -
                                to.departureTime) *
                                1000,
                            ).format('m [min]')}
                          </Text>
                          <Box
                            flexGrow={1}
                            borderColor={theme.colors.gray['400']}
                            borderStyle="solid"
                            borderWidth="0.5px"
                          />
                        </HStack>
                      )}
                    </VStack>
                  </HStack>
                </VStack>
              );
            })}
          </VStack>
        </VStack>
      </VStack>
    </ActionSheet>
  );
}
