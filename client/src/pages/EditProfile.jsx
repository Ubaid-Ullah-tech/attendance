import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import axios from 'axios';

const EditProfile = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from local storage
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    await axios.put('/api/users/profile', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <Container>
      <h2>Edit Profile</h2>
      <form onSubmit={handleProfileUpdate}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default EditProfile;
