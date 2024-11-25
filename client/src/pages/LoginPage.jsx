import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      const { token, user } = res.data;

      // Save token and user details
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login Successfully');

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/userdashboard');
      }
    } catch (err) {
      console.error(err);
      // Display error message from backend
      const errorMsg = err.response?.data?.msg || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="flex mt-24 w-full justify-center">
      <div className="flex flex-col bg-gray-300 w-2/2 p-4 justify-center items-center py-20">
        <h2 className="flex justify-center items-center text-2xl">Login Page</h2>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <label htmlFor="email" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginBottom: '20px',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="password" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginBottom: '20px',
                }}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <p className="pt-5 mb-4">Don't have an account? Please Register.</p>
        <Link to="/register">
          <Button variant="outlined">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
