import React from 'react';
import 'babel-polyfill';
<<<<<<< HEAD
import ApiPosto from '@services/ApiPosto';

=======
import ApiPosto from '../../src/services/ApiPosto';
>>>>>>> parent of 618b2e8... refatoração do login



export default class NovoPosto extends React.Component {

  finish() {
    document.getElementsByClassName('progress')[0].style.visibility = "hidden";
  }

  handleFile() {
    document.getElementsByClassName('progress')[0].style.visibility = "";
    var files = document.querySelector('#myFile').files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(files);
    reader.onload = function () {
      var data = new Uint8Array(reader.result);
      var workbook = XLSX.read(data, { type: 'array' });
      /* DO SOMETHING WITH workbook HERE */
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var list = XLSX.utils.sheet_to_json(worksheet, []);

      list.forEach(async (lista, index) => {
        var dados = {
          "razao_social": String(lista["Razão Social"]),
          "bairro": String(lista["Bairro"]),
          "nome_fantasia": String(lista["Nome Fantasia"]).replace("undefined", lista["Razão Social"]),
          "municipio": String(lista["Município"]),
          "diesel_comum": Number(lista["DIESEL COMUM"].replace(",", ".")).replace("undefined", 0),
          "diesel_s10_comum": Number(lista["DIESEL S10 COMUM"].replace(",", ".")).replace("undefined", 0),
          "etanol_comum": Number(lista["ETANOL COMUM"].replace(",", ".")).replace("undefined", 0),
          "gasolina_comum": Number(lista["GASOLINA COMUM"].replace(",", ".")).replace("undefined", 0)


        }
        await ApiPosto.create(localStorage.getItem("token"), dados);
        document.querySelector('#carregando').innerHTML = "Carregando " + (index + 1) + " de " + list.length;
      });
      NovoPosto.finish;
    }
  }
<<<<<<< HEAD

  return (
    <div>
=======
>>>>>>> parent of 618b2e8... refatoração do login

  render() {

    if (localStorage.getItem("token") == null) {
      location.href = "/admin";
    }
    else {
      return (
        <div>

          <nav className="nav-extended">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Logo</a>
            </div>
            <div className="nav-content">
            </div>
          </nav>
          <br />
          <div className="row">
            <br /><br />
            <div className="col s12 m10 l10 xl6 offset-xl3 offset-l1 offset-m1">
              <div className="card">
                <div className="progress" style={{ visibility: "hidden" }}>
                  <div className="indeterminate"></div>
                </div>
                <center>
                  <h4 className=""><b>Novo Posto</b></h4>
                </center>
                <div className="card-content">
                  <div className="row">
                    <div className="col s12 col m10 offset-m1 ">
                      <form>
                        <div className="file-field input-field">
                          <div className="btn">
                            <span>File</span>
                            <input id="myFile" type="file" />
                          </div>
                          <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                          </div>
                        </div>
                        <br />
                        <p id="carregando" className="left" style={{ marginTop: "10px" }}></p>
                        <a className="waves-effect waves-light btn blue-custom right" onClick={this.handleFile}>Subir Lista</a>
                      </form>
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