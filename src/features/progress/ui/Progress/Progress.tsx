import { Flex, Text, Card, Progress as ProgressBar } from '@radix-ui/themes';

import { useRecords } from '@/shared/providers/RecordsProvider';
import { PageTitle } from '@/shared/ui/PageTitle';

import styles from './Progress.module.css';

const TARGET_DOSE = 10500;
const CURRENT_DOSE_A_DAY = 16;

const dateConfig: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const Progress = () => {
  const { records } = useRecords();

  const cumulativeDose = records.reduce<number>((acc, record) => {
    const dose = +record.dose;

    return acc + dose;
  }, 0);

  const progressBarValue = (cumulativeDose / TARGET_DOSE) * 100;

  const doseRemained = TARGET_DOSE - cumulativeDose;
  const etaDays = doseRemained / CURRENT_DOSE_A_DAY;

  const expectedDay = new Date();
  expectedDay.setDate(expectedDay.getDate() + Math.ceil(etaDays));

  return (
    <Flex direction="column" gap="5">
      <PageTitle>Акнекутан</PageTitle>
      <Card>
        <Flex direction="column" gap="4">
          <Text size="6">Суммарная доза</Text>
          <ProgressBar value={progressBarValue} className={styles.progressBar} />
          <Text size="6">
            Принято {cumulativeDose} мг из {TARGET_DOSE} мг
          </Text>
          <Text size="5">
            Ожидаемое завершение – {expectedDay.toLocaleDateString('ru-RU', dateConfig)}
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};
