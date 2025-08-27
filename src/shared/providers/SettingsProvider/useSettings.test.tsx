import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import { settings as settingsMock } from 'tests/mocks/settings';

import { SettingsProvider } from './SettingsProvider';
import { useSettings } from './useSettings';

const Wrapper = ({ children }: { children: ReactNode }) => (
  <SettingsProvider>{children}</SettingsProvider>
);

describe('Хук useSettings', () => {
  afterEach(() => {
    localStorage.removeItem('settings');
  });

  it('возвращает настройки из контекста', () => {
    localStorage.setItem('settings', JSON.stringify(settingsMock));

    const { result } = renderHook(() => useSettings(), { wrapper: Wrapper });

    expect(result.current.settings).toEqual(settingsMock);
  });

  it('возвращает null, если настройки не заданы', () => {
    const { result } = renderHook(() => useSettings(), { wrapper: Wrapper });

    expect(result.current.settings).toBeNull();
  });

  it('сохраняет переданные настройки', () => {
    const settings = { ...settingsMock, name: 'test' };

    const { result } = renderHook(() => useSettings(), { wrapper: Wrapper });

    act(() => {
      result.current.updateSettings(settings);
    });

    expect(result.current.settings).toEqual(settings);
  });

  it('должен выбросить ошибку, если контекст не задан', () => {
    expect(() => renderHook(useSettings)).toThrowError(
      'useSettings must be used within SettingsProvider'
    );
  });
});
