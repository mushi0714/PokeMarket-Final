import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, token, loading } = useAuth();

  // 1. Mientras verifica la sesión en localStorage, no mostramos nada
  if (loading) return null;

  // 2. Si no hay usuario ni token, directo al login
  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  // 3. Si la ruta es solo para Admin, validamos rol y token
  if (adminOnly) {
    if (user.role !== 'admin' || !token) {
      // Si es un cliente intentando entrar a admin, lo mandamos al Market o Profile
      return <Navigate to="/market" />;
    }
  }

  // 4. Si pasa todas las validaciones, renderiza el componente
  return <>{children}</>;
};

export default ProtectedRoute;