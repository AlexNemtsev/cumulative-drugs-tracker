import { Box, Flex, Separator, Text } from '@radix-ui/themes';

import type { RecordType } from '@/shared/types/Record';

import { container, separator } from './Content.css';

type Props = {
  record: Pick<RecordType, 'datetime' | 'dose'>;
};

export const Content = (props: Props) => {
  const {
    record: { datetime, dose },
  } = props;

  const date = new Date(datetime);

  return (
    <Box className={container} data-testid="record-content">
      <Flex direction="column" gap="2">
        <Text size="6" weight="medium">
          {date.toLocaleDateString('ru-RU')}
        </Text>
        <Flex justify="between">
          <Text size="6" weight="medium">
            {date.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
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
