import React from 'react';
import ApiUsuario from '../services/ApiUsuario';


export default class Login extends React.Component {

  login() {
    document.getElementsByClassName('progress')[0].style.visibility = "";
    var nome = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;
    ApiUsuario.login(nome, senha).then(data => {
      if (data.erro == true) {
        alert(data.mensagem)
        document.getElementById('usuario').value = '';
        document.getElementById('senha').value = '';
        document.getElementsByClassName('progress')[0].style.visibility = "hidden";
      }
      else {
        localStorage.setItem('token', data.token);
        location.href = "admin/criar";
      }
    })
  }

  render() {
    if (localStorage.getItem("token") != null) {
      location.href = "admin/criar";
    }
    else {
      return (
        <div>

          <div className="row">
            <br /><br />
            <div className="col s12 m10 l10 xl6 offset-xl3 offset-l1 offset-m1">
              <div className="card">
                <div className="progress" style={{ visibility: "hidden" }}>
                  <div className="indeterminate"></div>
                </div>
                <center>
                  <h4 className=""><b>Login</b></h4>
                </center>
                <div className="card-content">
                  <div className="row">
                    <div className="col s12 col m10 offset-m1 ">
                      <input placeholder="Usuário" id="usuario" type="text" className="validate" />
                      <input id="senha" placeholder="Senha" type="password" className="validate" />
                      <br /><br />
                      <a className="waves-effect waves-light btn blue-custom right" onClick={this.login}>Login</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

}