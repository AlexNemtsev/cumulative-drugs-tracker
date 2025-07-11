import { Form } from '@radix-ui/react-form';
import { fireEvent, render, screen } from '@testing-library/react';

import { FormField, type FormFieldProps } from './FormField';

const setup = (props: Omit<FormFieldProps, 'children'>) =>
  render(
    <Form>
      <FormField {...props}>
        <input required name={props.name} />
      </FormField>
      <button type="submit">Submit</button>
    </Form>
  );

describe('Компонент FormField', () => {
  it('рендерит label, name и children', () => {
    setup({ label: 'Имя', name: 'username' });

    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username');
  });

  it('отображает переданное сообщение об ошибке', () => {
    const errorMessage = 'Поле обязательно';
    setup({ label: 'Имя', name: 'username', valueMissingError: errorMessage });

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
