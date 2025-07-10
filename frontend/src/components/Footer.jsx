import React from 'react';
import facebookIcon from '../assets/facebook.png';

import xIcon from '../assets/x.png';
import linkedinIcon from '../assets/download (6).png';



const Footer = ({ backgroundColor = '#e67e22' }) => {
  const styles = {
    footer: {
      backgroundColor,
      color: '#f1f1f1',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    column: {
      flex: '1 1 300px',
      margin: '10px',
    },
    heading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    text: {
      lineHeight: '1.6',
    },
    socialIcons: {
      display: 'flex',
      gap: '10px',
      marginTop: '10px',
    },
    icon: {
  width: '30px',
  height: '30px',
  cursor: 'pointer',
   },

    bottom: {
      textAlign: 'center',
      marginTop: '30px',
      borderTop: '1px solid #ccc',
      paddingTop: '15px',
      fontSize: '14px',
      color: '#ddd',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        <div style={styles.column}>
          <h3 style={styles.heading}>JobHub</h3>
          <p style={styles.text}>
            Your one-stop platform to connect talent with opportunity. Built with the MERN stack.
          </p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.heading}>Contact</h4>
          <p style={styles.text}>Email: support@jobhunt.com</p>
          <p style={styles.text}>Phone: +1 (555) 123-4567</p>
        </div>

        <div style={styles.column}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
           <img src={facebookIcon} alt="Facebook" style={styles.icon} />
           <img src={xIcon} alt="X" style={styles.icon} />
           <img src={linkedinIcon} alt="LinkedIn" style={styles.icon} />
 
          </div>
        </div>

      </div>

      <div style={styles.bottom}>
        <p>&copy; 2025 JobHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
