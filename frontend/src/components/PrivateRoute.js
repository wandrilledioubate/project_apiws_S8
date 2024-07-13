// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log('isAuthenticated:', isAuthenticated); // Ajoutez ce log

  if (isAuthenticated === null) {
    // Afficher un indicateur de chargement ou un feedback visuel
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
