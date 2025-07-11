import { Flex, Text, Card, Progress as ProgressBar } from '@radix-ui/themes';

import { card, progressBar } from './Progress.css';

type Props = {
  takenDose: number;
  totalTargetDose: number;
  dayTargetDose: number;
  currentDate: Date;
};

const dateConfig: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

export const Progress = (props: Props) => {
  const { dayTargetDose, takenDose, totalTargetDose, currentDate } = props;

  const progressBarValue = (takenDose / totalTargetDose) * 100;

  const doseRemained = totalTargetDose - takenDose;
  const etaDays = doseRemained / dayTargetDose;

  currentDate.setDate(currentDate.getDate() + Math.ceil(etaDays));

  return (
    <Card className={card} data-testid="progress">
      <Flex direction="column" gap="4">
        <Text size="6">Суммарная доза</Text>
        <ProgressBar value={progressBarValue} className={progressBar} />
        <Text size="6">
          Принято {takenDose} мг из {totalTargetDose} мг
        </Text>
        {progressBarValue < 100 ? (
          <Text size="5">
            Ожидаемое завершение – {currentDate.toLocaleDateString('ru-RU', dateConfig)}
          </Text>
        ) : (
          <Text>Приём лекарства завершён</Text>
        )}
      </Flex>
    </Card>
  );
};
