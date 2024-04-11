import React from 'react';
import Dummydata from './Dummydata';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Welcome to the Moto Riders page</h2>
      <h3>Here you can see images and read bios about them</h3>
     {
        Dummydata.map( Dummydata =>  {
            return(
                <div className='box' key={Dummydata.id}><br />
                   <strong> {Dummydata.First_Name}</strong><br />
                  <strong>{Dummydata.Age}</strong><br />
                   {Dummydata.Bike_Img}

                </div>
            )
        })
     }
    </div>
  );
};

export default Home;