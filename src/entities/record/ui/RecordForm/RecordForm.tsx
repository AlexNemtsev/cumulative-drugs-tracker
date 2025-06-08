import { Root, Submit } from '@radix-ui/react-form';
import { Button, Flex, Select } from '@radix-ui/themes';

import { AppSettings } from '@/shared/appSettings';
import type { RecordType } from '@/shared/types/Record';
import { DateTime } from '@/shared/ui/DateTime';

import { FormField } from './FormField';
import { selectContent, selectItem } from './RecordForm.css';

type Value = Omit<RecordType, 'id'>;

type Props = {
  onSubmit: (value: Value) => void;
  onCancel: () => void;
  formValue?: Value;
};

export const RecordForm = (props: Props) => {
  const { onSubmit, onCancel, formValue } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const datetime = formData.get('datetime') as string;
    const dose = formData.get('dose') as string;

    if (!datetime || !dose) {
      return;
    }

    onSubmit({ datetime, dose, targetDose: AppSettings.DAY_TARGET });
    form.reset();
  };

  return (
    <Root onInvalid={(e) => e.preventDefault()} onSubmit={handleSubmit}>
      <Flex direction="column" gap="3">
        <FormField name="datetime" label="Время:" valueMissingError="Нужно указать дату и время">
          <DateTime value={formValue ? formValue.datetime : ''} required name="datetime" />
        </FormField>

        <FormField name="dose" label="Дозировка, мг:">
          <Select.Root
            name="dose"
            defaultValue={formValue ? formValue.dose : AppSettings.DEFAULT_DOSE}
            size="3"
          >
            <Select.Trigger />
            <Select.Content className={selectContent}>
              {AppSettings.DOSES.map((dose) => (
                <Select.Item value={dose} key={dose} className={selectItem}>
                  {dose}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </FormField>

        <Flex justify="between">
          <Submit asChild>
            <Button size="4">Сохранить</Button>
          </Submit>
          <Button variant="outline" size="4" onClick={onCancel}>
            Отмена
          </Button>
        </Flex>
      </Flex>
    </Root>
  );
};
