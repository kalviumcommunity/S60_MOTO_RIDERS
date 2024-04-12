using_component
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 

import React from 'react';
import Dummydata from './Dummydata';
main

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4050/getUsers')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, [ ]);

  return (
    <div className="home-container">
      <h2>Welcome to the Moto Riders page</h2>
      <h3>Here you can see images and read bios about them</h3>
    using_component
      <div className="data">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Region</th>
              <th>City</th>
              <th>Bike Image Link</th>
              <th>Likes</th>
            </tr>
          </thead>
          <tbody>
            {users.map((User, index) => (
              <tr key={index}>
                <td>{User.First_Name}</td>
                <td>{User.Last_Name}</td>
                <td>{User.Age}</td>
                <td>{User.Region}</td>
                <td>{User.city}</td>
                <td>{User.Bike_Img}</td>
                <td>{User.Likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
     main
    </div>
  );
};

export default Home;
