import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

import Main from '../pages/Main';
import Login from '../../admin/pages/Login';
import NovoPosto from '../../admin/pages/NovoPosto';




class App extends Component {
    state = {
        filter: ''
    }


    render() {
        var state = this.state;

        return (
            <div>
              <Route exact path="/" render={() => <Main />} />
              <Route exact path="/admin" render={() => <Login />} /> 
              <Route exact path="/admin/criar" render={() => <NovoPosto />} />                           
            </div>
        );


    }
}

export default App;
