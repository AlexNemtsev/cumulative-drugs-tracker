import { createContext } from 'react';

import type { RecordType } from '../../types/Record';

type RecordsContextType = {
  records: Required<RecordType>[];
  addRecord: (record: Omit<RecordType, 'id'>) => Promise<void>;
  updateRecord: (record: Required<RecordType>) => Promise<void>;
  deleteRecord: (recordId: number) => Promise<void>;
  reload: () => Promise<void>;
};

export const RecordsContext = createContext<RecordsContextType | undefined>(undefined);
