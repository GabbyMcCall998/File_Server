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
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.replace("/document");
    } catch (error) {
      console.error('Login Error:', error); // Log the error for debugging
      
      if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
        
        if (error.response.data && error.response.data.errors) {
          setError(error.response.data.errors[0].msg);
        } else if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else if (error.response.status === 400) {
          setError("Bad Request: Please check your input and try again.");
        } else if (error.response.status === 401) {
          setError("Unauthorized: Incorrect email or password.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Data:', error.request);
        setError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', error.message);
        setError("Error occurred while setting up the request. Please try again.");
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
        <Link to="/forgot-password" style={{textDecoration:'red'}}>
        forgot password
        </Link>
        
        <button type="submit" className="sign" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
