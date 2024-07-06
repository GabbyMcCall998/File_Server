import './ResetPassword.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id, token } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Example: Basic password validation (adjust as per your requirements)
            if (password.length < 8) {
                throw new Error('Password length must be greater than 5 characters.');
            }

            const response = await axios.post(`http://localhost:5000/auth/reset-password/${id}/${token}`, { password });
            setMessage(response.data.status);
            setError('');
            setPassword('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container1'>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className='reset' type="submit" disabled={loading}>
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
            </form>
            {message && <p className={error ? 'success' : ''}>{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ResetPassword;
