import React from 'react';
import Carrossel from '../components/Carrossel';


const Home = ({ list, loading, location, filter }) => {

  var style = {
    width: '18rem'
  }
  return (

    <div className="container">
      <Carrossel 
        list={list} 
        location={location}
        filter={filter}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Home;