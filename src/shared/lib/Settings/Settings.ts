import type { SettingsType } from '@/shared/types/Settings';

export class Settings {
  private static lsKey = 'settings';

  private static _defaultSettings: SettingsType = {
    activeIngredient: '',
    dayTarget: '',
    doses: [],
    name: '',
    targetDose: '',
  };

  static getSettings() {
    const settings = localStorage.getItem(Settings.lsKey);

    if (settings) {
      return JSON.parse(settings) as unknown as SettingsType;
    }

    Settings.setDefaultSettings();

    return Settings.defaultSettings;
  }

  static setSetting<T extends keyof SettingsType>(settingKey: T, settingValue: SettingsType[T]) {
    const currentSettings = Settings.getSettings();
    currentSettings[settingKey] = settingValue;
    localStorage.setItem(Settings.lsKey, JSON.stringify(currentSettings));
  }

  static setDefaultSettings() {
    localStorage.setItem(Settings.lsKey, JSON.stringify(Settings._defaultSettings));
  }

  static get defaultSettings() {
    return Settings._defaultSettings;
  }
}
