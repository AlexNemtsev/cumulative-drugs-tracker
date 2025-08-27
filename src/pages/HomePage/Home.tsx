import { Flex, Text } from '@radix-ui/themes';

import { useRecordModal } from '@/entities/record/hooks/useRecordModal';
import { RecordModal } from '@/entities/record/ui/RecordModal';
import { useRecords } from '@/shared/providers/RecordsProvider';
import { useSettings } from '@/shared/providers/SettingsProvider';
import { AddButton } from '@/shared/ui/AddButton';
import { PageTitle } from '@/shared/ui/PageTitle';

import { Progress } from './ui/Progress';
import { SettingsButton } from './ui/SettingsButton';

export const Home = () => {
  const { records, addRecord } = useRecords();
  const { settings } = useSettings();
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
      <PageTitle>{settings?.name}</PageTitle>
      <Text size="5" align="center" weight="light">
        {settings?.activeIngredient}
      </Text>
      <SettingsButton />
      <Progress
        takenDose={takenDose}
        dayTargetDose={+(settings?.dayTarget ?? 0)}
        totalTargetDose={+(settings?.targetDose ?? 0)}
        currentDate={currentDate}
      />
      <AddButton onClick={openRecordModal} />
      <RecordModal
        isOpen={isRecordModalOpened}
        onSubmit={handleRecord}
        onCancel={closeRecordModal}
        dayTargetDose={settings?.dayTarget ?? '0'}
      />
    </Flex>
  );
};
