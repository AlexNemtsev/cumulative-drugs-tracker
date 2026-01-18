import { Button } from '@radix-ui/themes';
import { useRef } from 'react';

type Props = {
  onChange: (file: File) => void;
};

export const Upload = (props: Props) => {
  const { onChange } = props;

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        type="file"
        ref={ref}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            onChange(file);
          }

          const { target } = event;
          target.value = '';
        }}
      />
      <Button size="4" variant="outline" onClick={() => ref.current?.click()}>
        Восстановить из файла
      </Button>
    </>
  );
};
