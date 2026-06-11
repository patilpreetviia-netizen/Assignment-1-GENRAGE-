import { useState } from 'react';
import ProductManager from '../components/admin/ProductManager';
import OrderManager from '../components/admin/OrderManager';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', paddingTop: '80px', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
        <div style={{ padding: '20px', borderRight: '1px solid #333', width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1 className="statement-headline raw-title" style={{ fontSize: '20px', marginBottom: '30px' }}>ADMINISTRATOR</h1>
          
          <button 
            onClick={() => setActiveTab('products')}
            style={{ ...tabBtnStyle, backgroundColor: activeTab === 'products' ? '#222' : 'transparent' }}
          >
            HARDWARE PROTOCOLS
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ ...tabBtnStyle, backgroundColor: activeTab === 'orders' ? '#222' : 'transparent' }}
          >
            TRANSACTION LOGS
          </button>

          <div style={{ marginTop: 'auto' }}>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{ ...tabBtnStyle, marginBottom: '10px' }}
            >
              EXIT TO USER DASH
            </button>
            <button 
              onClick={handleSignOut}
              style={{ ...tabBtnStyle, color: '#ff4444', borderColor: '#ff444433' }}
            >
              TERMINATE SESSION
            </button>
          </div>
        </div>

        <div style={{ flex: 1, padding: '40px' }}>
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'orders' && <OrderManager />}
        </div>
      </div>
    </div>
  );
};

const tabBtnStyle = {
  padding: '15px',
  textAlign: 'left',
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid #333',
  cursor: 'pointer',
  fontFamily: 'Syncopate',
  fontSize: '10px',
  fontWeight: 'bold',
  letterSpacing: '0.1em'
};

export default AdminDashboard;
