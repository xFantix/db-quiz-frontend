import { Route, Switch } from "react-router-dom";
import config from "../utils/config";
import Dashboard from "@view/Dashboard/Dashboard";

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path={config.routes.dashboard} component={Dashboard} />
    </Switch>
  );
};

export default PrivateRoutes;
