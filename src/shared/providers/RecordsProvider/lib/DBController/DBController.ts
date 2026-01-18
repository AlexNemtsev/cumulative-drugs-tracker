import { openDB } from 'idb';
import type { DBSchema, IDBPObjectStore } from 'idb';

export type DBRecord = {
  id?: number;
  datetime: string;
  dose: string;
  targetDose: string;
};

export type DosesBackup = {
  meta: {
    version: 1;
    exportedAt: string;
  };
  records: DBRecord[];
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

  static async exportToJSON() {
    const records = await DBController.getRecords();

    const backup: DosesBackup = {
      meta: {
        version: 1,
        exportedAt: new Date().toISOString(),
      },
      records,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doses-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  private static validateBackup(data: DosesBackup) {
    if (!data?.meta || data.meta.version !== 1) {
      throw new Error('Неподдерживаемая версия бэкапа');
    }

    if (!Array.isArray(data.records)) {
      throw new Error('Некорректный формат данных');
    }
  }

  static async importFromJSON(file: File) {
    const text = await file.text();
    const data = JSON.parse(text) as DosesBackup;

    DBController.validateBackup(data);

    const db = await DBController.getDb();
    const tx = db.transaction('records', 'readwrite');
    const store = tx.objectStore('records');
    const index = store.index('by-datetime');

    await Promise.all(
      data.records.map(async (incoming) => {
        const existing = await index.get(incoming.datetime);

        if (!existing) {
          const { datetime, dose, targetDose } = incoming;
          await store.add({ datetime, dose, targetDose });
        } else {
          await store.put({
            ...existing,
            ...incoming,
            id: existing.id,
          });
        }
      })
    );

    await tx.done;
  }
}
