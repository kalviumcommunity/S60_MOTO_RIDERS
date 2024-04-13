import './Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Form() {
  const [First_Name, setFirst_Name] = useState('');
  const [Last_Name, setLast_Name] = useState('');
  const [Age, setAge] = useState('');
  const [Region, setRegion] = useState('');
  const [City, setCity] = useState('');
  const [Bike_Img, setBike_Img] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4050/form', {
        First_Name,
        Last_Name,
        Age,
        Region,
        City,
        Bike_Img,
      });
      console.log('Form submitted successfully!', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            required
            value={First_Name}
            onChange={(e) => setFirst_Name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            required
            value={Last_Name}
            onChange={(e) => setLast_Name(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            required
            value={Age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            name="region"
            required
            value={Region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={City}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bike-img">Bike Image Link:</label>
          <input
            type="text"
            id="bike-img"
            name="bike-img"
            required
            value={Bike_Img}
            onChange={(e) => setBike_Img(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
