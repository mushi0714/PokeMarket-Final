import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

// 1. Definimos qué datos tiene un Usuario
interface User {
  id: string | number;
  name: string;
  email?: string;
  role: 'admin' | 'cliente'; // Mantenemos el rol para la validación
  wishlist?: any[];
  inventory?: any[];
}

// 2. Definimos qué funciones y datos ofrece el Contexto (Añadimos token)
interface AuthContextType {
  user: User | null;
  token: string | null; // <--- Nueva propiedad
  loading: boolean;
  login: (userData: User, token: string) => void; // <--- Ahora recibe el token
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // <--- Estado del token
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pokeUser');
    const savedToken = localStorage.getItem('pokeToken'); // <--- Recuperamos token

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error("Error parsing auth data from localStorage", error);
        localStorage.removeItem('pokeUser');
        localStorage.removeItem('pokeToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('pokeUser', JSON.stringify(userData));
    localStorage.setItem('pokeToken', tokenData); // <--- Guardamos token
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pokeUser');
    localStorage.removeItem('pokeToken');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};