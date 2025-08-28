import { Form, Submit } from '@radix-ui/react-form';
import { Button, Flex } from '@radix-ui/themes';

import { SettingsKeys } from '@/shared/constants/settingsKeys';
import { PageTitle } from '@/shared/ui/PageTitle';

import { useForm } from './hooks/useForm';
import { InputField } from './ui/InputField';
import { InputNumber } from './ui/InputNumber';

export const Settings = () => {
  const { handleChange, handleSubmit, registerInputRef, handleInvalid, handleReset } = useForm();

  return (
    <Flex direction="column" gap="5">
      <PageTitle>Настройки</PageTitle>
      <Form
        onInvalid={handleInvalid}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onReset={handleReset}
      >
        <Flex direction="column" gap="3">
          <InputField
            label="Название"
            name={SettingsKeys.NAME}
            placeholder="Название лекарства"
            required
            ref={registerInputRef(SettingsKeys.NAME)}
          />
          <InputField
            label="Действующее вещество"
            name={SettingsKeys.ACTIVE_INGREDIENT}
            placeholder="Действующее вещество"
            required
            ref={registerInputRef(SettingsKeys.ACTIVE_INGREDIENT)}
          />
          <InputNumber
            label="Доза на кг массы тела, мг"
            name={SettingsKeys.DOSE_PER_KILO}
            required
            ref={registerInputRef(SettingsKeys.DOSE_PER_KILO)}
          />
          <InputNumber
            label="Масса тела, кг"
            name={SettingsKeys.BODY_WEIGHT}
            required
            ref={registerInputRef(SettingsKeys.BODY_WEIGHT)}
          />
          <InputNumber
            label="Целевая дозировка, мг"
            name={SettingsKeys.TARGET_DOSE}
            disabled
            ref={registerInputRef(SettingsKeys.TARGET_DOSE)}
          />
          <InputNumber
            label="Суточная дозировка, мг"
            name={SettingsKeys.DAY_TARGET}
            required
            ref={registerInputRef(SettingsKeys.DAY_TARGET)}
          />
          <Flex justify="between" mt="6">
            <Button variant="outline" size="4" type="reset">
              Отмена
            </Button>
            <Submit asChild>
              <Button size="4">Сохранить</Button>
            </Submit>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
};
