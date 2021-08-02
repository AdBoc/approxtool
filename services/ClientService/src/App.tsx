import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { CurveFit } from './components/CurveFit';
import { ErrorPage } from './components/ErrorPage';
import { AuthView } from './components/AuthView';
import { ProtectedRoute } from './common-components/ProtectedRoute/ProtectedRoute';
import { ModelManager } from './components/ModelManager';
import { UserManager } from './components/UserManager/UserManager';

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
          <AuthView/>
        </Route>
        <Route path="*">
          <ErrorPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
