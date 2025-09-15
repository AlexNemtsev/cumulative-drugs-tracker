import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { toDateLocal } from '@/shared/lib/toDateLocal';
import type { DoseRecord } from '@/shared/types/DoseRecord';
import type { RecordType } from '@/shared/types/Record';

import {
  getRecords,
  addRecord as addRecordToDb,
  updateRecord as updateRecordToDb,
  deleteRecord as deleteRecordFromDb,
} from './lib/indexeddb';
import { RecordsContext } from './RecordsContext';
import { useErrorDialog } from '../ErrorDialogProvider';

export const RecordsProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<Required<DoseRecord>[]>([]);
  const { showError } = useErrorDialog();

  const loadRecords = useCallback(async () => {
    try {
      const dbRecords = (await getRecords()) as Required<RecordType>[];
      const sortedRecords = dbRecords
        .toSorted((a, b) => {
          const aTime = new Date(a.datetime);
          const bTime = new Date(b.datetime);

          return bTime.getTime() - aTime.getTime();
        })
        .map((record) => ({
          id: record.id,
          date: new Date(record.datetime),
          time: record.datetime.split('T')[1],
          dose: record.dose,
          targetDose: record.targetDose,
        }));

      setRecords(sortedRecords);
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при загрузке записей');
      }
    }
  }, []);

  const addRecord = useCallback(async (record: Omit<DoseRecord, 'id'>) => {
    try {
      const newRecord = {
        datetime: `${toDateLocal(record.date)}T${record.time}`,
        dose: record.dose,
        targetDose: record.targetDose,
      };

      await addRecordToDb(newRecord);
      await loadRecords();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при сохранении записи');
      }
    }
  }, []);

  const updateRecord = useCallback(async (record: Required<DoseRecord>) => {
    try {
      const updatedRecord = {
        datetime: `${toDateLocal(record.date)}T${record.time}`,
        dose: record.dose,
        targetDose: record.targetDose,
        id: record.id,
      };

      await updateRecordToDb(updatedRecord);
      await loadRecords();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при редактировании записи');
      }
    }
  }, []);

  const deleteRecord = useCallback(async (recordId: number) => {
    try {
      await deleteRecordFromDb(recordId);
      await loadRecords();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Ошибка при удалении записи');
      }
    }
  }, []);

  const recordsValue = useMemo(
    () => ({ records, addRecord, updateRecord, deleteRecord, loadRecords }),
    [records]
  );

  useEffect(() => {
    loadRecords();
  }, []);

  return <RecordsContext.Provider value={recordsValue}>{children}</RecordsContext.Provider>;
};
