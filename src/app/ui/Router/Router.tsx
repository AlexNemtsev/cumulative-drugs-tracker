import { Route, Switch } from 'wouter';

import { routes } from './routes';
import { useRedirects } from './useRedirects';

export const Router = () => {
  useRedirects();

  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.route} component={route.component} key={route.route} />
      ))}
    </Switch>
  );
};
