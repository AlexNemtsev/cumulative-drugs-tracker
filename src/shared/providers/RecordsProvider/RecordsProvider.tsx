import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { getRecords, addRecord as addRecordToDb } from '@/shared/lib/indexeddb';
import type { RecordType } from '@/shared/types/Record';

import { RecordsContext } from './RecordsContext';
import { useErrorDialog } from '../ErrorDialogProvider';

export const RecordsProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const { showError } = useErrorDialog();

  const loadRecords = async () => {
    try {
      const allRecords = await getRecords();
      setRecords(allRecords);
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
        console.error(error);
      } else {
        showError('Ошибка при сохранении записи');
      }
    }
  };

  const contextValue = useMemo(() => ({ records, addRecord, reload: loadRecords }), [records]);

  return <RecordsContext.Provider value={contextValue}>{children}</RecordsContext.Provider>;
};
