import React from 'react';

import ItemPosto from './ItemPosto';
import ApiPosto from '../services/ApiPosto';


export default class Carrossel extends React.Component {



  state = {
    postoList: [],
    lat: 0,
    lng: 0
  }

  showPosition(position) {
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
    if (!ApiPosto.ItemPosto.length) {
      ApiPosto.listAll(this.state.lat, this.state.lng).then(postoList => {
        this.setState({ postoList });
      })
    } else {
      this.setState({ postoList: ApiPosto.ItemPosto });
    }
  }

  showError(error) {
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

  componentWillMount() {


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError.bind(this));
    }
    else { x.innerHTML = "O seu navegador não suporta Geolocalização."; }

  }


  render() {
    var state = this.state;
    var props = this.props;
    return (
      <div className="row">
        {
          state.postoList.filter(postoList => postoList.rota.distance.value <= Number(props.filtros.distancia) * 1000)
            .sort(function (a, b) { return b[props.filtros.combustivel] - a[props.filtros.combustivel] })
            .sort(function (a, b) { if (b[props.filtros.combustivel] > 0 && a[props.filtros.combustivel] > 0) { return a[props.filtros.combustivel] - b[props.filtros.combustivel] } else { return 0 } })
            .map(postoList => <ItemPosto key={postoList._id} dados={postoList} lat={state.lat} lng={state.lng} />)


        }
      </div>

    );

  }
}
