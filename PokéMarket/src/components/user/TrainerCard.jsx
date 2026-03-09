import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Package, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import maleIcon from '../../assets/icons/male-icon.png';
import femaleIcon from '../../assets/icons/female-icon.png';

const TrainerCard = () => {
  const { user, logout } = useAuth();
  const [freshUser, setFreshUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3000/users/${user.id}`).then(res => res.json()).then(data => setFreshUser(data));
    }
  }, [user]);

  if (!freshUser) return null;

  const top3 = freshUser.lastPurchase?.items ? [...freshUser.lastPurchase.items].sort((a, b) => b.cost - a.cost).slice(0, 3) : [];

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2.5rem' }}>
      <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem auto', background: '#fff' }}>
          <img src={freshUser.gender === 'male' ? maleIcon : femaleIcon} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h2 style={{textTransform:'capitalize'}}>{freshUser.username}</h2>
        <p style={{color:'var(--poke-red)', fontWeight:'bold', fontSize:'0.7rem'}}>{freshUser.role?.toUpperCase()}</p>

        <div style={{textAlign:'left', marginTop:'2rem', background:'#f9f9f9', padding:'15px', borderRadius:'15px'}}>
          <p style={{fontSize:'0.7rem', fontWeight:'bold', color:'#999', marginBottom:'10px'}}><ShoppingBag size={12}/> LAST PURCHASE</p>
          <div style={{display:'flex', gap:'8px'}}>
            {top3.map((item, i) => <img key={i} src={item.sprite} width="35" title={item.name} style={{background:'#fff', borderRadius:'50%', padding:'5px'}}/>)}
            {top3.length === 0 && <span style={{fontSize:'0.7rem', color:'#ccc'}}>Empty</span>}
          </div>
        </div>
        <button onClick={logout} style={{color:'#ff4d4d', background:'none', border:'none', cursor:'pointer', marginTop:'2rem', fontWeight:'bold', fontSize:'0.8rem'}}>Logout Account</button>
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem', borderTop: '6px solid #0d47a1', background: '#fff' }}>
        <h3 style={{color:'#0d47a1', display:'flex', alignItems:'center', gap:'10px', marginBottom:'2rem'}}><Heart size={20} fill="#0d47a1"/> My Persistent Wishlist</h3>
        {freshUser.wishlist?.length > 0 ? (
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1rem'}}>
            {freshUser.wishlist.map(item => (
              <div key={item.id} className="glass-panel" style={{textAlign:'center', padding:'1rem', background:'#f8fbff', border:'1px solid #e3f2fd'}}>
                <img src={item.sprite} width="50" style={{marginBottom:'10px'}} />
                <p style={{fontSize:'0.8rem', fontWeight:'bold', textTransform:'capitalize', margin:0}}>{item.name}</p>
                <p style={{color:'#0d47a1', fontWeight:'bold', fontSize:'0.9rem'}}>₽ {item.cost}</p>
                <button onClick={() => navigate('/market')} style={{background:'#0d47a1', color:'#fff', border:'none', padding:'8px', borderRadius:'6px', width:'100%', marginTop:'10px', fontSize:'0.7rem', cursor:'pointer'}}>View in Market <ArrowRight size={12}/></button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{textAlign:'center', padding:'4rem'}}>
            <p style={{color:'#ccc'}}>Your wishlist is empty.</p>
            <button onClick={() => navigate('/market')} style={{background:'none', border:'1px solid #0d47a1', color:'#0d47a1', padding:'8px 20px', borderRadius:'20px', marginTop:'1rem', cursor:'pointer'}}>Go to Market</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerCard;