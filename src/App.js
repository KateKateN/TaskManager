import React from 'react';
import './App.module.scss';
import Tasks from './components/Tasks/Tasks';
import LogIn from './components/Forms/LogIn/LogIn';
import SignIn from './components/Forms/SignIn/SignIn';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './PrivateRoute';
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={LogIn} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute path="/tasks" component={Tasks} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}


export default App;
