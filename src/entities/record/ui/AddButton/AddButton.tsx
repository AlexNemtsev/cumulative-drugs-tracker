import { Root, Control, Field, Label, Message, Submit } from '@radix-ui/react-form';
import { Button, Dialog, Flex, Select, Text, AlertDialog } from '@radix-ui/themes';
import { useState } from 'react';

import { PlusIcon } from '@/shared/assets/icons/PlusIcon';
import { addRecord } from '@/shared/lib/indexeddb';

export const AddButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const datetime = formData.get('datetime') as string;
    const dose = formData.get('dose') as string;

    if (!datetime || !dose) {
      return;
    }

    try {
      await addRecord({ datetime, dose });
      setIsModalOpen(false);
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ошибка при сохранении записи');
      }

      setAlertOpen(true);
    }
  };

  return (
    <>
      <Button size="4" onClick={() => setIsModalOpen(true)}>
        <PlusIcon />
      </Button>
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Content
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <Dialog.Title>Создать запись</Dialog.Title>
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
        </Dialog.Content>
      </Dialog.Root>

      <AlertDialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialog.Content>
          <AlertDialog.Title>Ошибка</AlertDialog.Title>
          <AlertDialog.Description>
            {errorMessage || 'Произошла неизвестная ошибка'}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Action>
              <Button size="4" onClick={() => setAlertOpen(false)}>
                Закрыть
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
