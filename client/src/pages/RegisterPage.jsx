import React, { useState } from 'react';
import { TextField, Button, Container, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Role selection
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
        role, // Send the role
      });

      // If the registration is successful, save the token and user info in localStorage
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('User registered successfully!');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0', // Light gray background
    }}>
      <Container maxWidth="sm">
        <h2 className='text-2xl' style={{
          textAlign: 'center',
          marginBottom: '20px',
          
        }}>Register_Page</h2>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#4A5568', // Gray color
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }} htmlFor="name">
                  Username
                </label>
                <input
                  style={{
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    padding: '12px 10px',
                    marginTop: '5px',
                  }}
                  id="name" // This should match the label's htmlFor
                  type="text" // Changed type to text
                  name="name" // Added name attribute
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete='off'
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#4A5568',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }} htmlFor="email">
                  Email
                </label>
                <input
                  style={{
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    padding: '12px 10px',
                    marginTop: '5px',
                  }}
                  id="email" // This should match the label's htmlFor
                  type="email" // Changed type to email
                  name="email" // Added name attribute
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete='off'
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#4A5568',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }} htmlFor="password">
                  Password
                </label>
                <input
                  style={{
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    padding: '12px 10px',
                    marginTop: '5px',
                  }}
                  id="password" // This should match the label's htmlFor
                  type="password" // Changed type to password
                  name="password" // Added name attribute
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete='off'
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="role"
                label="Role"
                select
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
                margin="normal"
                style={{
                  marginBottom: '20px', // Margin for spacing
                }}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
        <p style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          textAlign: 'center',
        }}>Already registered? Please login!</p>
        <Link to='/login'>
          <Button>
            Login
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default RegisterPage;