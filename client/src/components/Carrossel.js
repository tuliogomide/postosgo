import React from 'react';

import ItemPosto from './ItemPosto';
import ApiPosto from '../services/ApiPosto';


const Carrossel = ({ list, location, filter }) => {

  return (
    <div className="row">
      {
        list.filter(postoItem => postoItem.rota.distance.value <= Number(filter.distancia) * 1000)
          .sort(function (a, b) { return b[filter.combustivel] - a[filter.combustivel] })
          .sort(function (a, b) { if (b[filter.combustivel] > 0 && a[filter.combustivel] > 0) { return a[filter.combustivel] - b[filter.combustivel] } else { return 0 } })
          .map(postoItem => <ItemPosto key={postoItem._id} dados={postoItem} lat={location.lat} lng={location.lng} />)
      }
    </div>
  );
}

export default Carrossel;
