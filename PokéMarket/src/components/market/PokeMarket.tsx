import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ShoppingCart, Search, Star, Trash2, Heart } from 'lucide-react';

// Ahora esta ruta funcionará sin extensiones y sin errores rojos
import { useAuth } from '../../context/AuthContext';

// PASO 1: Interfaz para los productos del mercado
interface PokemonProduct {
  id: string | number;
  name: string;
  cost: number;
  sprite: string;
  isLocal: boolean;
  qty?: number;
}

const PokeMarket: React.FC = () => {
  // AJUSTE CLAVE: Le decimos a TS qué esperar de useAuth para quitar el rojo
  const { user, login } = useAuth() as { 
    user: any; 
    login: (userData: any) => void 
  };
  
  const [items, setItems] = useState<PokemonProduct[]>([]);
  const [cart, setCart] = useState<PokemonProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const localRes = await fetch('http://localhost:3000/products');
        const localData = await localRes.json();
        const apiRes = await fetch('https://pokeapi.co/api/v2/item?limit=40');
        const apiData = await apiRes.json();
        
        const apiDetailed = await Promise.all(
          apiData.results.map(async (i: { url: string }) => fetch(i.url).then(r => r.json()))
        );
        
        const fLocal: PokemonProduct[] = localData.map((p: any) => ({ 
          id: `local-${p.id}`, 
          name: p.name, 
          cost: parseInt(p.price) || 0, 
          sprite: p.sprite, 
          isLocal: true 
        }));
        
        const fApi: PokemonProduct[] = apiDetailed.map((i: any) => ({ 
          id: i.id, 
          name: i.name, 
          cost: i.cost || 500, 
          sprite: i.sprites.default, 
          isLocal: false 
        }));
        
        setItems([...fLocal, ...fApi]);
        setLoading(false);
      } catch (e) { 
        toast.error("Error loading market");
        setLoading(false);
      }
    };
    fetchMarketData();
  }, []);

  const addToCart = (product: PokemonProduct) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item => 
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }
      return [...currentCart, { ...product, qty: 1 }];
    });
    
    toast("Added to Shopping Bag!", {
      icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/39.gif" width="30" style={{ marginRight: '15px' }} alt="icon" />
    });
  };

  const updateQty = (id: string | number, delta: number) => {
    setCart(current => current.map(item => {
      if (item.id === id) {
        const newQty = (item.qty || 1) + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string | number) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const calculateTotal = (): number => cart.reduce((acc, item) => acc + (item.cost * (item.qty || 1)), 0);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem', color: '#888' }}>Loading PokéMarket...</div>;

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', paddingBottom: '4rem' }}>
      <div>
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '1.2rem', display: 'flex', gap: '1rem', background: '#fff' }}>
          <Search color="#999" />
          <input 
            className="input-field" 
            placeholder="Search items..." 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} 
            style={{ margin: 0, border: 'none', width: '100%' }} 
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          {items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
            <div key={item.id} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'white', position: 'relative' }}>
              {item.isLocal && <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--poke-red)', fontSize: '0.6rem', fontWeight: 'bold' }}><Star size={10} fill="var(--poke-red)"/> EXCLUSIVE</div>}
              <img src={item.sprite} width="55" style={{ marginBottom: '1rem' }} alt={item.name} />
              <h4 style={{ textTransform: 'capitalize', fontSize: '0.9rem' }}>{item.name.replace(/-/g, ' ')}</h4>
              <p style={{ color: 'var(--poke-red)', fontWeight: 'bold' }}>₽ {item.cost}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button className="btn-primary" onClick={() => addToCart(item)} style={{ flex: 1, fontSize: '0.7rem' }}>+ Add to Bag</button>
                <button style={{ background: '#f8f9fa', border: '1px solid #eee', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                  <Heart size={16} fill={user?.wishlist?.find((x: any) => x.id === item.id) ? "#ff4d4d" : "none"} color="#ff4d4d" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', background: '#fff', position: 'sticky', top: '20px', height: 'fit-content', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '0.8rem', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <ShoppingCart size={18} /> Shopping Bag
        </h3>
        {cart.length === 0 ? <p style={{ textAlign: 'center', color: '#ccc', padding: '2rem 0' }}>Your bag is empty</p> : (
          <>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px', gap: '10px', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #f9f9f9', paddingBottom: '10px' }}>
                  <img src={item.sprite} width="35" alt={item.name} />
                  <p style={{ fontSize: '0.7rem', fontWeight: 'bold', margin: 0, textTransform: 'capitalize' }}>{item.qty}x {item.name}</p>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{border:'none', background:'#eee', borderRadius:'4px', padding:'2px 6px', cursor:'pointer'}}>-</button>
                    <button onClick={() => updateQty(item.id, 1)} style={{border:'none', background:'#eee', borderRadius:'4px', padding:'2px 6px', cursor:'pointer'}}>+</button>
                    <Trash2 size={14} color="#ff4d4d" onClick={() => removeFromCart(item.id)} style={{ cursor: 'pointer', marginLeft: '5px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px solid #eee', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{fontWeight: 'bold'}}>Total:</span>
                <span style={{fontWeight: 'bold', color: 'var(--poke-red)'}}>₽ {calculateTotal()}</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', padding: '12px' }}>Checkout Now</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PokeMarket;