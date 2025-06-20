import { render, screen } from '@testing-library/react';

import { PageTitle } from './PageTitle';

test('PageTitle должен отрендерить переданный текст', () => {
  const text = 'Заголовок';
  render(<PageTitle>{text}</PageTitle>);

  const heading = screen.getByText(text);

  expect(heading).toBeInTheDocument();
});
