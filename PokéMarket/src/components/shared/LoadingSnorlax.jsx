import React from 'react';

const LoadingSnorlax = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '80vh', /* Centrado vertical casi total */
      textAlign: 'center',
      gap: '1rem'
    }}>
      {/* Sprite Animado de Snorlax Durmiendo */}
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/143.gif" 
        alt="Snorlax Sleeping" 
        style={{ width: '120px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
      />
      
      <div style={{ position: 'relative' }}>
        <h2 style={{ 
          color: 'var(--poke-dark-grey)', 
          fontWeight: '600', 
          fontSize: '1.5rem',
          letterSpacing: '1px' 
        }}>
          Snorlax is blocking the path...
        </h2>
        <p style={{ color: '#888', marginTop: '0.5rem' }}>
          Please wait while we set up the Market.
        </p>
        
        {/* Animación sutil de Zzz */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-20px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#aaa',
          animation: 'zzz 2s infinite'
        }}>
          Zzz...
        </div>
      </div>

      <style>
        {`
          @keyframes zzz {
            0% { opacity: 0; transform: translateY(0) scale(1); }
            50% { opacity: 1; transform: translateY(-10px) scale(1.2); }
            100% { opacity: 0; transform: translateY(-20px) scale(1.4); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSnorlax;