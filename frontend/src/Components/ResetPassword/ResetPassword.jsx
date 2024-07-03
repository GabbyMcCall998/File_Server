import './ResetPassword.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { id, token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/auth/reset-password/${id}/${token}`, { password });
            setMessage(response.data.status);
            setError('');
        } catch (error) {
            setError('Failed to reset password. Please try again.');
            setMessage('');
        }
    };

    return (
        <div>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default ResetPassword;
