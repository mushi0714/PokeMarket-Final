import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Trash2, Package, Tag, Image as ImageIcon, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', sprite: '' });

  useEffect(() => {
    fetch('http://localhost:3000/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      setProducts([...products, data]);
      setNewProduct({ name: '', price: '', sprite: '' });
      
      // 🏛️ Alerta de Admin: Ultra Ball
      toast("New Item Listed!", {
        icon: <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" width="25" style={{marginRight: '15px'}} />
      });
    } catch (error) { toast.error("Error adding product"); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p.id !== id));
      
      // Alerta de borrado profesional
      toast.error("Product removed from database");
    } catch (error) { toast.error("Error deleting product"); }
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
      <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Package size={28} /> League Admin Inventory
      </h2>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>List New Exclusive Item</h3>
        <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', alignItems: 'end' }}>
          <div className="input-group"> <Tag size={16}/> <input type="text" placeholder="Name" value={newProduct.name} required onChange={e => setNewProduct({...newProduct, name: e.target.value})} /> </div>
          <div className="input-group"> <DollarSign size={16}/> <input type="number" placeholder="Price" value={newProduct.price} required onChange={e => setNewProduct({...newProduct, price: e.target.value})} /> </div>
          <div className="input-group"> <ImageIcon size={16}/> <input type="text" placeholder="Sprite URL" value={newProduct.sprite} required onChange={e => setNewProduct({...newProduct, sprite: e.target.value})} /> </div>
          <button type="submit" className="btn-primary" style={{ padding: '12px' }}><Plus size={18}/> List Item</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Active Market Inventory</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {products.map(product => (
            <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={product.sprite} width="40" alt={product.name} />
                <div>
                  <p style={{ fontWeight: 'bold', textTransform: 'capitalize', margin: 0 }}>{product.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--poke-red)', margin: 0 }}>₽ {product.price}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;