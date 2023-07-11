import {
  Box,
  Divider,
  Heading,
  HStack,
  Spinner,
  theme,
  VStack,
} from 'native-base';
import React, { memo, useRef, useState } from 'react';
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
import { useSearchQuery } from '../../queries/searchQuery';
import { DataSetItem } from './types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LineBadge } from '../LineBadge';
import { useTranslation } from 'react-i18next';

type Props = {
  onSelect: (item: DataSetItem | null) => void;
  onClear: () => void;
  direction?: 'up' | 'down';
  placeholder: string;
  zIndex?: number;
};

export const StopsSearchBar = memo(
  ({
    onSelect,
    onClear,
    direction = 'down',
    placeholder,
    zIndex = 10,
  }: Props) => {
    const dropdownController = useRef<AutocompleteDropdownRef>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { results, isLoading } = useSearchQuery(searchQuery);
    const dataSet: DataSetItem[] = results.map(stop => ({
      id: String(stop.id),
      stopId: stop.id,
      title: stop.name,
      coords: {
        lng: stop.lng,
        lat: stop.lat,
      },
      lines: stop.lines,
    }));
    const { t } = useTranslation();

    return (
      <Box flexGrow={1} flexShrink={1} zIndex={zIndex}>
        <AutocompleteDropdown
          EmptyResultComponent={
            <VStack w="100%" p={4} alignItems="center">
              {isLoading ? (
                <Spinner size="sm" color={theme.colors.gray['600']} />
              ) : (
                <Heading size="md" fontWeight={400}>
                  {searchQuery === ''
                    ? placeholder
                    : t('StopsSearchBar.noData')}
                </Heading>
              )}
            </VStack>
          }
          controller={controller => {
            // @ts-ignore
            dropdownController.current = controller;
          }}
          debounce={300}
          dataSet={dataSet}
          loading={isLoading}
          useFilter={false}
          direction={direction}
          onChangeText={value => setSearchQuery(value)}
          onSelectItem={item => onSelect(item as DataSetItem)}
          onClear={onClear}
          textInputProps={{
            placeholder: placeholder,
            autoCorrect: true,
            autoCapitalize: 'none',
            style: {
              color: theme.colors.gray['600'],
            },
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          inputContainerStyle={{
            borderRadius: 8,
            backgroundColor: theme.colors.gray['100'],
          }}
          suggestionsListContainerStyle={{
            backgroundColor: theme.colors.white,
          }}
          ChevronIconComponent={
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={theme.colors.gray['600']}
            />
          }
          ClearIconComponent={
            <MaterialIcons
              name="clear"
              size={20}
              color={theme.colors.gray['600']}
            />
          }
          ItemSeparatorComponent={<Divider />}
          renderItem={item => {
            const selectedItem = item as DataSetItem;

            return (
              <VStack w="100%" p={2} space={2} key={item.id}>
                <Heading size="md" fontWeight={500}>
                  {selectedItem.title}
                </Heading>
                <HStack space={2} flexWrap="wrap">
                  {selectedItem.lines.map(line => (
                    <LineBadge
                      key={line.number}
                      vehicleType={line.vehicleType}
                      number={line.number}
                    />
                  ))}
                </HStack>
              </VStack>
            );
          }}
        />
      </Box>
    );
  },
);
