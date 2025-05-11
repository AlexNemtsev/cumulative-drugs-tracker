import { Route, Switch } from 'wouter';

import { Home } from '@/pages/HomePage';
import { Log } from '@/pages/Log';
import { Settings } from '@/pages/Settings';

export const Router = () => (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/log" component={Log} />
    <Route path="/settings" component={Settings} />
  </Switch>
);
