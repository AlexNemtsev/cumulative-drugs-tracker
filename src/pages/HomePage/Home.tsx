import { Flex } from '@radix-ui/themes';

import { AddButton } from '@/entities/record/ui/AddButton';
import { Progress } from '@/features/progress';

export const Home = () => (
  <Flex direction="column" gap="5">
    <Progress />
    <AddButton />
  </Flex>
);
