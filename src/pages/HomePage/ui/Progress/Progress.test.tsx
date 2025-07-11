import { render, screen } from '@testing-library/react';

import { Progress } from './Progress';

const fixedData = {
  dayTargetDose: 20,
  totalTargetDose: 100,
  currentDate: new Date('2025-07-11'),
};

test.each([
  { ...fixedData, takenDose: 0 },
  { ...fixedData, takenDose: 40 },
  { ...fixedData, takenDose: 100 },
])(
  'Компонент Progress должен отрисоваться с принятой дозировкой $takenDose',
  ({ currentDate, dayTargetDose, takenDose, totalTargetDose }) => {
    render(
      <Progress
        currentDate={currentDate}
        dayTargetDose={dayTargetDose}
        takenDose={takenDose}
        totalTargetDose={totalTargetDose}
      />
    );

    const progressContainer = screen.getByTestId('progress');

    expect(progressContainer).toMatchSnapshot();
  }
);
