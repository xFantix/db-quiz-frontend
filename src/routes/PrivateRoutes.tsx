import { Route, Switch } from 'react-router-dom';
import config from '../utils/config';
import Dashboard from '@view/Dashboard/Dashboard';
import Group from '@view/Group/Group';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path={config.routes.dashboard} component={Dashboard} />
      <Route exact path={config.routes.group} component={Group} />
    </Switch>
  );
};

export default PrivateRoutes;
