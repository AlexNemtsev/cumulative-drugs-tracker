import { useState, type ChangeEvent, type ComponentPropsWithRef } from 'react';

interface Props extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export const DateTime = (props: Props) => {
  const { value: defaultValue, onChange, ...restProps } = props;
  const [value, setValue] = useState<string>(defaultValue ?? '');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return <input type="datetime-local" value={value} onChange={onChangeHandler} {...restProps} />;
};
