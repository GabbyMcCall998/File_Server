import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './LoginSignup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Signup successful');
    } catch (error) {
      console.error(error.response.data.errors);
      alert('Signup failed');
    }
  };

  return (
    <div className="yoga">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up Here</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>
          Already have an account?
          <br />
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Log In
          </Link>
        </p>
        <button type="submit" className="sign">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
