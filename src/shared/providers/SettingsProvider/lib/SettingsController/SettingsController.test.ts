import { settings as settingsMock } from 'tests/mocks/settings';

import { SettingsController } from './SettingsController';

describe('SettingsController', () => {
  beforeEach(() => {
    localStorage.setItem('settings', JSON.stringify(settingsMock));
  });

  it('Позволяет получить все настройки приложения', () => {
    // act
    const settings = SettingsController.getSettings();

    // assert
    expect(settings).toEqual(settingsMock);
  });

  it('Возвращает null, если настройки не заданы', () => {
    localStorage.removeItem('settings');

    const settings = SettingsController.getSettings();

    expect(settings).toBeNull();
  });

  it('Позволяет сохранить переданные настройки', () => {
    const newSettings = {
      ...settingsMock,
      name: 'test',
    };

    SettingsController.setSettings(newSettings);
    const settings = SettingsController.getSettings();

    expect(settings).toEqual(newSettings);
  });
});
