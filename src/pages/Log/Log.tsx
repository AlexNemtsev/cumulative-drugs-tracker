import { Flex } from '@radix-ui/themes';

import { Records } from '@/features/records';
import { PageTitle } from '@/shared/ui/PageTitle';

export const Log = () => (
  <Flex direction="column" gap="5">
    <PageTitle>Журнал</PageTitle>
    <Records />
  </Flex>
);
