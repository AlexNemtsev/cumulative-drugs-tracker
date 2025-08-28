import { fireEvent, screen } from '@testing-library/react';

import { renderWithForm } from 'tests/helpers/renderWithForm';

import { InputNumber } from './InputNumber';

describe('InputNumber', () => {
  it('отрисовывает input с type="text" и inputMode="decimal"', () => {
    renderWithForm(InputNumber, { label: 'Масса', name: 'mass' });

    const input = screen.getByRole('textbox', { name: 'Масса' });

    expect(screen.getByText('Масса')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputMode', 'decimal');
  });

  it('заменяет запятые на точки', () => {
    renderWithForm(InputNumber, { label: 'Масса', name: 'mass' });
    const input = screen.getByRole('textbox', { name: 'Масса' });

    fireEvent.change(input, {
      target: {
        value: '1,2',
      },
    });

    expect(input).toHaveValue('1.2');
  });

  it('не позволяет вводить больше одной точки', () => {
    renderWithForm(InputNumber, { label: 'Масса', name: 'mass' });
    const input = screen.getByRole('textbox', { name: 'Масса' });

    fireEvent.change(input, {
      target: {
        value: '1.2.3',
      },
    });

    expect(input).toHaveValue('1.23');
  });

  it('не позволяет вводить больше 1 нуля перед точкой', () => {
    renderWithForm(InputNumber, { label: 'Масса', name: 'mass' });
    const input = screen.getByRole('textbox', { name: 'Масса' });

    fireEvent.change(input, {
      target: {
        value: '00.1',
      },
    });

    expect(input).toHaveValue('0.1');
  });

  it('подставляет ноль перед точкой, если вводится число меньше 1', () => {
    renderWithForm(InputNumber, { label: 'Масса', name: 'mass' });
    const input = screen.getByRole('textbox', { name: 'Масса' });

    fireEvent.change(input, {
      target: {
        value: '.1',
      },
    });

    expect(input).toHaveValue('0.1');
  });
});
