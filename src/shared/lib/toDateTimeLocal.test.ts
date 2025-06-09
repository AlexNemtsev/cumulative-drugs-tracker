import { toDateTimeLocal } from './toDateTimeLocal';

describe('функция toDateTimeLocal', () => {
  it('должна корректно отформатировать дату и время', () => {
    const date = new Date(2023, 4, 15, 13, 45); // May 15, 2023, 13:45
    expect(toDateTimeLocal(date)).toBe('2023-05-15T13:45');
  });

  it('должна добавлять ведущие нули к 1-значным компонентам даты', () => {
    const date = new Date(2023, 0, 2, 3, 4); // Jan 2, 2023, 03:04
    expect(toDateTimeLocal(date)).toBe('2023-01-02T03:04');
  });

  it('должна обрабатывать некорректную дату', () => {
    const invalidDate = new Date('invalid-date');
    expect(toDateTimeLocal(invalidDate)).toBe('NaN-NaN-NaNTNaN:NaN');
  });
});
