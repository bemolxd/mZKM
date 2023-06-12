import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Heading, HStack, theme, VStack } from 'native-base';
import React, { PropsWithChildren, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigatorParamList } from '../../views';

type Props = PropsWithChildren<{
  title: string;
  withGoBack?: boolean;
  withSettings?: boolean;
}>;

export function AppBar({
  title,
  withGoBack,
  withSettings = true,
  children,
}: Props): ReactElement {
  const navigation = useNavigation<NavigationProp<StackNavigatorParamList>>();

  return (
    <VStack
      safeAreaTop
      w="100%"
      bg="white"
      p={4}
      space={4}
      zIndex={1}
      borderBottomRadius={4}>
      <HStack w="100%" justifyItems="space-between" alignItems="center">
        <HStack flexGrow={1} alignItems="center" space={1}>
          {withGoBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={24} />
            </TouchableOpacity>
          )}
          <Heading size="lg">{title}</Heading>
        </HStack>
        {withSettings && (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <MaterialIcons
              name="settings"
              size={24}
              color={theme.colors.orange['500']}
            />
          </TouchableOpacity>
        )}
      </HStack>
      {children}
    </VStack>
  );
}
