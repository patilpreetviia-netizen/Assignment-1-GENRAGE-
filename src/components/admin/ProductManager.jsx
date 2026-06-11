import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    raw_price: '',
    category: '',
    src: '',
    description: '',
    stock: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (!error) {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productPayload = {
      ...formData,
      raw_price: parseInt(formData.raw_price) || 0,
      stock: parseInt(formData.stock) || 0,
    };

    if (editingId) {
      const { error } = await supabase.from('products').update(productPayload).eq('id', editingId);
      if (!error) {
        setEditingId(null);
        setFormData({ name: '', price: '', raw_price: '', category: '', src: '', description: '', stock: '' });
        fetchProducts();
      }
    } else {
      const { error } = await supabase.from('products').insert([productPayload]);
      if (!error) {
        setFormData({ name: '', price: '', raw_price: '', category: '', src: '', description: '', stock: '' });
        fetchProducts();
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      raw_price: product.raw_price,
      category: product.category,
      src: product.src,
      description: product.description,
      stock: product.stock
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("CONFIRM DELETION OF THIS HARDWARE?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        fetchProducts();
      }
    }
  };

  return (
    <div>
      <h2 className="statement-headline raw-title" style={{ fontSize: '24px', marginBottom: '20px' }}>HARDWARE REGISTRY</h2>
      
      <div style={{ backgroundColor: '#111', padding: '20px', border: '1px solid #333', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, fontSize: '14px', color: '#888' }}>{editingId ? 'EDIT PROTOCOL' : 'NEW PROTOCOL'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" required style={inputStyle} />
          <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category (e.g. pants, hoodies)" required style={inputStyle} />
          <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Display Price (e.g. ₹1,999)" required style={inputStyle} />
          <input name="raw_price" value={formData.raw_price} onChange={handleInputChange} type="number" placeholder="Raw Price (e.g. 1999)" required style={inputStyle} />
          <input name="stock" value={formData.stock} onChange={handleInputChange} type="number" placeholder="Stock Units" required style={inputStyle} />
          <input name="src" value={formData.src} onChange={handleInputChange} placeholder="Image URL" required style={inputStyle} />
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required style={{...inputStyle, gridColumn: '1 / -1', minHeight: '80px'}} />
          
          <button type="submit" style={{ gridColumn: '1 / -1', padding: '10px', backgroundColor: '#fff', color: '#000', border: 'none', fontFamily: 'Syncopate', fontWeight: 'bold', cursor: 'pointer' }}>
            {editingId ? 'UPDATE RECORD' : 'INITIALIZE ASSET'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {setEditingId(null); setFormData({ name: '', price: '', raw_price: '', category: '', src: '', description: '', stock: '' });}} style={{ gridColumn: '1 / -1', padding: '10px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #333', fontFamily: 'Syncopate', cursor: 'pointer' }}>
              CANCEL
            </button>
          )}
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {loading ? <p>LOADING DATABASE...</p> : products.map(product => (
          <div key={product.id} style={{ border: '1px solid #222', backgroundColor: '#0a0a0a', padding: '15px' }}>
            <img src={product.src} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
            <p style={{ margin: '0 0 5px', fontSize: '12px', fontWeight: 'bold' }}>{product.name}</p>
            <p style={{ margin: '0 0 5px', fontSize: '10px', color: '#888' }}>{product.price} | STOCK: {product.stock}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => handleEdit(product)} style={actionBtnStyle}>EDIT</button>
              <button onClick={() => handleDelete(product.id)} style={{...actionBtnStyle, color: '#ff4444'}}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #222',
  color: '#fff',
  fontFamily: 'monospace',
  outline: 'none'
};

const actionBtnStyle = {
  flex: 1,
  padding: '5px',
  backgroundColor: '#111',
  color: '#fff',
  border: '1px solid #333',
  fontFamily: 'monospace',
  fontSize: '10px',
  cursor: 'pointer'
};

export default ProductManager;
