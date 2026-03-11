import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginCard = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🏛️ Validación única contra db.json
      const res = await fetch(`http://localhost:3000/users?email=${formData.email}&password=${formData.password}`);
      const users = await res.json();
      
      if (users && users.length > 0) {
        login(users[0]);
        toast("Access Granted!", {
          description: `Welcome back, ${users[0].username}`,
          icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" width="20" />
        });
        navigate('/profile');
      } else {
        toast.error("Invalid credentials. Try again.");
      }
    } catch (error) {
      toast.error("Connection error with the League server.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 1rem' }}>
      <div className="auth-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Trainer Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div className="input-group">
            <Mail size={18} color="#999" />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="input-group">
            <Lock size={18} color="#999" />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              onChange={e => setFormData({...formData, password: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Access Market <LogIn size={18} />
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem' }}>
          New Trainer? <Link to="/register" style={{ color: 'var(--poke-red)', fontWeight: 'bold', textDecoration: 'none' }}>Register Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;