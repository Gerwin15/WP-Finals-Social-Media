import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>Threads</Link>
        </div>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/login" style={styles.navLink}>Login</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/signup" style={styles.navLink}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#121212',
    padding: '15px 30px',
    position: 'sticky',
    top: 0,
    width: '100%',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700',
  },
  logoLink: {
    color: '#000000',
    textDecoration: 'none',
    fontSize: '20px',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 20px',
  },
  navLink: {
    color: '#000000',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  // Hover effect added directly in the styles
  navLinkHover: {
    backgroundColor: '#1E90FF',
    color: '#ffffff',
  },
};

export default Navbar;
