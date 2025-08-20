import { Form } from '@radix-ui/react-form';
import { fireEvent, render, screen } from '@testing-library/react';

import { InputField, type InputFieldProps } from './InputField';

const setup = (props: InputFieldProps) =>
  render(
    <Form>
      <InputField {...props} />
      <button type="submit">Submit</button>
    </Form>
  );

describe('InputField', () => {
  it('рендерит label и input', () => {
    setup({ label: 'Имя', name: 'username' });

    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Имя' }));
  });

  it('прокидывает пропсы в input', () => {
    setup({ label: 'Email', name: 'Email', type: 'email', disabled: true, required: true });

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('required');
  });

  it('показывает ошибку при незаполненном обязательном поле', () => {
    setup({ label: 'Email', name: 'Email', type: 'email', required: true });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Обязательное поле')).toBeInTheDocument();
  });
});
