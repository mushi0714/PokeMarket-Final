import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      marginTop: '5rem', 
      padding: '2.5rem 0', 
      borderTop: '1px solid #eee',
      textAlign: 'center',
      background: 'white',
      width: '100%'
    }}>
      <div className="main-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '5px', fontWeight: '800', fontSize: '1.2rem' }}>
          <span style={{ color: 'var(--poke-red)' }}>POKÉ</span>
          <span style={{ color: 'var(--poke-dark-grey)' }}>MARKET</span>
        </div>
        
        <p style={{ color: '#999', fontSize: '0.85rem', maxWidth: '400px', lineHeight: '1.5' }}>
          Professional Pokémon League Management System. 
          Developed for Quiz 3 - Final Evaluation.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          marginTop: '1rem', 
          fontSize: '0.75rem', 
          fontWeight: '700', 
          color: '#bbb',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <span>© 2026 Josue07 - Head Admin</span>
          <span>Pokémon Official API Integration</span>
          <span>Kanto Region License</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;