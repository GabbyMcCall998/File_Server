import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Example: Basic email validation (adjust as per your requirements)
            if (!email.includes('@')) {
                throw new Error('Please enter a valid email address.');
            }

            const response = await axios.post('http://localhost:5000/auth/forgot-password', { email });
            setMessage(response.data.status);
            setError('');
            setEmail('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send password reset link. Please try again.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <h3>Forgot Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className='reset' type="submit" disabled={loading}>
                    {loading ? 'Sending Link...' : 'Send Link'}
                </button>
            </form>
            {message && <p className={error ? 'success' : ''}>{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
