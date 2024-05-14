import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Filter.css';
const Filter = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:4050/getUsers")
      .then((res) => {
        setData(res.data);
        // console.log(res.data)
        setFilteredData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleClick = (city) => {
    axios
      .get(`http://localhost:4050/userdata/${city}`)
      .then((res) => {
        setSelectedUserData(res.data);
        
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Function to handle filter input change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    // Filter data based on the input value
    const filtered = data.filter(user => user.City.toLowerCase().includes(value.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <div className="body">
      <div className="authors-box-main">
        <div className="authors-box">
          <input
            type="text"
            placeholder="Filter by City"
            value={filter}
            onChange={handleFilterChange}
          />
          <div className="authors-box1">
            {error ? (
              <p>Error : {error}</p>
            ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div key={index}>
                  <div className="author">
                    <h3 className="author-name">
                      <Link onClick={() => handleClick(item.City)} to="#">
                        Rider City: <i>{item.City}</i>
                      </Link>
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <center>
                <p>No Riders found</p>
              </center>
            )}
          </div>
        </div>
        <div className="user-about">
          {selectedUserData && (
            <div className="selected-user-data">
              <p>Name: {selectedUserData.First_Name} {selectedUserData.Last_Name}</p>
              <p>Age: {selectedUserData.Age}</p>
              <p>Region: {selectedUserData.Region}</p>
              <p>City: {selectedUserData.City}</p>
              <p>Bike Image Link: <img src={selectedUserData.Bike_Img} alt="" className="image" /></p>
              <Link to="/">
                <button>Go back</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
