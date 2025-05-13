import { Flex, Heading } from '@radix-ui/themes';

import { AddButton } from '@/entities/record/ui/AddButton';

export const Log = () => (
  <Flex direction="column" gap="5">
    <Heading align="center">Журнал</Heading>
    <AddButton />
  </Flex>
);
