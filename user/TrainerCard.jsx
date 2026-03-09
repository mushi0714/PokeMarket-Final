import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TrainerCard = () => {
  const { user } = useAuth();

  // Mapeo lógico de Avatares
  const getAvatar = () => {
    if (user.role === 'admin') {
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/106.png"; // Blue (Champion)
    }
    if (user.gender === 'male') {
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/20.png";  // Brock
    }
    return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/21.png";    // Misty
  };

  return (
    <div className="glass-panel" style={{ 
      padding: '2.5rem', 
      maxWidth: '450px', 
      margin: '2rem auto', 
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    }}>
      <h2 style={{ color: 'var(--poke-dark-grey)', textTransform: 'uppercase', letterSpacing: '2px' }}>
        Trainer Card
      </h2>
      
      {/* Contenedor del Avatar con simetría circular */}
      <div style={{ 
        width: '150px', 
        height: '150px', 
        borderRadius: '50%', 
        backgroundColor: 'rgba(255,0,0,0.05)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        border: '2px solid var(--poke-red)'
      }}>
        <img 
          src={getAvatar()} 
          alt="Trainer Avatar" 
          style={{ width: '100px', height: '100px', objectFit: 'contain' }}
        />
      </div>

      {/* Información del Entrenador */}
      <div style={{ width: '100%', textAlign: 'left', padding: '0 1rem' }}>
        <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Trainer Name</p>
        <h3 style={{ marginBottom: '1rem', color: 'var(--poke-dark-grey)' }}>{user.username}</h3>
        
        <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Email Address</p>
        <h4 style={{ marginBottom: '1rem', color: 'var(--poke-dark-grey)', fontWeight: '400' }}>{user.email}</h4>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #eee'
        }}>
          <div>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>Role</p>
            <span style={{ 
              backgroundColor: user.role === 'admin' ? 'var(--poke-red)' : '#30A7D7', 
              color: 'white', 
              padding: '4px 12px', 
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              {user.role.toUpperCase()}
            </span>
          </div>
          <div>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>Region</p>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Kanto</span>
          </div>
        </div>
      </div>
      
      <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
        Go to Market
      </button>
    </div>
  );
};

export default TrainerCard;