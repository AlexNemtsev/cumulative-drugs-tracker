import { screen } from '@testing-library/react';

import { renderWithForm } from 'tests/helpers/renderWithForm';

import { InputField } from './InputField';

describe('InputField', () => {
  it('рендерит label и input', () => {
    renderWithForm(InputField, { label: 'Имя', name: 'username' });

    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Имя' }));
  });
});
