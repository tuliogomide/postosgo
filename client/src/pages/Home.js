import React from 'react';
import Carrossel from '../components/Carrossel';


export default class Home extends React.Component {

  componentWillMount() {

  }
  render() {

    var style = {
      width: '18rem'
    }
    return (

      <div className="container">
        <Carrossel filtros={this.props.filtros} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    );
  }
}