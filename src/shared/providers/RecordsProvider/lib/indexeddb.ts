import { openDB, deleteDB } from 'idb';
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

export const migrateDatabase = async () => {
  // 1. Открываем старую базу
  const oldDb = await openDB<DosesDB>('my-app-db', 2);

  if (oldDb.objectStoreNames.contains('records')) {
    // 2. Получаем все записи
    const allRecords = await oldDb.getAll('records');

    // 3. Открываем новую базу (создаём, если нет)
    const newDb = await openDB<DosesDB>('doses', 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('records')) {
          const store = db.createObjectStore('records', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('by-datetime', 'datetime');
        }
      },
    });

    // 4. Копируем все записи
    const tx = newDb.transaction('records', 'readwrite');

    // eslint-disable-next-line no-restricted-syntax
    for (const record of allRecords) {
      // eslint-disable-next-line no-await-in-loop
      await tx.store.put(record);
    }

    await tx.done;
  }

  // 5. (Опционально) Удаляем старую базу
  await oldDb.close();
  await deleteDB('my-app-db');
};
