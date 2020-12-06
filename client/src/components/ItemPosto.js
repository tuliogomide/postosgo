import React from 'react';


export default class ItemPosto extends React.Component {

  render() {

    var dados = this.props.dados;
    var lat = this.props.lat;
    var lng = this.props.lng;

    return (
      <div className="col s12 m4 l4">
        <div className="card" style={{ backgroundColor: "initial", borderRadius: "5px" }}>
          <div className="card-image" style={{ height: "30px", padding: "5px", color: "white", fontWeight: "bold", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", backgroundColor: "#81CC2B", textAlign: "center" }}>
            <p>{dados.nome_fantasia}</p>
          </div>
          <div className="card-content" style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '15px', height: '110px' }}>

            <p style={{ float: "left" }}>E: R$ {dados.etanol_comum}</p><p style={{ float: "right" }}>G: R$ {dados.gasolina_comum}</p><br />
            <p style={{ float: "left" }}>D: R$ {dados.diesel_comum}</p><p style={{ float: "right" }}>D-S10: R$ {dados.diesel_s10_comum}</p><br /><br />
            <p style={{ float: "right" }}>{dados.bairro} ({(dados.rota.distance.text)})</p>

          </div>
          <div className="card-action center-text" style={{ textAlign: "center" }}>
            <a href={"https://www.google.com/maps/dir/?api=1&origin=" + lat + "," + lng + "&destination=" + dados.lat + "," + dados.lng} target="_blank" style={{ marginRight: "0px" }}>Iniciar Rota <i className="small material-icons center" style={{ verticalAlign: "sub" }}>directions_car</i></a>
          </div>
        </div>
      </div>




    );

  }
}