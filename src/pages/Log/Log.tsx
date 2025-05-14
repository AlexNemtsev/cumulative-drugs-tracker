import { Flex, Heading } from '@radix-ui/themes';

import { AddButton } from '@/entities/record/ui/AddButton';
import { Records } from '@/features/records';

export const Log = () => (
  <Flex direction="column" gap="5">
    <Heading align="center">Журнал</Heading>
    <Records />
    <AddButton />
  </Flex>
);
