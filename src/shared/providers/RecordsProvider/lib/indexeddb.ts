import { openDB } from 'idb';
import type { DBSchema, IDBPObjectStore } from 'idb';

import type { RecordType } from '../../../types/Record';

interface DosesDB extends DBSchema {
  records: {
    key: number;
    value: RecordType;
    indexes: { 'by-datetime': string };
  };
}

export const getDb = async () =>
  openDB<DosesDB>('doses', 2, {
    upgrade: async (db, oldVersion, _, transaction) => {
      let store: IDBPObjectStore<DosesDB, ArrayLike<'records'>, 'records', 'versionchange'>;

      if (!db.objectStoreNames.contains('records')) {
        store = db.createObjectStore('records', {
          keyPath: 'id',
          autoIncrement: true,
        });

        store.createIndex('by-datetime', 'datetime');
      } else {
        store = transaction.objectStore('records');

        if (!store.indexNames.contains('by-datetime')) {
          store.createIndex('by-datetime', 'datetime');
        }
      }

      if (oldVersion < 2) {
        const allRecords = await store.getAll();

        const updates = allRecords
          .filter((record) => record.targetDose === undefined)
          .map((record) => {
            const newRecord = { ...record };
            newRecord.targetDose = '16';

            return store.put(newRecord);
          });
        await Promise.all(updates);
      }
    },
  });

export const addRecord = async (record: RecordType) => {
  const db = await getDb();
  await db.add('records', record);
};

export const getRecords = async () => {
  const db = await getDb();
  const records = await db.getAll('records');

  return records;
};

export const updateRecord = async (record: Required<RecordType>) => {
  const db = await getDb();
  await db.put('records', record);
};

export const deleteRecord = async (recordId: number) => {
  const db = await getDb();
  await db.delete('records', recordId);
};
