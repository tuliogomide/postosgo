import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Creators as ProductListCreators } from '@store/ducks/posto/list/postosList';

import Home from '../pages/Home';
import { useDispatch, useSelector } from 'react-redux';

const Main = () => {

  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState({
    distancia: 3,
    combustivel: 'etanol_comum',
    myVar: 0
  });

  const [location, setLocation] = React.useState({
    lat: 0,
    lng: 0,
    cidade:  'goiania',
  });

  const { lat, lng, cidade } = location;

  const showPosition = position => {
    setLocation({ ...location, lat: position.coords.latitude, lng: position.coords.longitude });
  }

  const showError = error => {
    switch (error.code) {

      case error.PERMISSION_DENIED:
        alert("Por Favor, habilite seu GPS e reinicie a página para continuar.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Localização indisponível.");
        break;
      case error.TIMEOUT:
        alert("A requisição expirou.");
        break;
      case error.UNKNOWN_ERROR:
        alert("Algum erro desconhecido aconteceu.");
        break;
    }
  }

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else { x.innerHTML = "O seu navegador não suporta Geolocalização."; }
  },[])

  React.useEffect(() => {
    if(lat !== 0 && lng !==0)
    dispatch(ProductListCreators.getPostoListRequest(location));
  }, [location]);

  const setFilter = () => {

    M.Toast.dismissAll();
    var toastHTML = '<span>Ordenado por menor preço de ' + document.querySelector("#menu-combustivel").querySelector(".active").text + ' no raio de ' + Number(document.getElementById('test5').value) + 'km</span>';
    clearTimeout(localState.myVar);
    setLocalState({
      ...localState,
      distancia: Number(document.getElementById('test5').value),
      combustivel: document.querySelector("#menu-combustivel").querySelector(".active").name,
      myVar: setTimeout(function () {
        M.toast({ html: toastHTML, displayLength: 4000 })

      }, 500)
    });

  }

  const { 
    postoList, 
    postoListLoading 
  } = useSelector(state => state.posto.list);

  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>

        </div>
        <div className="nav-content">
          <ul className="tabs tabs-transparent" id="menu-combustivel">
            <li className="tab"><a onClick={setFilter} name="gasolina_comum">Gasolina</a></li>
            <li className="tab"><a onClick={setFilter} name="etanol_comum" className="active">Etanol</a></li>
            <li className="tab"><a onClick={setFilter} name="diesel_comum">Diesel</a></li>
            <li className="tab"><a onClick={setFilter} name="diesel_s10_comum">Diesel S-10</a></li>

          </ul>
        </div>
      </nav>
      <br />
      <Home 
        list={postoList} 
        loading={postoListLoading} 
        location={location} 
        filter={localState}
      />

      <footer className="page-footer" style={{ bottom: 0, position: "fixed", zIndex: "99999", width: "100%", height: "70px" }}>
        <div className="container">
          <div className="row">
            <div className="col s12 s12">
              <div className="row">
                <div className="col l9 m9 s9">
                  <form action="#">
                    <p className="range-field">
                      <input type="range" id="test5" min="1" max="15" step="1" onChange={setFilter} />
                    </p>
                  </form>
                </div>
                <div className="col l3 s3" style={{ lineHeight: "2.2", fontSize: "15px" }}>
                  {localState.distancia} KM
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>



    </div>
  );
}

export default Main;

