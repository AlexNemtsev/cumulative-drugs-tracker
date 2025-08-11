import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';

import { records } from './mocks/records';

vi.mock('idb', async () => {
  const actual = await vi.importActual('idb');

  return {
    ...actual,
    openDB: vi.fn().mockResolvedValue({
      add: vi.fn(),
      getAll: vi.fn(() => records),
      put: vi.fn(),
      delete: vi.fn(),
    }),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

beforeEach(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {
      settings: JSON.stringify({
        name: 'Роаккутан',
        activeIngredient: 'Изотретиноин',
        doses: ['8', '16', '20', '24'],
        targetDose: '10500',
        dayTarget: '20',
      }),
    };

    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  vi.stubGlobal('localStorage', localStorageMock);
});
