import { render, screen } from '@testing-library/react';

import { Content } from './Content';

describe('Content', () => {
  it('отрисовывается', () => {
    render(<Content dose="16" time="15:48" />);

    const content = screen.getByTestId('record-content');

    expect(content).toMatchSnapshot();
    expect(screen.queryByRole('menuitem', { name: /изменить/i })).toBeNull();
    expect(screen.queryByRole('menuitem', { name: /удалить/i })).toBeNull();
  });
});
