import { Flex } from '@radix-ui/themes';

import { AddButton } from '@/entities/record/ui/AddButton';
import { Records } from '@/features/records';
import { PageTitle } from '@/shared/ui/PageTitle';

export const Log = () => (
  <Flex direction="column" gap="5">
    <PageTitle>Журнал</PageTitle>
    <Records />
    <AddButton />
  </Flex>
);
