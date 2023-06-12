import { theme, HStack, Box, Text, Select } from 'native-base';
import React, { ReactElement, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function TranslationCard(): ReactElement {
  const [lang, setLang] = useState<string>('pl');

  return (
    <HStack w="100%" bg={theme.colors.white} borderRadius={8} p={2} mb={2}>
      <HStack flexGrow={1} space={2} alignItems="center">
        <Box bg={theme.colors.lightBlue['500']} borderRadius={4} p={1}>
          <MaterialCommunityIcons
            name="translate"
            color={theme.colors.white}
            size={18}
          />
        </Box>
        <Text fontSize={18}>Język</Text>
      </HStack>
      <Select
        selectedValue={lang}
        onValueChange={setLang}
        w={24}
        dropdownIcon={
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={theme.colors.gray['600']}
          />
        }
        _selectedItem={{
          justifyItems: 'center',
          endIcon: (
            <MaterialCommunityIcons
              name="check"
              size={22}
              color={theme.colors.gray['600']}
            />
          ),
        }}
        _actionSheet={{ hideDragIndicator: true }}>
        <Select.Item label="Polski" value="pl" />
      </Select>
    </HStack>
  );
}
