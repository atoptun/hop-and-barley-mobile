import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  HAS_ONBOARDED: 'settings:has_onboarded',
  THEME_MODE: 'settings:theme_mode',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const appSettings = {
  onboarding: createSetting<boolean>(STORAGE_KEYS.HAS_ONBOARDED, false),
  themeMode: createSetting<'light' | 'dark' | 'system'>(STORAGE_KEYS.THEME_MODE, 'system'),
};

// private

function createSetting<T>(key: StorageKey, defaultValue: T) {
  return {
    get: () => getItem<T>(key, defaultValue),
    set: (value: T) => setItem<T>(key, value),
    remove: () => removeItem(key),
  };
}

async function getItem<T>(key: StorageKey, defaultValue: T): Promise<T> {
  try {
    const rawValue = await AsyncStorage.getItem(key);
    if (rawValue === null) {
      return defaultValue;
    }
    return JSON.parse(rawValue) as T;
  } catch (error) {
    console.error(`[AppSettings] Failed to read key "${key}":`, error);
    return defaultValue;
  }
}

async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue);
  } catch (error) {
    console.error(`[AppSettings] Failed to save key "${key}":`, error);
  }
}

async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[AppSettings] Failed to remove key "${key}":`, error);
  }
}
