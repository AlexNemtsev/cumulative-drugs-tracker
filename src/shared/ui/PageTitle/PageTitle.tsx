import { Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const PageTitle = (props: Props) => {
  const { children } = props;

  return (
    <Text size="8" align="center" weight="medium">
      {children}
    </Text>
  );
};
