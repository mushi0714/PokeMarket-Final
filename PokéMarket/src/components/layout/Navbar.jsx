import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, ShoppingBag, User, Settings, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-panel fade-in" style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem',
      background: 'rgba(255, 255, 255, 0.9)',
      position: 'sticky',
      top: '10px',
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', gap: '5px', fontSize: '1.5rem', fontWeight: '800' }}>
        <span style={{ color: 'var(--poke-red)' }}>POKÉ</span>
        <span style={{ color: 'var(--poke-dark-grey)' }}>MARKET</span>
      </Link>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/market" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ShoppingBag size={18} /> Market
            </Link>
            
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: '#666', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Settings size={18} /> Admin
              </Link>
            )}

            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--poke-red)', textDecoration: 'none', fontWeight: 'bold', marginLeft: '10px' }}>
              <User size={20} /> {user.username}
            </Link>

            <button onClick={handleLogout} className="btn-primary" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px 15px', 
              background: '#f0f0f0', 
              color: '#444',
              border: '1px solid #ddd',
              marginLeft: '10px'
            }}>
              <LogOut size={18} /> Exit
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px' }}>
              Login
            </Link>
            <Link to="/register" style={{ 
              textDecoration: 'none', 
              color: '#666', 
              fontWeight: '700', 
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <UserPlus size={18} /> Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;