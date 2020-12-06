import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import Home from '../pages/Home';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      distancia: 3,
      combustivel: 'etanol_comum',
      myVar: 0
    }
  }

  setFilter() {
    M.Toast.dismissAll();
    this.setState({
      distancia: Number(document.getElementById('test5').value),
      combustivel: document.querySelector("#menu-combustivel").querySelector(".active").name,

    });
    var toastHTML = '<span>Ordenado por menor preço de ' + document.querySelector("#menu-combustivel").querySelector(".active").text + ' no raio de ' + Number(document.getElementById('test5').value) + 'km</span>';
    clearTimeout(this.state.myVar);
    this.setState({
      myVar: setTimeout(function () {
        M.toast({ html: toastHTML, displayLength: 4000 })

      }, 500)
    });

  }

  render() {


    return (
      <div>
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Logo</a>

          </div>
          <div className="nav-content">
            <ul className="tabs tabs-transparent" id="menu-combustivel">
              <li className="tab"><a onClick={this.setFilter.bind(this)} name="gasolina_comum">Gasolina</a></li>
              <li className="tab"><a onClick={this.setFilter.bind(this)} name="etanol_comum" className="active">Etanol</a></li>
              <li className="tab"><a onClick={this.setFilter.bind(this)} name="diesel_comum">Diesel</a></li>
              <li className="tab"><a onClick={this.setFilter.bind(this)} name="diesel_s10_comum">Diesel S-10</a></li>

            </ul>
          </div>
        </nav>
        <br />
        <Home filtros={this.state} />

        <footer className="page-footer" style={{ bottom: 0, position: "fixed", zIndex: "99999", width: "100%", height: "70px" }}>
          <div className="container">
            <div className="row">
              <div className="col s12 s12">
                <div className="row">
                  <div className="col l9 m9 s9">
                    <form action="#">
                      <p className="range-field">
                        <input type="range" id="test5" min="1" max="7" step="1" onChange={this.setFilter.bind(this)} />
                      </p>
                    </form>
                  </div>
                  <div className="col l3 s3" style={{ lineHeight: "2.2", fontSize: "15px" }}>
                    {this.state.distancia} KM
                </div>
                </div>
              </div>
            </div>
          </div>
        </footer>



      </div>
    );


  }
}

