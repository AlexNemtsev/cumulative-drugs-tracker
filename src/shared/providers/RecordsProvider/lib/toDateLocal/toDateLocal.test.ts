import { toDateLocal } from '.';

describe('функция toDateLocal', () => {
  it('форматирует дату', () => {
    const date = new Date(2023, 4, 15, 13, 45);
    expect(toDateLocal(date)).toBe('2023-05-15');
  });

  it('добавляет ведущие нули к 1-значным компонентам даты', () => {
    const date = new Date(2023, 0, 2, 3, 4); // Jan 2, 2023, 03:04
    expect(toDateLocal(date)).toBe('2023-01-02');
  });

  it('обрабатывает некорректную дату', () => {
    const invalidDate = new Date('invalid-date');
    expect(() => toDateLocal(invalidDate)).toThrowError('Invalid Date');
  });
});
