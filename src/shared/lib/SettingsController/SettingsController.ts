import type { Settings } from '@/shared/types/Settings';

export class SettingsController {
  private static lsKey = 'settings';

  static getSettings(): Settings | null {
    const settings = localStorage.getItem(SettingsController.lsKey);

    if (settings) {
      return JSON.parse(settings) as unknown as Settings;
    }

    return null;
  }

  static getSetting<T extends keyof Settings>(key: T): Settings[T] | null {
    const settings = SettingsController.getSettings();

    if (!settings) {
      return null;
    }

    if (key in settings) {
      return settings[key];
    }

    return null;
  }

  static setSettings(settings: Settings) {
    localStorage.setItem(SettingsController.lsKey, JSON.stringify(settings));
  }
}
