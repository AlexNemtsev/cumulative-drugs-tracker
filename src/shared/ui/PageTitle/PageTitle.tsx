import { Text } from '@radix-ui/themes';

type Props = {
  children: string;
};

export const PageTitle = (props: Props) => {
  const { children } = props;

  return (
    <Text size="8" align="center" weight="medium">
      {children}
    </Text>
  );
};
