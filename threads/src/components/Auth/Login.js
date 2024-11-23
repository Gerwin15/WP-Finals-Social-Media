import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    // Simulating authentication process (replace with actual logic)
    setIsLoading(true);

    setTimeout(() => {
      // Simulate any email/password is valid (for now)
      if (username && password) {
        // Show success message
        setSuccessMessage('Login Successful!');
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1500); // 1.5 second delay to show success message
      } else {
        setError('Invalid username or password');
      }

      setIsLoading(false);
    }, 2000); // Simulating a 2-second authentication delay
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>Email Address</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter your email"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter your password"
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '15px',
  },
  success: {
    color: '#28a745',
    fontSize: '14px',
    marginBottom: '15px',
  },
  button: {
    backgroundColor: '#1E90FF',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
    cursor: 'not-allowed',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '14px',
    color: '#777',
  },
  link: {
    color: '#1E90FF',
    textDecoration: 'none',
  },
};

export default Login;