import React from 'react';
import { Package, Heart, Zap, Sparkles } from 'lucide-react';

const CategorySidebar = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Items', icon: <Package size={18} /> },
    { id: 'standard-balls', name: 'Pokéballs', icon: <Sparkles size={18} /> },
    { id: 'healing', name: 'Healing', icon: <Heart size={18} /> },
    { id: 'status-cures', name: 'Status Cures', icon: <Zap size={18} /> }
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '100px', height: 'fit-content' }}>
      <h4 style={{ marginBottom: '1.5rem', color: 'var(--poke-dark-grey)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Categories
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: activeCategory === cat.id ? 'var(--poke-red)' : 'transparent',
              color: activeCategory === cat.id ? 'white' : 'var(--poke-dark-grey)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              fontWeight: '600'
            }}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;