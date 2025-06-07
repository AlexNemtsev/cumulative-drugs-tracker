import { TabNav } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';

import { link } from './NavLink.css';

type Props = {
  route: string;
  children?: ReactNode;
};

export const NavLink = (props: Props) => {
  const { route, children } = props;
  const [location] = useLocation();

  return (
    <TabNav.Link asChild active={location === route} className={link}>
      <Link href={route}>{children}</Link>
    </TabNav.Link>
  );
};
