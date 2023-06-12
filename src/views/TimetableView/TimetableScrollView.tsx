import {
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  theme,
  VStack,
} from 'native-base';
import React, { ReactElement } from 'react';
import { DataSetItem } from '../../components/StopsSearchBar';
import { useTimetableQuery } from '../../queries/timetableQuery';

type Props = {
  stop: DataSetItem;
};

export function TimetableScrollView({ stop }: Props): ReactElement {
  const { results, isLoading, isError } = useTimetableQuery(stop.stopId);

  if (isLoading) {
    return (
      <Center h="100%" safeAreaBottom={48}>
        <Spinner size="lg" color={theme.colors.gray['400']} />
      </Center>
    );
  }

  if (!results || isError) {
    return (
      <Center h="100%" safeAreaBottom={48}>
        <Text color={theme.colors.gray['400']}>Brak dostępnych informacji</Text>
      </Center>
    );
  }

  return (
    <>
      <HStack
        px={4}
        justifyContent="space-between"
        w="100%"
        bg={theme.colors.coolGray['300']}
        borderBottomRadius={8}>
        <HStack>
          <Text
            fontStyle="italic"
            color={theme.colors.gray['700']}
            ml={1.5}
            mr={5}>
            Nr.
          </Text>
          <Text fontStyle="italic" color={theme.colors.gray['700']}>
            Kierunek
          </Text>
        </HStack>
        <Text fontStyle="italic" color={theme.colors.gray['700']}>
          Odjazd
        </Text>
      </HStack>
      <ScrollView w="100%" px={2}>
        {results.departures?.map(departure => (
          <HStack
            key={departure.id}
            w="100%"
            background={theme.colors.white}
            my={1}
            p={2}
            borderRadius={8}
            alignItems="center"
            justifyContent="space-between">
            <HStack space={2} alignItems="center" maxW="240px">
              <VStack
                borderRadius={4}
                borderColor={
                  departure.vehicleType === 'A' ? 'orange.400' : 'teal.500'
                }
                borderStyle="solid"
                borderWidth="1px"
                minW="24px"
                alignItems="center">
                <Text color={theme.colors.gray['600']} fontWeight="600">
                  {departure.number}
                </Text>
              </VStack>
              <Text
                fontSize="24px"
                color={theme.colors.gray['600']}
                fontWeight="medium"
                isTruncated>
                {departure.direction}
              </Text>
            </HStack>
            <Text
              fontSize="20px"
              color={
                departure.secondsLeft < 360
                  ? theme.colors.red['500']
                  : theme.colors.gray['600']
              }>
              {departure.time}
            </Text>
          </HStack>
        ))}
      </ScrollView>
    </>
  );
}
