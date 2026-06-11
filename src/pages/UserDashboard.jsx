import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, signOut, role } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', padding: '100px 20px 60px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
          <div>
            <h1 className="statement-headline raw-title" style={{ fontSize: '32px', margin: '0 0 10px 0' }}>USER OVERVIEW</h1>
            <p style={{ margin: 0, color: '#888' }}>ID: {user?.id}</p>
            <p style={{ margin: 0, color: '#888' }}>EMAIL: {user?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {role === 'admin' && (
              <button 
                onClick={() => navigate('/admin')}
                style={{ padding: '10px 20px', backgroundColor: '#fff', color: '#000', border: 'none', cursor: 'pointer', fontFamily: 'Syncopate', fontSize: '10px', fontWeight: 'bold' }}
              >
                ADMIN PANEL
              </button>
            )}
            <button 
              onClick={handleSignOut}
              style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #333', cursor: 'pointer', fontFamily: 'Syncopate', fontSize: '10px' }}
            >
              TERMINATE SESSION
            </button>
          </div>
        </div>

        <h2 className="statement-headline raw-title" style={{ fontSize: '20px', marginBottom: '20px' }}>ORDER HISTORY</h2>
        
        {loading ? (
          <p style={{ color: '#555' }}>FETCHING RECORDS...</p>
        ) : orders.length === 0 ? (
          <div style={{ border: '1px dashed #333', padding: '40px', textAlign: 'center', color: '#555' }}>
            NO ORDERS FOUND IN SYSTEM
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map(order => (
              <div key={order.id} style={{ border: '1px solid #222', padding: '20px', backgroundColor: '#0a0a0a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '15px' }}>
                  <span style={{ color: '#888', fontSize: '12px' }}>ORDER #{order.order_id}</span>
                  <span style={{ 
                    fontSize: '12px', 
                    padding: '3px 8px', 
                    backgroundColor: order.payment_status === 'Verified' ? '#0f3314' : '#332b0f',
                    color: order.payment_status === 'Verified' ? '#4caf50' : '#ff9800',
                    border: `1px solid ${order.payment_status === 'Verified' ? '#4caf50' : '#ff9800'}`
                  }}>
                    {order.payment_status.toUpperCase()}
                  </span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <div>
                    <p style={{ margin: '0 0 5px', color: '#888', fontSize: '12px' }}>DATE</p>
                    <p style={{ margin: 0 }}>{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: '0 0 5px', color: '#888', fontSize: '12px' }}>TOTAL</p>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>₹{order.order_amount}</p>
                  </div>
                </div>

                <div>
                  <p style={{ margin: '0 0 10px', color: '#888', fontSize: '12px' }}>ITEMS</p>
                  {order.cart_items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                      <img src={item.src} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '12px' }}>{item.name}</p>
                        <p style={{ margin: 0, fontSize: '10px', color: '#888' }}>SIZE: {item.size} | QTY: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
