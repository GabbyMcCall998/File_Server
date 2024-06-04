import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './LoginSignup.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = isLogin
        ? await axios.post('http://localhost:5000/auth/login', { email, password })
        : await axios.post('http://localhost:5000/auth/signup', { email, password });

      const token = response.data.token;
      localStorage.setItem('token', token); // Store token for authenticated requests
      alert(`${isLogin ? 'Login' : 'Signup'} successful`);
    } catch (error) {
      console.error(error.response.data.errors);
      alert(`${isLogin ? 'Login' : 'Signup'} failed`);
    }
  };

  return (
    <div className="yoga">
      <form onSubmit={handleSubmit}>
        <h3>{isLogin ? 'Login' : 'Sign Up'} Here</h3>

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
          {isLogin ? (
            <>
              Don't have an account?
              <br />
              <Link to="/signup" style={{ textDecoration: 'none' }} onClick={() => setIsLogin(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account???
              <br />
              <Link to="/login" style={{ textDecoration: 'none' }} onClick={() => setIsLogin(true)}>
                Log In
              </Link>
            </>
          )}
        </p>

        <button type="submit" className="sign">
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>

        {isLogin && (
          <label htmlFor="password" className="forgot">
            Forgot Password
          </label>
        )}
      </form>
    </div>
  );
};

export default LoginSignup;
