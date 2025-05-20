import { openDB } from 'idb';
import type { DBSchema } from 'idb';

import type { RecordType } from '../../../types/Record';

interface MyDB extends DBSchema {
  records: {
    key: number;
    value: RecordType;
    indexes: { 'by-datetime': string };
  };
}

export const getDb = async () =>
  openDB<MyDB>('my-app-db', 1, {
    upgrade(db) {
      const store = db.createObjectStore('records', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-datetime', 'datetime');
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
