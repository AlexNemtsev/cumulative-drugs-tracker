import { openDB } from 'idb';
import type { DBSchema } from 'idb';

interface Record {
  id?: number;
  datetime: string;
  dose: string;
}

interface MyDB extends DBSchema {
  records: {
    key: number;
    value: Record;
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

export const addRecord = async (record: Record) => {
  const db = await getDb();
  await db.add('records', record);
};
