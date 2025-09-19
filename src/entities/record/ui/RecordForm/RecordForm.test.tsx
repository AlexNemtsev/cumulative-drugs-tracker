import { fireEvent, render, screen } from '@testing-library/react';

import { withThemeProvider } from '@/app/providers/withThemeProvider';
import { AppSettings } from '@/shared/appSettings';

import { RecordForm, type FormValue } from './RecordForm';

const handleSubmit = vi.fn();
const handleCancel = vi.fn();

const setup = (formValue: FormValue) => {
  const Component = withThemeProvider(RecordForm);

  return render(
    <Component formValue={formValue} onCancel={handleCancel} onSubmit={handleSubmit} />
  );
};

const time = '15:48';
const dose = AppSettings.DOSES[0];

describe('Компонент RecordForm', () => {
  it('должен отрисовать форму с переданными значениями', () => {
    const { container } = setup({ dose, time });

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
    expect(datetimeInput.value).toBe(time);

    expect(doseSelector).toBeInTheDocument();
    expect(doseSelector).toHaveTextContent(dose);

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('при нажатии на отмена форма должна сброситься', () => {
    setup({ dose, time });

    const cancelButton = screen.getByRole('button', {
      name: /отмена/i,
    });

    fireEvent.click(cancelButton);

    expect(handleCancel).toBeCalled();
  });

  it('вызывается onSubmit с заполненными данными при нажатии Сохранить', () => {
    setup({ dose, time });

    const timeInput = screen.getByLabelText<HTMLInputElement>(/время:/i);
    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    fireEvent.change(timeInput, { target: { value: '16:48' } });

    fireEvent.click(saveButton);

    expect(handleSubmit).toBeCalledWith({ dose, time: '16:48' });
  });

  it('должна отобразиться ошибка при сабмите, если время не заполнено', () => {
    setup({ dose, time });

    const timeInput = screen.getByLabelText<HTMLInputElement>(/время:/i);
    const saveButton = screen.getByRole('button', {
      name: /сохранить/i,
    });

    fireEvent.change(timeInput, { target: { value: '' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('Нужно указать время')).toBeInTheDocument();
    expect(handleSubmit).not.toBeCalledWith();
  });
});
