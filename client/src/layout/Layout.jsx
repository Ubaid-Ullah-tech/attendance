import React from 'react';
import  { NavbarDefault} from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import  { SimpleFooter } from '../components/Footer';

import LoginPage from '../pages/LoginPage';

const Layout = () => {
  const location = useLocation();

  return (
    <div style={styles.container}>
      <header className='w-full fixed z-50' style={styles.header}>
        <NavbarDefault/>
        {/* <ComplexNavbar/> */}
      </header>
      {location.pathname === '/' && <LoginPage />}
      <main className='mt-16 bg-teal-200' style={styles.main}>
        <Outlet />
      </main>
      <footer style={styles.footer}>
        <SimpleFooter />
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Ensures the container takes full height
  },
  header: {
    // Any specific styles for the header can go here
  },
  main: {
    flex: 1, // This allows the main content to grow and take up available space
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centers the content vertically (optional)
    alignItems: 'center', // Centers the content horizontally (optional)
    padding: '20px', // Add padding if needed
  },
  footer: {
    // Any specific styles for the footer can go here
  },
};

export default Layout;
