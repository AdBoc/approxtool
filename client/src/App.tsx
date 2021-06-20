import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { UserServiceMethods } from './components/UserServiceMethods';
import { Menu } from './components/Menu';
import { ErrorPage } from './components/ErrorPage';
import { ModelMethods } from './components/ModelMethods';
import { ApproximationMethods } from './components/ApproximationMethods';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Menu/>
        </Route>
        <Route exact path="/user-service">
          <UserServiceMethods/>
        </Route>
        <Route exact path="/model-service">
          <ModelMethods/>
        </Route>
        <Route exact path="/approximation-service">
          <ApproximationMethods/>
        </Route>
        <Route path="*">
          <ErrorPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
