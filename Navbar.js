import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            {/* Using an image for the logo */}
            <img 
              src="/threadslogo.png"  // Ensure the image is placed inside the 'public' folder
              alt="Logo"
              style={styles.logoImage}  // Style for the logo
            />
          </Link>
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
    textDecoration: 'none',
  },
  logoImage: {
    width: '100px', // Adjust based on your image size
    height: 'auto',
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
    color: '#F6F6F6',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 20px',  // Increase padding to make the box bigger
    borderRadius: '8px',    // Round the corners slightly
    transition: 'background-color 0.3s, color 0.3s',
  },
  // Updated hover effect
  navLinkHover: {
    backgroundColor: '#ffffff', // White background on hover
    color: '#121212',  // Dark text color for better contrast
  },
};

// Adding hover styles via inline
const navLinkHoverStyle = {
  ':hover': {
    backgroundColor: '#ffffff', // White background on hover
    color: '#121212',  // Dark text color
  },
};

export default Navbar;
