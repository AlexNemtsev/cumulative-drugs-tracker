import { useEffect, useMemo, useState, type ReactNode } from 'react';

import type { RecordType } from '@/shared/types/Record';

import {
  getRecords,
  addRecord as addRecordToDb,
  updateRecord as updateRecordToDb,
} from './lib/indexeddb';
import { RecordsContext } from './RecordsContext';
import { useErrorDialog } from '../ErrorDialogProvider';

export const RecordsProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<Required<RecordType>[]>([]);
  const { showError } = useErrorDialog();

  const loadRecords = async () => {
    try {
      const dbRecords = (await getRecords()) as Required<RecordType>[];
      const sortedRecords = dbRecords.toSorted((a, b) => {
        const aTime = new Date(a.datetime);
        const bTime = new Date(b.datetime);

        return bTime.getTime() - aTime.getTime();
      });

      setRecords(sortedRecords);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при загрузке записей');
      }
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const addRecord = async (record: Omit<RecordType, 'id'>) => {
    try {
      await addRecordToDb(record);
      await loadRecords();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при сохранении записи');
      }
    }
  };

  const updateRecord = async (record: Required<RecordType>) => {
    try {
      await updateRecordToDb(record);
      await loadRecords();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
        console.error(error);
      } else {
        showError('Ошибка при редактировании записи');
      }
    }
  };

  const contextValue = useMemo(
    () => ({ records, addRecord, updateRecord, reload: loadRecords }),
    [records]
  );

  return <RecordsContext.Provider value={contextValue}>{children}</RecordsContext.Provider>;
};
