import { render, screen } from '@testing-library/react';

import { Content } from './Content';

test('Content должен отрисоваться', () => {
  render(<Content record={{ dose: '16', datetime: '2025-06-11T15:48' }} />);

  const content = screen.getByTestId('record-content');

  expect(content).toMatchSnapshot();
});
