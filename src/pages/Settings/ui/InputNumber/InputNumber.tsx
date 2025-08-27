import { useState } from 'react';

import { InputField, type InputFieldProps } from '../InputField';

type OmittedProps = 'onChange' | 'type' | 'inputMode';

type InputNumberProps = Omit<InputFieldProps, OmittedProps>;

export const InputNumber = (props: InputNumberProps) => {
  const [value, setValue] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    input = input.replace(/,/g, '.');
    input = input.replace(/^00/, '0');

    if (input.startsWith('.')) {
      input = `0${input}`;
    }

    const parts = input.split('.');

    if (parts.length > 2) {
      input = `${parts.shift()}.${parts.join('')}`;
    }

    setValue(input);
  };

  return (
    <InputField {...props} value={value} onChange={handleChange} type="text" inputMode="decimal" />
  );
};
