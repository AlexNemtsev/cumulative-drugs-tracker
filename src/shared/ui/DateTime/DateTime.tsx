import { useState, type ChangeEvent, type ComponentPropsWithRef } from 'react';

import { input } from './DateTime.css';

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

  return (
    <input
      type="datetime-local"
      className={input}
      value={value}
      onChange={onChangeHandler}
      {...restProps}
    />
  );
};
