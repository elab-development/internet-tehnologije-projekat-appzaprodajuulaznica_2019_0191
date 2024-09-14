import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Paper
} from '@mui/material';
import http from '../utils/http';

const AdminUserCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Email is not valid";
    tempErrors.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    try {
      if(validateForm()){
        const response = await http.post('/api/admin/register', formData);
        if (response.data.success) {
          setSuccessMessage('New admin user registered successfully!');
          setFormData({ name: '', email: '', password: '' });
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Registration failed:', error.response.data);
        setErrors({ ...errors, submit: error.response.data.message });
      } else {
        console.error('An unexpected error occurred:', error);
        setErrors({ ...errors, submit: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Register New Admin User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          {errors.submit && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errors.submit}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success" variant="body2" sx={{ mt: 1 }}>
              {successMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register New Admin
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminUserCreate;