import { Center, Text, theme } from 'native-base';
import React, { ReactElement } from 'react';
import { DataSetItem } from '../../components/StopsSearchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TimetableScrollView } from './TimetableScrollView';

type Props = {
  stop: DataSetItem | null;
};

export function TimetableViewContainer({ stop }: Props): ReactElement {
  if (!stop) {
    return (
      <Center h="100%" safeAreaBottom={48}>
        <MaterialCommunityIcons
          name="file-table-box-outline"
          color={theme.colors.gray['400']}
          size={48}
        />
        <Text color={theme.colors.gray['400']}>Wybierz przystanek</Text>
      </Center>
    );
  }

  return <TimetableScrollView stop={stop} />;
}
