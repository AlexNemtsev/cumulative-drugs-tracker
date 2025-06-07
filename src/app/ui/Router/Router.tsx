import { Route, Switch } from 'wouter';

import { routes } from '../../routes';

export const Router = () => (
  <Switch>
    {routes.map((route) => (
      <Route path={route.route} component={route.component} key={route.route} />
    ))}
  </Switch>
);
