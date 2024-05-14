import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    axios
      .get('http://localhost:4050/getUsers')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));

    // Check if the user is logged in
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]); // Update useEffect dependency to watch changes in isLoggedIn state

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4050/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
    localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
    navigate('/'); // Redirect to home route after logout
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Update login status
    localStorage.setItem('isLoggedIn', true); // Store login status in localStorage
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Moto Riders page</h2>
      <h3>Here you can see images and read bios about them.</h3>
      <Link to="/filter" className='h4'>
                  <h4 className='option filteroption'>Filter</h4>
      </Link>
      <Link to="/form" className="add_button">
        Add+
      </Link>
      {isLoggedIn ? (
        <button className="logout_button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div>
          <Link to="/login" className="login_button" onClick={handleLogin}>
            Login
          </Link>
          <Link to="/signup" className="signup_button">
            SignUp
          </Link>
        </div>
      )}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.First_Name}</td>
                <td>{user.Last_Name}</td>
                <td>{user.Age}</td>
                <td>{user.Region}</td>
                <td>{user.City}</td>
                <td>
                  <img src={user.Bike_Img} alt="" className="image" />
                </td>
                <td>
                  <Link className="update_btn" to={`/update/${user._id}`}>
                    <button>Update</button>
                  </Link>
                  <button
                    className="delete_btn"
                    onClick={(e) => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
