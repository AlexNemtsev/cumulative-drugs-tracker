import { render } from '@testing-library/react';

import { PlusIcon } from './PlusIcon';

test('Иконка PlusIcon должна отрисоваться', () => {
  const { container } = render(<PlusIcon />);

  const icon = container.querySelector('svg');

  expect(icon).toMatchSnapshot();
});
