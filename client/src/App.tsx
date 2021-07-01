import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { CurveFit } from './components/CurveFit';
import { ErrorPage } from './components/ErrorPage';
import { Menu } from './components/Menu';
import { PrivateRoute } from './common-components/PrivateRoute/PrivateRoute';
import { ModelManager } from './components/ModelManager';
import { UserManager } from './components/UserManager/UserManager';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <CurveFit/>
        </PrivateRoute>
        <PrivateRoute exact path="/model-manager">
          <ModelManager/>
        </PrivateRoute>
        <PrivateRoute exact path="/user-manager">
          <UserManager/>
        </PrivateRoute>
        <Route exact path="/login">
          <Menu/>
        </Route>
        <Route path="*">
          <ErrorPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
