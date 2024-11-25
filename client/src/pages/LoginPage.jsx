import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token); // Save token
      const role = res.data.user.role; // Get user role
      toast.success('Login Successfully');

      if (role === 'admin') {
        navigate('/admindashboard'); // Redirect admin
      } else {
        navigate('/userdashboard'); // Redirect user
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className='flex mt-24 w-full justify-center'>
      <div className='flex flex-col bg-gray-300 w-2/2 p-4 justify-center items-center py-20'>
        <h2 className='flex justify-center items-center text-2xl'>Login Page</h2>
       
          <div className='flex flex-col gap-0'>
          <form onSubmit={handleLogin}>
             <Grid container spacing={2}>
            
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
            
            
          </Grid>
          <Button  type='submit' variant='contained' color='primary'>Login</Button>
        </form>
          </div>
        
        <p className='pt-5 mb-4'>Don't have an account? Please Register.</p>
        <Link to='/register'>
          <Button variant='outlined'>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;