import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {Container} from '@mui/material';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/NavBar';
import { AuthProvider } from './services/AuthContext';
import EventPage from './pages/EventPage';
import NotFound from './pages/NotFound';
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
          <Route path="/not-found" element={<NotFound />} /> 
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Container>
    </Router>
    </AuthProvider> 
  );
};

export default App;