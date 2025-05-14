import { Control, Field, Label, Message, Root, Submit } from '@radix-ui/react-form';
import { Button, Flex, Select, Text } from '@radix-ui/themes';

import type { RecordType } from '@/shared/types/Record';

type Props = {
  onSubmit: (data: RecordType) => void;
};

export const RecordForm = (props: Props) => {
  const { onSubmit } = props;

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
          <Flex gap="3">
            <Label>
              <Text size="4">Дата и время:</Text>
            </Label>
            <Control asChild>
              <input type="datetime-local" required name="datetime" />
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
              <Select.Root name="dose" defaultValue="16" size="3">
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
