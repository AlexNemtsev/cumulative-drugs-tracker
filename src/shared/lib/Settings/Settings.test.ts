import type { SettingsType } from '@/shared/types/Settings';

import { Settings } from './Settings';

const allSettings: SettingsType = {
  name: 'Роаккутан',
  activeIngredient: 'Изотретиноин',
  doses: ['8', '16', '20', '24'],
  targetDose: '10500',
  dayTarget: '20',
};

describe('Класс Settings', () => {
  it('getSettings возвращает настройки по-умолчанию, если ключ settings не найде в localStorage', () => {
    localStorage.removeItem('settings');

    const settings = Settings.getSettings();

    expect(settings).toEqual(Settings.defaultSettings);
  });

  it('getSettings возвращает объект с настройками', () => {
    // act
    const settings = Settings.getSettings();

    // assert
    expect(settings).toEqual(allSettings);
  });

  it('setDefaultSettings устанавливает настройки по-умолчанию', () => {
    Settings.setDefaultSettings();

    const settings = Settings.getSettings();

    expect(settings).toEqual(Settings.defaultSettings);
  });

  it('setSetting устанавливает заданную настройку', () => {
    const expected = { ...allSettings, dayTarget: '42' };

    Settings.setSetting('dayTarget', '42');
    const settings = Settings.getSettings();

    expect(settings).toEqual(expected);
  });
});
