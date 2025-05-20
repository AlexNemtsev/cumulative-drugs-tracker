import { Box, ContextMenu, Flex, Separator, Text } from '@radix-ui/themes';

import type { RecordType } from '@/shared/types/Record';

import styles from './Content.module.css';

type Props = {
  record: RecordType;
};

export const Content = (props: Props) => {
  const {
    record: { datetime, dose },
  } = props;

  const date = new Date(datetime);

  return (
    <ContextMenu.Trigger>
      <Box className={styles.container}>
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
        <Separator size="4" className={styles.separator} />
      </Box>
    </ContextMenu.Trigger>
  );
};
