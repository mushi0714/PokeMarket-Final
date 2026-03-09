import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { User, Lock, Mail, ChevronRight } from 'lucide-react';

const RegisterCard = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', gender: 'male' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'cliente', inventory: [], wishlist: [] })
      });
      const newUser = await res.json();
      login(newUser);
      
      // 🏛️ Alerta limpia con Pokéball Estática
      toast("Welcome to the League!", {
        description: "Your trainer journey begins now.",
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" width="25" style={{marginRight: '15px'}} />
      });
      
      navigate('/profile');
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-card fade-in">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Join the Market</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div className="input-group">
          <User size={18} />
          <input type="text" placeholder="Username" required onChange={(e) => setFormData({...formData, username: e.target.value})} />
        </div>
        <div className="input-group">
          <Mail size={18} />
          <input type="email" placeholder="Trainer Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="input-group">
          <Lock size={18} />
          <input type="password" placeholder="Secure Password" required onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        
        {/* Selector de Género (Esto asignará tu icono de Male/Female en el perfil) */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '0.5rem 0' }}>
          <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="gender" value="male" defaultChecked onChange={(e) => setFormData({...formData, gender: e.target.value})} /> Male
          </label>
          <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="gender" value="female" onChange={(e) => setFormData({...formData, gender: e.target.value})} /> Female
          </label>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          Register Account <ChevronRight size={18} />
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#666' }}>
        Already a member? <Link to="/login" style={{ color: 'var(--poke-red)', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link>
      </p>
    </div>
  );
};

export default RegisterCard;