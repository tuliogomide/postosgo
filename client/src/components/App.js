import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import Main from '../pages/Main';
import Login from '../../admin/pages/Login';
import NovoPosto from '../../admin/pages/NovoPosto';




class App extends Component {
  state = {
    filter: ''
  }

<<<<<<< HEAD
  const { isAuth, error } = useSelector(state => state.auth);
=======
>>>>>>> parent of 618b2e8... refatoração do login

  render() {
    var state = this.state;

    return (
      <div>
        <Route exact path="/" render={() => <Main />} />
<<<<<<< HEAD
        <Route exact path="/admin">
          { (isAuth && !error) ? <Redirect to="/admin/criar" /> : <LoginPage /> }
        </Route>
        <Route exact path="/admin/criar">
          { (isAuth && !error) ? <NovoPosto /> : <Redirect to="/admin" /> }
        </Route>
      </Switch>
    </div>
  );
=======
        <Route exact path="/admin" render={() => <Login />} />
        <Route exact path="/admin/criar" render={() => <NovoPosto />} />
      </div>
    );

>>>>>>> parent of 618b2e8... refatoração do login

  }
}

export default App;
