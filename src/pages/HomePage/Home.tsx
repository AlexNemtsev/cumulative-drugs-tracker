import { Flex } from '@radix-ui/themes';

import { Progress } from '@/features/progress';
import { PageTitle } from '@/shared/ui/PageTitle';

export const Home = () => (
  <Flex direction="column" gap="5">
    <PageTitle>Акнекутан</PageTitle>
    <Progress />
  </Flex>
);
