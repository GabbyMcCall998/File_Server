import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const VerifyEmailPage = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [verified, setVerified] = useState(false); // State to track if already verified

    const { id, Vtoken } = useParams();

    useEffect(() => {
        if (verified) return; // Skip if already verified

        const verifyEmail = async () => {
            console.log('Extracted id:', id);
            console.log('Extracted Vtoken:', Vtoken);

            try {
                const response = await axios.get(`http://localhost:5000/verify-email/${id}/verify/${Vtoken}`);
                if (response.data.message) {
                    setMessage(response.data.message);
                    setVerified(true); // Mark as verified to prevent further requests
                } else {
                    setError('Failed to verify email. Please try again.');
                }
            } catch (error) {
                console.error('Error during email verification:', error);
                setError('Failed to verify email. Please try again.');
            }
        };

        verifyEmail();
    }, [id, Vtoken, verified]); // Include verified in dependency array

    return (
        <div>
            <p>Verification process:</p>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            {message && (
                <p>
                    You can now <Link to="/login">login</Link>.
                </p>
            )}
        </div>
    );
};

export default VerifyEmailPage;
