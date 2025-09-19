import { fireEvent, render, screen } from '@testing-library/react';

import { AppSettings } from '@/shared/appSettings';

import { RecordModal } from './RecordModal';
import type { FormValue } from '../RecordForm';
import { getCurrentTime } from './getCurrentTime';

const handleCancel = vi.fn();
const handleSubmit = vi.fn();

const testRecord: FormValue = {
  dose: AppSettings.DOSES[0],
  time: '15:48',
};

const setup = (record?: FormValue) =>
  render(<RecordModal isOpen onCancel={handleCancel} onSubmit={handleSubmit} record={record} />);

describe('RecordModal', () => {
  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('отрисовывается', () => {
    setup();

    const modal = screen.getByRole('dialog', {
      name: /создать запись/i,
    });
    const description = screen.getByText(/создать запись о приёме лекарства/i);
    const datetime = screen.getByLabelText(/время:/i);
    const doseSelector = screen.getByRole('combobox');
    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });
    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });

    expect(modal).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(datetime).toBeInTheDocument();
    expect(doseSelector).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('заполняет форму переданными данными', async () => {
    setup(testRecord);

    const modal = screen.getByRole('dialog', {
      name: /изменить запись/i,
    });
    const description = screen.getByText(/изменить запись о приёме лекарства/i);

    expect(modal).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    fireEvent.click(saveButton);

    expect(handleSubmit).toHaveBeenCalledWith(testRecord);
  });

  it('заполняет форму данными по-умолчанию, если данные не переданы', async () => {
    const defaultRecord: FormValue = {
      dose: AppSettings.DEFAULT_DOSE,
      time: getCurrentTime(),
    };

    setup();

    const modal = screen.getByRole('dialog', {
      name: /создать запись/i,
    });
    const description = screen.getByText(/создать запись о приёме лекарства/i);

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    expect(modal).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    fireEvent.click(saveButton);

    expect(handleSubmit).toHaveBeenCalledWith(defaultRecord);
  });

  it('при отмене модальное окно должно закрыться без побочных эффектов', () => {
    setup();

    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });
    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
