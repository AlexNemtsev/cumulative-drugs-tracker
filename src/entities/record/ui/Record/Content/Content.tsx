import { Box, Flex, Separator, Text } from '@radix-ui/themes';

import { container, separator } from './Content.css';

type Props = {
  time: string;
  dose: string;
};

export const Content = (props: Props) => {
  const { dose, time } = props;

  return (
    <Box className={container} data-testid="record-content">
      <Flex direction="column" gap="2">
        <Flex justify="between">
          <Text size="6" weight="medium">
            {time}
          </Text>
          <Text size="6" weight="medium">
            {dose} мг
          </Text>
        </Flex>
      </Flex>
      <Separator size="4" className={separator} />
    </Box>
  );
};
