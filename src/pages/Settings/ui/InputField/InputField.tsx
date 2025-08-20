import { Control, Field, Label, Message } from '@radix-ui/react-form';
import { Flex, TextField, Text } from '@radix-ui/themes';

import { inputField, text } from './InputField.css';

type OmittedProps = 'className' | 'name' | 'variant' | 'size' | 'radius';

export interface InputFieldProps extends Omit<TextField.RootProps, OmittedProps> {
  label: string;
  name: string;
}

export const InputField = (props: InputFieldProps) => {
  const { label, name, ...restProps } = props;

  return (
    <Field name={name}>
      <Flex direction="column" gap="1">
        <Label className={text}>
          <Text size="3">{label}</Text>
        </Label>
        <Control asChild>
          <TextField.Root
            className={inputField}
            variant="soft"
            size="3"
            radius="full"
            {...restProps}
          />
        </Control>
        <Message match="valueMissing" className={text}>
          <Text color="red">Обязательное поле</Text>
        </Message>
      </Flex>
    </Field>
  );
};
