import { Form } from '@radix-ui/react-form';
import { render } from '@testing-library/react';
import type { ComponentType, ComponentProps } from 'react';

export const renderWithForm = <T extends ComponentType<any>>(
  Component: T,
  props: ComponentProps<T>
) =>
  render(
    <Form>
      <Component {...props} />
      <button type="submit">Submit</button>
    </Form>
  );
