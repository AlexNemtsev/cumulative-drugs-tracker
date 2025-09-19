import { render, screen } from '@testing-library/react';

import { withProviders } from '@/app/providers';

import { Records } from './Records';

const RecordsWithProviders = withProviders(Records);

const dayRecords = [
  {
    time: '09:47',
    date: new Date('2025-06-07'),
    dose: '16',
    id: 2,
    targetDose: '16',
  },
  {
    time: '09:21',
    date: new Date('2025-06-07'),
    dose: '16',
    id: 1,
    targetDose: '16',
  },
];

describe('Компонент Records', () => {
  it('отрисовывает заглушку, если нет записей', async () => {
    render(<RecordsWithProviders dayRecords={[]} />);

    const stub = await screen.findByText(/записей нет/i);

    expect(stub).toBeInTheDocument();
  });

  it('отрисовывает список с записями', async () => {
    render(<RecordsWithProviders dayRecords={dayRecords} />);

    const elements = await screen.findAllByText(/мг/);

    expect(elements).toHaveLength(dayRecords.length);
    expect(elements[0]).toHaveTextContent(dayRecords[0].dose);
  });
});
