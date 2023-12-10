import { Route, Switch } from 'react-router-dom';
import config from '../utils/config';
import Dashboard from '@view/Dashboard/Dashboard';
import Group from '@view/Group/Group';
import { useAppSelector } from '../store/hooks';
import Configuration from '@view/Configuration/Configuration';

const PrivateRoutes = () => {
  const isAdmin = useAppSelector((state) => state.user.userInformation.isAdmin);

  return (
    <Switch>
      <Route exact path={config.routes.dashboard} component={Dashboard} />
      <Route exact path={config.routes.group} component={Group} />
      <Route exact path={config.routes.group} component={Group} />
      {isAdmin && (
        <>
          <Route
            exact
            path={config.routes.configuration}
            component={Configuration}
          />
        </>
      )}
    </Switch>
  );
};

export default PrivateRoutes;
