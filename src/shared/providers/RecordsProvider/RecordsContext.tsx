import { createContext } from 'react';

import type { RecordType } from '../../types/Record';

type RecordsContextType = {
  records: RecordType[];
  addRecord: (record: Omit<RecordType, 'id'>) => Promise<void>;
  reload: () => Promise<void>;
};

export const RecordsContext = createContext<RecordsContextType | undefined>(undefined);
