import { Flex, ScrollArea, Text } from '@radix-ui/themes';

import { Record } from '@/entities/record/ui/Record/Record';
import type { DoseRecord } from '@/shared/types/DoseRecord';

import { recordsClass } from './Records.css';

type Props = {
  dayRecords: Required<DoseRecord>[];
};

export const Records = (props: Props) => {
  const { dayRecords } = props;

  return (
    <Flex direction="column" gap="5" mt="2">
      {dayRecords.length ? (
        <ScrollArea type="scroll" className={recordsClass}>
          {dayRecords.map((record) => (
            <Record key={record.id} record={record} />
          ))}
        </ScrollArea>
      ) : (
        <Text align="center" size="4">
          Записей нет
        </Text>
      )}
    </Flex>
  );
};
