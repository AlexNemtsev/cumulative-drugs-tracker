import { TextField } from '@radix-ui/themes';

import { FormField } from '@/shared/ui/FormField';

import { inputField } from './InputField.css';

type OmittedProps = 'className' | 'name' | 'variant' | 'size' | 'radius';

export interface InputFieldProps extends Omit<TextField.RootProps, OmittedProps> {
  label: string;
  name: string;
  ref?: React.Ref<HTMLInputElement> | null;
}

export const InputField = (props: InputFieldProps) => {
  const { label, name, ref, ...restProps } = props;

  return (
    <FormField name={name} label={label}>
      <TextField.Root
        className={inputField}
        variant="soft"
        size="3"
        radius="full"
        {...restProps}
        ref={ref}
      />
    </FormField>
  );
};
