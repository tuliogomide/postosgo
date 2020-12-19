import React from 'react';
import 'babel-polyfill';
import ApiPosto from '@services/ApiPosto';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as PostoInsertCreators } from '@store/ducks/posto/insert/postoInsert';



const NovoPosto = () => {


  const { error } = useSelector(state => state.auth);

  const { count, total, postoInsertLoading } = useSelector(state => state.posto.insert);

  const dispatch = useDispatch();

  React.useEffect(()=>{
    if(count === 0)
      document.querySelector('#carregando').innerHTML = "";
    else
    document.querySelector('#carregando').innerHTML = "Carregando " + count + " de " + total;
  },[count]);

  React.useEffect(()=>{
    if(postoInsertLoading){
      document.getElementsByClassName('progress')[0].style.visibility = "";
      document.getElementById('button-submit').classList.add("disabled");
    }
    else{
      document.getElementsByClassName('progress')[0].style.visibility = "hidden";
      document.getElementById('button-submit').classList.remove("disabled");
    }
  },[postoInsertLoading]);

  const handleFile = () => {
    let files = document.querySelector('#myFile').files[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(files);
    reader.onload = function () {
      let data = new Uint8Array(reader.result);
      let workbook = XLSX.read(data, { type: 'array' });
      /* DO SOMETHING WITH workbook HERE */
      let first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      let worksheet = workbook.Sheets[first_sheet_name];
      let list = XLSX.utils.sheet_to_json(worksheet, []);

      document.querySelector('#carregando').innerHTML = "Preparando dados...";
      let listaPostos = Array();

      list.forEach(lista => {
        let dados = {
          "razao_social": String(lista["Razão Social"]),
          "bairro": String(lista["Bairro"]),
          "nome_fantasia": String(lista["Nome Fantasia"]).replace("undefined", lista["Razão Social"]),
          "municipio": String(lista["Município"]),
          "diesel_comum": Number(String(lista["DIESEL COMUM"]).replace(",", ".").replace("undefined", 0)),
          "diesel_s10_comum": Number(String(lista["DIESEL S10 COMUM"]).replace(",", ".").replace("undefined", 0)),
          "etanol_comum": Number(String(lista["ETANOL COMUM"]).replace(",", ".").replace("undefined", 0)),
          "gasolina_comum": Number(String(lista["GASOLINA COMUM"]).replace(",", ".").replace("undefined", 0))
        }

        listaPostos.push(dados);

      });

      document.querySelector('#carregando').innerHTML = "Preparação Concluída.";
      
      dispatch(PostoInsertCreators.getPostoInsertRequest(listaPostos));
    }
  }

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
                    <a id="button-submit" className="waves-effect waves-light btn blue-custom right" onClick={handleFile}>Subir Lista</a>
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

export default NovoPosto;