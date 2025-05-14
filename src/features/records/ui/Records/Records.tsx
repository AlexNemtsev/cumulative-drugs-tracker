import { ScrollArea, Text } from '@radix-ui/themes';

import { useRecords } from '@/shared/providers/RecordsProvider';

import styles from './Records.module.css';
import { Record } from '../../../../entities/record/ui/Record/Record';

export const Records = () => {
  const { records } = useRecords();

  return records.length ? (
    <ScrollArea type="scroll" className={styles.records}>
      {records.map((record) => (
        <Record key={record.id} datetime={record.datetime} dose={record.dose} />
      ))}
    </ScrollArea>
  ) : (
    <Text align="center" size="4">
      Записей нет
    </Text>
  );
};
