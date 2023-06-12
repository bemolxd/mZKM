import { Badge, HStack, Text } from 'native-base';
import React, { ReactElement } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  vehicleType: string;
  number: number | undefined;
};

export function LineBadge({ vehicleType, number }: Props): ReactElement {
  return (
    <Badge
      borderRadius="full"
      colorScheme={vehicleType === 'T' ? 'green' : 'orange'}>
      <HStack alignItems="center">
        <MaterialIcons name={vehicleType === 'A' ? 'directions-bus' : 'tram'} />
        <Text>{number ?? '?'}</Text>
      </HStack>
    </Badge>
  );
}
