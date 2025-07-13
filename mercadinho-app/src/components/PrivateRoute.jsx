import React from 'react';
import { Navigate } from 'react-router-dom';

// Privacidade das rotas. Autentica se o usuario logado tem permissao

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth-token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;