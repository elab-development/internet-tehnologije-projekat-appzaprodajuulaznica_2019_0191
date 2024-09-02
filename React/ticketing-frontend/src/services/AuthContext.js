import React, { createContext, useState, useContext, useEffect } from 'react';
import http from '../utils/http';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      await http.post('/api/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete http.defaults.headers.common['Authorization'];
    }
  };

  // const checkAuth = async () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const response = await http.get('/api/user');
  //       setUser(response.data);
  //       setIsAuthenticated(true);
  //       localStorage.setItem('user', JSON.stringify(response.data));
  //     } catch (error) {
  //       console.error('Error checking auth:', error);
  //       logout();
  //     }
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);