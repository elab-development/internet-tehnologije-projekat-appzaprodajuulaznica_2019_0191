import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* ... other buttons */}
        {user ? (
          <>
            <Button color="inherit" onClick={logout}>Logout</Button>
            {user.isAdmin && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;