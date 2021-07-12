import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Routes
import Notes from "../Notes";

const RootRouter = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Redirect to="/notes" />
      </Switch>
    </Router>
  );
};

export default RootRouter;