import { openDB } from 'idb';
import type { DBSchema, IDBPObjectStore } from 'idb';

export type DBRecord = {
  id?: number;
  datetime: string;
  dose: string;
  targetDose: string;
};

interface DosesDB extends DBSchema {
  records: {
    key: number;
    value: DBRecord;
    indexes: { 'by-datetime': string };
  };
}

export class DBController {
  private static async getDb() {
    return openDB<DosesDB>('doses', 2, {
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
  }

  static async addRecord(record: DBRecord) {
    const db = await DBController.getDb();
    await db.add('records', record);
  }

  static async getRecords() {
    const db = await DBController.getDb();
    const records = await db.getAll('records');

    return records;
  }

  static async updateRecord(record: Required<DBRecord>) {
    const db = await DBController.getDb();
    await db.put('records', record);
  }

  static async deleteRecord(recordId: number) {
    const db = await DBController.getDb();
    await db.delete('records', recordId);
  }
}
