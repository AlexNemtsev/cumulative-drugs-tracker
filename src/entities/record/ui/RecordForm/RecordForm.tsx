import { Root, Submit } from '@radix-ui/react-form';
import { Button, Flex, Select, TextField } from '@radix-ui/themes';

import { AppSettings } from '@/shared/appSettings';

import { selectContent, selectItem, selectTrigger, timePicker } from './RecordForm.css';
import { FormField } from '../../../../shared/ui/FormField';

export type FormValue = {
  time: string;
  dose: string;
};

export type RecordFormProps = {
  onSubmit: (value: FormValue) => void;
  onCancel: () => void;
  formValue: FormValue;
  className?: string;
};

export const RecordForm = (props: RecordFormProps) => {
  const { onSubmit, onCancel, formValue, className } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const time = formData.get('time') as string;
    const dose = formData.get('dose') as string;

    onSubmit({ time, dose });
    form.reset();
  };

  const handleCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCancel();
  };

  return (
    <Root
      onInvalid={(e) => e.preventDefault()}
      onSubmit={handleSubmit}
      onReset={handleCancel}
      className={className}
    >
      <Flex justify="between">
        <FormField name="datetime" label="Время:" valueMissingError="Нужно время">
          <TextField.Root
            type="time"
            value={formValue ? formValue.time : ''}
            required
            name="time"
            size="3"
            className={timePicker}
          />
        </FormField>

        <FormField name="dose" label="Дозировка, мг:">
          <Select.Root
            name="dose"
            defaultValue={formValue ? formValue.dose : AppSettings.DEFAULT_DOSE}
            size="3"
          >
            <Select.Trigger className={selectTrigger} />
            <Select.Content className={selectContent}>
              {AppSettings.DOSES.map((dose) => (
                <Select.Item value={dose} key={dose} className={selectItem}>
                  {dose}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>
      </Flex>

      <Flex justify="between" mt="5">
        <Button variant="outline" size="4" type="reset">
          Отмена
        </Button>

        <Submit asChild>
          <Button size="4">Сохранить</Button>
        </Submit>
      </Flex>
    </Root>
  );
};
