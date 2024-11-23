
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState(''); // Popup message state
  const [isError, setIsError] = useState(false); // Success or error flag
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password,
      });

      // Set success message and reset form fields
      setPopupMessage('Sign up Successful!');
      setIsError(false);
      setUsername('');
      setEmail('');
      setPassword('');

      // Automatically hide the popup and redirect after 2 seconds
      setTimeout(() => {
        setPopupMessage('');
        navigate('/');
      }, 2000);
    } catch (error) {
      // Set error message
      setPopupMessage('Sign up Failed! Please check your details.');
      setIsError(true);

      // Automatically hide the popup after 3 seconds
      setTimeout(() => setPopupMessage(''), 3000);

      console.error(error.response?.data || error.message);
    }
  };

  const formStyle = {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    position: 'relative',
    marginTop: '0',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  const popupStyle = {
    position: 'absolute',
    top: '-10px', // Position above the form
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    fontWeight: 'bold',
    backgroundColor: isError ? '#f44336' : '#4caf50', // Red for error, green for success
    color: '#fff',
    textAlign: 'center',
  };

  return (
    <div>
      <form onSubmit={handleSignup} style={formStyle}>
        {popupMessage && <div style={popupStyle}>{popupMessage}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;