import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Container} from '@mui/material';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/NavBar';
import { AuthProvider } from './services/AuthContext';
import EventPage from './pages/EventPage';

const App = () => {
  return (
    <AuthProvider>
    <Router>
     <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/event/:id" element={<EventPage />} /> 
        </Routes>
      </Container>
    </Router>
    </AuthProvider>
  );
};

export default App;