import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './LoginSignup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    setError(''); // Clear any previous error messages
    setMsg(''); // Clear any previous success messages

    try {
      const response = await axios.post('http://localhost:5000/signup', { email, password });
      setMsg(response.data.message);
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors[0].msg);
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="yoga">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up Here</h3>
        {error && <p className="error">{error}</p>}
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
        {msg && <div className="success_msg">{msg}</div>}
        <p>
          Already have an account?
          <br />
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Log In
          </Link>
        </p>
        <button type="submit" className="sign" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
