import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    First_Name: '',
    Last_Name: '',
    Age: '',
    Region: '',
    City: '',
    Bike_Img: ''
  });
  const nav=useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:4050/getUsers/${id}`)
      .then(response => {
        const { First_Name, Last_Name, Age, Region, City, Bike_Img } = response.data;
        setUserData({ First_Name, Last_Name, Age, Region, City, Bike_Img });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [id]);

 const handleSubmit = (e) => {
  e.preventDefault();
  axios.put(`http://localhost:4050/updateUser/${id}`, userData)
    .then(response => {
      console.log('User updated successfully:', response.data);
      nav("/")
    })
    .catch(error => console.error('Error updating user:', error));
};


  return (
    <div className="container">
      <h2>Update User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            required
            value={userData.First_Name}
            onChange={(e) => setUserData({ ...userData, First_Name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            required
            value={userData.Last_Name}
            onChange={(e) => setUserData({ ...userData, Last_Name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={userData.Age}
            onChange={(e) => setUserData({ ...userData, Age: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            name="region"
            required
            value={userData.Region}
            onChange={(e) => setUserData({ ...userData, Region: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={userData.City}
            onChange={(e) => setUserData({ ...userData, City: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bike-img">Bike Image Link:</label>
          <input
            type="text"
            id="bike-img"
            name="bike-img"
            required
            value={userData.Bike_Img}
            onChange={(e) => setUserData({ ...userData, Bike_Img: e.target.value })}
          />
        </div>
        
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Update;