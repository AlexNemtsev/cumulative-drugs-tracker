import { Control, Field, Label, Message } from '@radix-ui/react-form';
import { Flex, Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';

import { text } from './FormField.css';

export type FormFieldProps = {
  label: string;
  name: string;
  children?: ReactNode;
  valueMissingError?: string;
};

export const FormField = (props: FormFieldProps) => {
  const { label, name, children, valueMissingError } = props;

  return (
    <Field name={name}>
      <Flex gap="1" direction="column">
        <Label className={text}>
          <Text size="3">{label}</Text>
        </Label>
        <Control asChild>{children}</Control>
      </Flex>
      <Message match="valueMissing">
        <Text color="red" className={text}>
          {valueMissingError ?? 'Обязательное поле'}
        </Text>
      </Message>
    </Field>
  );
};
