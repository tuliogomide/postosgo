var ApiUsuario = {
  get url() {
    return 'http://localhost:3000/api/v1/usuario/login';
  },
  login: function (nome, senha) {
    return fetch(`${this.url}`,
      {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: "nome=" + encodeURIComponent(nome) + "&senha=" + encodeURIComponent(senha)

      })
      .then(response => response.text())
      .then(data => JSON.parse(data))
      .then(data => {
        return data;
      })
  }
}
export default ApiUsuario;