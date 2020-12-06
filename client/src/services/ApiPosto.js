import 'babel-polyfill';

var ApiPosto = {

  ItemPosto: [],

  listAll: async function (lat, lng) {
    var dados = await fetch('http://localhost:3000/api/v1/postos/listar/' + lat + '/' + lng + '/goiania/geolocal')
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(listItem => {
        this.ItemPosto = listItem.postos;
        return this.ItemPosto;
      })
    return dados;
  },
  create: function (token, dados) {

    return fetch('http://localhost:3000/api/v1/postos/cadastrar',
      {
        method: "POST",
        headers: {

          'content-type': "application/json",
          'authorization': token


        },
        body: JSON.stringify({ dados })

      }).then(response => response.text())
      .then(data => JSON.parse(data))
      .then(data => {
        console.log(data);
      })

  }
}

export default ApiPosto;