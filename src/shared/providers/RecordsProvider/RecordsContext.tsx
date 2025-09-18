import { createContext } from 'react';

import type { DoseRecord } from '@/shared/types/DoseRecord';

type Records = {
  records: Required<DoseRecord>[];
  addRecord: (record: Omit<DoseRecord, 'id' | 'targetDose'>) => Promise<void>;
  updateRecord: (record: Omit<Required<DoseRecord>, 'targetDose'>) => Promise<void>;
  deleteRecord: (recordId: number) => Promise<void>;
  loadRecords: () => Promise<void>;
};

export const RecordsContext = createContext<Records | undefined>(undefined);
