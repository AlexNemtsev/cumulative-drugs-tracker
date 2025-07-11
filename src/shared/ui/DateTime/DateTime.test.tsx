import { fireEvent, render, screen } from '@testing-library/react';

import { DateTime } from './DateTime';

describe('DateTime', () => {
  it('Должен отрисовать datetime с переданным значением', () => {
    const initialValue = '2024-06-01T12:34';
    const { container } = render(<DateTime value={initialValue} />);

    const input = container.querySelector('input');

    expect(input).toHaveAttribute('type', 'datetime-local');
    expect(input).toHaveValue(initialValue);
    expect(input).toBeInTheDocument();
  });

  it('Должен вызвать onChange с новым значением при вводе даты', () => {
    const handleChange = vi.fn();
    const { container } = render(<DateTime onChange={handleChange} />);

    const input = container.querySelector('input')!;
    const newValue = '2024-06-02T15:00';

    fireEvent.change(input, { target: { value: newValue } });

    expect(handleChange).toHaveBeenCalledWith(newValue);
    expect(input).toHaveValue(newValue);
  });

  it('Должен отрисовать пустой инпут, если значение не передано', () => {
    const { container } = render(<DateTime />);

    const input = container.querySelector('input');
    expect(input).toHaveValue('');
  });

  it('Должен принимать другие пропсы в инпут', () => {
    render(<DateTime value="" placeholder="Введите дату и время" disabled />);

    const input = screen.getByPlaceholderText('Введите дату и время');

    expect(input).toBeDisabled();
  });

  it('Не должен выбрасывать ошибку, если onChange не задан', () => {
    const { container } = render(<DateTime value="2024-06-01T12:34" />);

    const input = container.querySelector('input')!;
    fireEvent.change(input, { target: { value: '2024-06-03T10:00' } });

    expect(input).toHaveValue('2024-06-03T10:00');
  });
});
