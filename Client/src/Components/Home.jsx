import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4050/getUsers')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome to the Moto Riders page</h2>
      <h3>Here you can see images and read bios about them</h3>
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
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.First_Name}</td>
                <td>{user.Last_Name}</td>
                <td>{user.Age}</td>
                <td>{user.Region}</td>
                <td>{user.city}</td>
                <td>{user.Bike_Img}</td>
                <td>{user.Likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Home;
