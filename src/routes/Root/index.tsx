import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { GitHub } from 'widgets';

// Routes
import Notes from '../Notes';

const RootRouter = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Notes />
        </Route>
        <Redirect to="/" />
      </Switch>
      <GitHub />
    </Router>
  );
};

export default RootRouter;
