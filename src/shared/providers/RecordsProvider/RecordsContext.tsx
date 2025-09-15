import { createContext } from 'react';

import type { DoseRecord } from '@/shared/types/DoseRecord';

type Records = {
  records: Required<DoseRecord>[];
  addRecord: (record: Omit<DoseRecord, 'id'>) => Promise<void>;
  updateRecord: (record: Required<DoseRecord>) => Promise<void>;
  deleteRecord: (recordId: number) => Promise<void>;
  loadRecords: () => Promise<void>;
};

export const RecordsContext = createContext<Records | undefined>(undefined);
