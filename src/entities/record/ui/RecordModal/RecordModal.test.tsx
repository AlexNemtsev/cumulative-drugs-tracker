import { fireEvent, render, screen } from '@testing-library/react';

import { AppSettings } from '@/shared/appSettings';
import { toDateTimeLocal } from '@/shared/lib/toDateTimeLocal';
import type { RecordType } from '@/shared/types/Record';
import { settings } from 'tests/mocks/settings';

import { RecordModal, type RecordModalProps } from './RecordModal';

const handleCancel = vi.fn();
const handleSubmit = vi.fn();

const dayTargetDose = settings.dayTarget;

const testRecord: RecordType = {
  dose: AppSettings.DOSES[0],
  targetDose: dayTargetDose,
  datetime: '2025-06-11T15:48',
};

const setup = (props?: Pick<RecordModalProps, 'record'>) => {
  const { record } = props ?? {};

  return render(
    <RecordModal
      isOpen
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      record={record}
      dayTargetDose={dayTargetDose}
    />
  );
};

describe('RecordModal', () => {
  beforeEach(async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('должна отрисоваться', () => {
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

  it('должна заполнять форму переданными данными', async () => {
    setup({ record: testRecord });

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

  it('должна заполнять форму данными по-умолчанию, если данные не переданы', async () => {
    const defaultRecord: RecordType = {
      dose: AppSettings.DEFAULT_DOSE,
      targetDose: dayTargetDose,
      datetime: toDateTimeLocal(new Date()),
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
