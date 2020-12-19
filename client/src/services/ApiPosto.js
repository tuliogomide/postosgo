import 'babel-polyfill';

var ApiPosto = {

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
        return data;
      })

  }
}

export default ApiPosto;