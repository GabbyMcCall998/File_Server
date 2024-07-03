import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './SendFileViaEmail.css';

const SendFileViaEmail = () => {
  const { fileId } = useParams();  // Access file ID from URL parameter
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const sendFileViaEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/sendfile', {
        email,
        id: fileId
      });
      setMessage(response.data.message);

      //Reset the email input field
      setEmail("")


      //Delay navigation to show the succes message 
      setTimeout(()=>{

        navigate('/Document')

      },3000)
    } catch (error) {
      console.error('Error sending file via email:', error.response || error.message);
      setMessage('Failed to send file via email');
    }
  };

  return (
    <div className="send-file-container">
      <h3>Send File via Email</h3>
      <input
        className="email-input"
        type="email"
        placeholder="Enter recipient email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="send-button" onClick={sendFileViaEmail}>Send</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SendFileViaEmail;
