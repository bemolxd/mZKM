import { VStack, theme, HStack, Divider, Text, Box } from 'native-base';
import React, { ReactElement } from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';

export function AboutAppCard(): ReactElement {
  const appVersion = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  return (
    <VStack w="100%" bg={theme.colors.white} borderRadius={8} p={2} space={1}>
      <HStack w="100%" alignItems="center" space={2}>
        <Box bg={theme.colors.orange['500']} borderRadius={4} p={1}>
          <MaterialCommunityIcons
            name="information-outline"
            size={18}
            color={theme.colors.white}
          />
        </Box>
        <Text fontSize={18}>Informacje</Text>
      </HStack>
      <Divider />
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize={14}>Wersja aplikacji</Text>
        <Text fontSize={14} color={theme.colors.coolGray['500']}>
          {appVersion}
        </Text>
      </HStack>
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize={14}>Numer kompilacji</Text>
        <Text fontSize={14} color={theme.colors.coolGray['500']}>
          {buildNumber}
        </Text>
      </HStack>
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize={14}>Twórca</Text>
        <Text fontSize={14} color={theme.colors.coolGray['500']}>
          Bemideas
        </Text>
      </HStack>
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize={14}>Strona twórcy</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://bemideas.pl')}>
          <Text fontSize={14} color={theme.colors.orange['500']}>
            bemideas.pl
          </Text>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
