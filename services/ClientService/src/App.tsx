import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { CurveFit } from './components/CurveFit';
import { ErrorPage } from './components/ErrorPage';
import { Menu } from './components/Menu';
import { ProtectedRoute } from './common-components/ProtectedRoute/ProtectedRoute';
import { ModelManager } from './components/ModelManager';
import { UserManager } from './components/UserManager/UserManager';

// TODO: DECODE TOKEN console.log(atob(localStorage.getItem('token')!.split('.')[1]));

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/">
          <CurveFit/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/model-manager">
          <ModelManager/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/user-manager">
          <UserManager/>
        </ProtectedRoute>
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
