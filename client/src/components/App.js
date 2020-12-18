import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Main from '../pages/Main';
import LoginPage from '../../admin/pages/LoginPage';
import NovoPosto from '../../admin/pages/NovoPosto';
import { useSelector } from 'react-redux';




const App = () => {

  const { isAuth } = useSelector(state => state.auth);

  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/admin">
          { isAuth ? <Redirect to="/admin/criar" /> : <LoginPage /> }
        </Route>
        <Route exact path="/admin/criar">
          { isAuth ? <NovoPosto /> : <Redirect to="/admin" /> }
        </Route>
      </Switch>
    </div>
  );

}

export default App;
