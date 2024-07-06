import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './LoginSignup.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        window.location.href = '/'; // Redirect to home
      } else {
        window.location.href = '/document'; // Redirect to user document page
      }
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        const { data, status } = error.response;
        if (status === 401) {
          setError("Unauthorized: Incorrect email or password.");
        } else {
          setError(data.error || "Login failed. Please try again.");
        }
      } else {
        setError("Error occurred while logging in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="yoga">
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
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
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account?
          <br />
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
        <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'red' }}>
          Forgot Password
        </Link>
        <button type="submit" className="sign" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
