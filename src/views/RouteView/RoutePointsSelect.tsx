import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { DataSetItem, StopsSearchBar } from '../../components/StopsSearchBar';
import { Box, Center, HStack, VStack, theme, Spinner } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';

type Props = {
  setStartStop: Dispatch<SetStateAction<DataSetItem | null>>;
  setEndStop: Dispatch<SetStateAction<DataSetItem | null>>;
  isRouteSelected: boolean;
  onRouteSearch(): void;
  isLoading: boolean;
};

export function RoutePointsSelect({
  setStartStop,
  setEndStop,
  isRouteSelected,
  onRouteSearch,
  isLoading,
}: Props): ReactElement {
  return (
    <VStack w="100%" space={2}>
      <HStack w="100%" space={2} alignItems="center" zIndex={10}>
        <MaterialCommunityIcons name="source-commit-start" size={24} />
        <StopsSearchBar
          onSelect={item => setStartStop(item)}
          onClear={() => {
            console.log('onClear');
          }}
          placeholder="Przystanek początkowy"
          zIndex={10}
        />
      </HStack>
      <HStack w="100%" space={2} alignItems="center" zIndex={9}>
        <MaterialCommunityIcons name="flag-checkered" size={24} />
        <StopsSearchBar
          onSelect={item => setEndStop(item)}
          onClear={() => {
            console.log('onClear');
          }}
          placeholder="Przystanek końcowy"
          zIndex={9}
        />
      </HStack>
      {isRouteSelected && (
        <Center h={1} position="relative">
          <Box
            position="absolute"
            top={0.1}
            bg={theme.colors.orange['500']}
            borderRadius="full"
            w={10}
            h={10}
            alignItems="center"
            justifyContent="center">
            {isLoading ? (
              <Spinner size="sm" color={theme.colors.white} />
            ) : (
              <TouchableOpacity onPress={onRouteSearch}>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={28}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            )}
          </Box>
        </Center>
      )}
    </VStack>
  );
}
