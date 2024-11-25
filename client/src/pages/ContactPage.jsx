import React, { useState, useEffect } from 'react';
import contactImage from '../assets/images/ubaid1.jpg'; // Replace with the correct path to your image

const ContactPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  };

  const imageStyle = {
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  };

  const imgStyle = {
    width: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const infoStyle = {
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#333',
    textAlign: isMobile ? 'center' : 'left',
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    marginBottom: '20px',
    color: '#555',
    textAlign: isMobile ? 'center' : 'left',
  };

  const detailsStyle = {
    fontSize: '1rem',
    color: '#444',
    textAlign: isMobile ? 'center' : 'left',
  };

  const strongStyle = {
    fontWeight: 'bold',
  };

  return (
    <div className='mt-10'  style={containerStyle}>
        <p className='text-2xl'>Contact_Page</p>
      <div style={imageStyle}>
        <img src={contactImage} alt="Contact Us" style={imgStyle} />
      </div>
      <div style={infoStyle}>
        <h2 style={headingStyle}>Get in Touch</h2>
        <p style={paragraphStyle}>
          We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us using the details below.
        </p>
        <div style={detailsStyle}>
          <p><strong style={strongStyle}>Email:</strong> ubaidullah.uoh@gmail.com</p>
          <p><strong style={strongStyle}>Phone:</strong> 03493673578</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
