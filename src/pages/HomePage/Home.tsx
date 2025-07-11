import { Flex } from '@radix-ui/themes';

import { useRecordModal } from '@/entities/record/hooks/useRecordModal';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { AppSettings } from '@/shared/appSettings';
import { useRecords } from '@/shared/providers/RecordsProvider';
import { AddButton } from '@/shared/ui/AddButton';
import { PageTitle } from '@/shared/ui/PageTitle';

import { Progress } from './ui/Progress';

export const Home = () => {
  const { records, addRecord } = useRecords();
  const { closeRecordModal, handleRecord, isRecordModalOpened, openRecordModal } = useRecordModal({
    addRecord,
  });

  const takenDose = records.reduce<number>((acc, record) => {
    const dose = +record.dose;

    return acc + dose;
  }, 0);

  const currentDate = new Date();

  return (
    <Flex direction="column" gap="5">
      <PageTitle>Акнекутан</PageTitle>
      <Progress
        takenDose={takenDose}
        dayTargetDose={+AppSettings.DAY_TARGET}
        totalTargetDose={AppSettings.TARGET_DOSE}
        currentDate={currentDate}
      />
      <AddButton onClick={openRecordModal} />
      <RecordModal
        isOpen={isRecordModalOpened}
        onSubmit={handleRecord}
        onCancel={closeRecordModal}
      />
    </Flex>
  );
};
