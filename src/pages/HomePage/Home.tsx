import { Flex } from '@radix-ui/themes';

import { AddButton } from '@/entities/record/ui/AddButton';
import { Progress } from '@/features/progress';
import { PageTitle } from '@/shared/ui/PageTitle';

export const Home = () => (
  <Flex direction="column" gap="5">
    <PageTitle>Акнекутан</PageTitle>
    <Progress />
    <AddButton />
  </Flex>
);
