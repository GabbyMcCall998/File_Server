import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            setMessage(response.data.status);
            setError('');
        } catch (error) {
            setError('Failed to send password reset link. Please try again.');
            setMessage('');
        }
    };

    return (
        <div>
            <h3>Forgot Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ForgotPassword;
