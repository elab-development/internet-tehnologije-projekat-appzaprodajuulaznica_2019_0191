import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import {Link} from 'react-router-dom';
import { useAuth } from '../services/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            {user.isAdmin === 1 && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
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