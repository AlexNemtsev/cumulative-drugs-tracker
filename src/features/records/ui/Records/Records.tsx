import { ScrollArea, Text } from '@radix-ui/themes';

import { Record } from '@/entities/record/ui/Record/Record';
import { useRecords } from '@/shared/providers/RecordsProvider';

import { recordsClass } from './Records.css';

export const Records = () => {
  const { records } = useRecords();

  return records.length ? (
    <ScrollArea type="scroll" className={recordsClass}>
      {records.map((record) => (
        <Record key={record.id} record={record} />
      ))}
    </ScrollArea>
  ) : (
    <Text align="center" size="4">
      Записей нет
    </Text>
  );
};
