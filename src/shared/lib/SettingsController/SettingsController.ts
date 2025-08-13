type Settings = Record<string, string | object>;

export class SettingsController {
  private static lsKey = 'settings';

  static getSettings() {
    const settings = localStorage.getItem(SettingsController.lsKey);

    if (settings) {
      return JSON.parse(settings) as unknown as Settings;
    }

    return null;
  }

  static getSetting(key: string) {
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
