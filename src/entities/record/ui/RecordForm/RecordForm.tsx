import { Control, Field, Label, Message, Root, Submit } from '@radix-ui/react-form';
import { Button, Flex, Select, Text } from '@radix-ui/themes';

import type { RecordType } from '@/shared/types/Record';
import { DateTime } from '@/shared/ui/DateTime';

type Value = Omit<RecordType, 'id'>;

type Props = {
  onSubmit: (value: Value) => void;
  formValue?: Value;
};

export const RecordForm = (props: Props) => {
  const { onSubmit, formValue } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const datetime = formData.get('datetime') as string;
    const dose = formData.get('dose') as string;

    if (!datetime || !dose) {
      return;
    }

    onSubmit({ datetime, dose });
    form.reset();
  };

  return (
    <Root onInvalid={(e) => e.preventDefault()} onSubmit={handleSubmit}>
      <Flex direction="column" gap="3">
        <Field name="datetime">
          <Flex gap="3" align="center">
            <Label>
              <Text size="4">Время:</Text>
            </Label>
            <Control asChild>
              <DateTime value={formValue ? formValue.datetime : ''} required name="datetime" />
            </Control>
          </Flex>
          <Message match="valueMissing">
            <Text color="red">Нужно указать дату и время</Text>
          </Message>
        </Field>

        <Field name="dose">
          <Flex gap="3" align="center">
            <Label>
              <Text size="4">Дозировка, мг:</Text>
            </Label>
            <Control asChild>
              <Select.Root name="dose" defaultValue={formValue ? formValue.dose : '16'} size="3">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="8">8</Select.Item>
                  <Select.Item value="16">16</Select.Item>
                </Select.Content>
              </Select.Root>
            </Control>
          </Flex>
        </Field>

        <Submit asChild>
          <Button size="4">Сохранить</Button>
        </Submit>
      </Flex>
    </Root>
  );
};
