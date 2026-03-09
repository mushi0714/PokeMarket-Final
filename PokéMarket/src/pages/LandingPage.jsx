import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, UserCog } from 'lucide-react'; // <--- IMPORTANTE: UserCog añadido aquí

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh', 
      textAlign: 'center',
      padding: '2rem'
    }}>
      {/* Logo Grande Flotante */}
      <div className="floating" style={{ marginBottom: '2rem' }}>
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" 
          alt="Logo" 
          style={{ width: '100px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
        />
      </div>

      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>
        <span style={{ color: 'var(--poke-red)' }}>POKÉ</span>
        <span style={{ color: 'var(--poke-dark-grey)' }}>MARKET</span>
      </h1>

      <p style={{ 
        color: '#666', 
        fontSize: '1.2rem', 
        maxWidth: '600px', 
        marginBottom: '2.5rem',
        lineHeight: '1.6' 
      }}>
        The ultimate management system for Pokémon Trainers. 
        Access the official League inventory and manage your team with precision.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <button 
          onClick={() => navigate('/login')}
          className="btn-primary" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '15px 35px', 
            fontSize: '1.1rem',
            boxShadow: '0 10px 20px rgba(255, 0, 0, 0.2)',
            cursor: 'pointer'
          }}
        >
          Enter Market <ArrowRight size={20} />
        </button>
      </div>

      {/* Mini Info Cards Simétricas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2rem', 
        marginTop: '5rem',
        maxWidth: '900px'
      }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <ShoppingBag size={24} color="var(--poke-red)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ marginBottom: '0.5rem' }}>Official Gear</h4>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>Direct access to PokéAPI standard inventory.</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <ShieldCheck size={24} color="var(--poke-red)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ marginBottom: '0.5rem' }}>Trainer ID</h4>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>Custom Trainer Cards for every league member.</p>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <UserCog size={24} color="var(--poke-red)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ marginBottom: '0.5rem' }}>Admin Control</h4>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>Complete CRUD management for league heads.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;