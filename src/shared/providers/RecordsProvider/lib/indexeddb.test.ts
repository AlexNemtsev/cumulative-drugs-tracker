import { openDB, type IDBPDatabase } from 'idb';

import type { RecordType } from '@/shared/types/Record';
import { records as recordsMock } from 'tests/mocks/records';

import { addRecord, deleteRecord, getRecords, updateRecord } from './indexeddb';

let mockDb: IDBPDatabase<unknown>;

beforeEach(async () => {
  mockDb = await openDB('doses');
});

const testRecord: Required<RecordType> = {
  datetime: '2025-06-07T09:21',
  targetDose: '16',
  dose: '16',
  id: 1,
};

test('Функция addRecord должна вызвать метод add с правильными аргументами', async () => {
  await addRecord(testRecord);

  expect(mockDb.add).toHaveBeenCalledWith('records', testRecord);
});

test('Функция getRecords должна возвращать записи из бд', async () => {
  const records = await getRecords();

  expect(mockDb.getAll).toHaveBeenCalledWith('records');
  expect(records).toEqual(recordsMock);
});

test('updateRecord вызывает метод put с правильными данными', async () => {
  await updateRecord(testRecord);

  expect(mockDb.put).toHaveBeenCalledWith('records', testRecord);
});

test('deleteRecord вызывает метод delete с правильными данными', async () => {
  await deleteRecord(1);

  expect(mockDb.delete).toHaveBeenCalledWith('records', 1);
});
