import { createContext } from 'react';

import type { RecordType } from '../../types/Record';

type Records = {
  records: Required<RecordType>[];
  addRecord: (record: Omit<RecordType, 'id'>) => Promise<void>;
  updateRecord: (record: Required<RecordType>) => Promise<void>;
  deleteRecord: (recordId: number) => Promise<void>;
  loadRecords: () => Promise<void>;
};

export const RecordsContext = createContext<Records | undefined>(undefined);
