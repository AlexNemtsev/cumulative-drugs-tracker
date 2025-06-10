import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';

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
