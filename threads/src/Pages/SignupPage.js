import React from 'react';
import Signup from '../components/Auth/Signup';

const SignupPage = () => {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height of the viewport
    backgroundColor: '#f5f5f5', // Light gray background
    margin: 10,
    flexDirection: 'column', // Align heading and form vertically
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem', // Reduced margin to bring the title closer to the form
    color: '#333', // Dark gray for the text
  };

  return (
    <div style={pageStyle}>
      <h2 style={headingStyle}>Sign Up</h2>
      <Signup />
    </div>
  );
};

export default SignupPage;
