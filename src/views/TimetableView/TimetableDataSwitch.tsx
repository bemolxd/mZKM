import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Badge, HStack, Text, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';

type Props = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};

export function TimetableDataSwitch({ tab, setTab }: Props): ReactElement {
  const toast = useToast();
  const toastId = 'full-schedule';

  return (
    <HStack w="100%" justifyContent="center" space={8}>
      <TouchableOpacity onPress={() => setTab(0)}>
        <Badge
          colorScheme="orange"
          variant={tab === 0 ? 'solid' : 'outline'}
          borderRadius="full">
          <Text fontSize="16px" color={tab === 0 ? 'white' : undefined}>
            Na żywo
          </Text>
        </Badge>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (!toast.isActive(toastId)) {
            toast.show({
              id: toastId,
              title: 'Funkcjonalność oczekuje na wdrożenie',
            });
          }
        }}>
        <Badge colorScheme="gray" borderRadius="full">
          <Text fontSize="16px" color="gray.500">
            Pełny rozkład
          </Text>
        </Badge>
      </TouchableOpacity>
    </HStack>
  );
}
