import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';

export function useAsyncStorage<Value = string>(
  key: string,
  defaultValue: Value,
) {
  const [storedValue, setStoredValue] = useState<Value>(defaultValue);

  const get = useCallback(async (): Promise<Value> => {
    try {
      const localValue = await AsyncStorage.getItem(key);

      if (localValue) {
        return JSON.parse(localValue);
      }

      await AsyncStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch {
      return storedValue;
    }
  }, []);

  const set = useCallback(async (value: Value): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      setStoredValue(value);
    }
  }, []);

  return {
    get,
    set,
  };
}
