import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não tiver token, redireciona para a tela de login
    return <Navigate to="/home" replace />;
  }

  // Se estiver logado, renderiza o componente normalmente
  return element;
};

export default ProtectedRoute;
