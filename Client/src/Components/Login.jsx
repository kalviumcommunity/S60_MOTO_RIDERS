import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4050/login', { email, password })
      .then((res) => {
        console.log(res);
        if (res.data.shouldLogin) {
          // Assuming you are setting a token cookie and storing user id in localStorage
          // document.cookie = `token=${res.data.token}; expires=Thu, 30 May 2999 12:00:00 UTC`;
          localStorage.setItem('id', res.data.id);
          alert(res.data.message);
          setIsLoggedIn(res.data.shouldLogin);
          navigate('/');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        alert(err.response.data.message);
      });
  };

  const handleLogout = () => {
    // Assuming you want to remove the token cookie and clear localStorage on logout
    // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('id');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className="container">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            {isLoggedIn ? ( // Render logout button if logged in
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              // Render login button if not logged in
              <button type="submit">Login</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
