import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4050/signUp', { name, email, password })
            .then((data) => {
                console.log(data);
                navigate('/login');
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div>
            <div className="container">
                <h2>SignUp Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
