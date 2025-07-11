import { fireEvent, render, screen } from '@testing-library/react';

import { withThemeProvider } from '@/app/providers/withThemeProvider';
import { AppSettings } from '@/shared/appSettings';
import type { RecordType } from '@/shared/types/Record';

import { RecordForm, type RecordFormProps } from './RecordForm';

const handleSubmit = vi.fn();
const handleCancel = vi.fn();

const setup = (formValue?: RecordFormProps['formValue']) => {
  const Component = withThemeProvider(RecordForm);

  return render(
    <Component formValue={formValue} onCancel={handleCancel} onSubmit={handleSubmit} />
  );
};

const datetime = '2025-06-11T15:48';
const dose = '24';

describe('Компонент RecordForm', () => {
  it('должен отрисовать форму с переданными значениями', () => {
    const { container } = setup({ dose, datetime });

    const form = container.querySelector('form');

    const datetimeInput = screen.getByLabelText<HTMLInputElement>(/время:/i);
    const doseSelector = screen.getByRole('combobox');

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });
    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });

    expect(form).toBeInTheDocument();

    expect(datetimeInput).toBeInTheDocument();
    expect(datetimeInput.value).toBe(datetime);

    expect(doseSelector).toBeInTheDocument();
    expect(doseSelector).toHaveTextContent(dose);

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('должны отобразиться значения по-умолчанию, если formValue не задан', () => {
    setup();

    const datetimeInput = screen.getByLabelText<HTMLInputElement>(/время:/i);
    const doseSelector = screen.getByRole('combobox');

    expect(datetimeInput.value).toBe('');
    expect(doseSelector).toHaveTextContent(AppSettings.DEFAULT_DOSE);
  });

  it('при нажатии на отмена форма должна сброситься', () => {
    setup({ dose, datetime });

    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });

    fireEvent.click(cancelButton);

    expect(handleCancel).toBeCalled();
  });

  it('должен вызваться onSubmit на заполненной форме при нажатии Сохранить', () => {
    setup({ dose, datetime });

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    fireEvent.click(saveButton);

    expect(handleSubmit).toBeCalledWith({ dose, datetime });
  });

  it('должна отобразиться ошибка при сабмите, если дата не заполнена', () => {
    setup({ dose } as Omit<RecordType, 'id' | 'targetDose'>);

    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    fireEvent.click(saveButton);

    expect(screen.getByText('Нужно указать дату и время')).toBeInTheDocument();
    expect(handleSubmit).not.toBeCalledWith();
  });
});
