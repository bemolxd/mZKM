import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Badge, HStack, Text, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
};

export function TimetableDataSwitch({ tab, setTab }: Props): ReactElement {
  const toast = useToast();
  const toastId = 'full-schedule';

  const { t } = useTranslation();

  return (
    <HStack w="100%" justifyContent="center" space={8}>
      <TouchableOpacity onPress={() => setTab(0)}>
        <Badge
          colorScheme="orange"
          variant={tab === 0 ? 'solid' : 'outline'}
          borderRadius="full">
          <Text fontSize="16px" color={tab === 0 ? 'white' : undefined}>
            {t('TimetableDataSwitch.live')}
          </Text>
        </Badge>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (!toast.isActive(toastId)) {
            toast.show({
              id: toastId,
              title: t('TimetableDataSwitch.toast'),
            });
          }
        }}>
        <Badge colorScheme="gray" borderRadius="full">
          <Text fontSize="16px" color="gray.500">
            {t('TimetableDataSwitch.fullSchedule')}
          </Text>
        </Badge>
      </TouchableOpacity>
    </HStack>
  );
}
