import { Control, Field, Label, Message } from '@radix-ui/react-form';
import { Flex, Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  name: string;
  children?: ReactNode;
  valueMissingError?: string;
};

export const FormField = (props: Props) => {
  const { label, name, children, valueMissingError } = props;

  return (
    <Field name={name}>
      <Flex gap="3" align="center">
        <Label>
          <Text size="4">{label}</Text>
        </Label>
        <Control asChild>{children}</Control>
      </Flex>
      {valueMissingError && (
        <Message match="valueMissing">
          <Text color="red">{valueMissingError}</Text>
        </Message>
      )}
    </Field>
  );
};
