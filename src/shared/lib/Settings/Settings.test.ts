import { settings as settingsMock } from 'tests/mocks/settings';

import { SettingsController } from './Settings';

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

  it('getSetting позволяет получить конкретную настройку приложения', () => {
    const actualSetting = settingsMock.name;

    const setting = SettingsController.getSetting('name');

    expect(setting).toBe(actualSetting);
  });

  it('getSetting возвращает null, если настройка не найдена', () => {
    // act
    const settings = SettingsController.getSetting('notExistingKey');

    // assert
    expect(settings).toBeNull();
  });

  it('getSetting возвращает null, если настройки приложения не заданы', () => {
    localStorage.removeItem('settings');

    const settings = SettingsController.getSetting('someKey');

    expect(settings).toBeNull();
  });

  it('Позволяет сохранить переданные настройки', () => {
    const newSettings = {
      settingA: 'string',
      settingB: {
        someKey: 'string',
      },
      array: ['a', 'b', 'c'],
    };

    SettingsController.setSettings(newSettings);
    const settings = SettingsController.getSettings();

    expect(settings).toEqual(newSettings);
  });
});
