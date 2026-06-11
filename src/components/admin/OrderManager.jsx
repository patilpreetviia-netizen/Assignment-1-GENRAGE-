import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ payment_status: newStatus })
      .eq('id', id);

    if (!error) {
      fetchOrders();
    }
  };

  return (
    <div>
      <h2 className="statement-headline raw-title" style={{ fontSize: '24px', marginBottom: '20px' }}>TRANSACTION LOGS</h2>
      
      {loading ? (
        <p>FETCHING DATA...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'monospace' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333', textAlign: 'left', color: '#888' }}>
                <th style={{ padding: '10px' }}>ORDER ID</th>
                <th style={{ padding: '10px' }}>CUSTOMER</th>
                <th style={{ padding: '10px' }}>AMOUNT</th>
                <th style={{ padding: '10px' }}>DATE</th>
                <th style={{ padding: '10px' }}>STATUS</th>
                <th style={{ padding: '10px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '10px' }}>{order.order_id}</td>
                  <td style={{ padding: '10px' }}>
                    {order.customer_name}<br/>
                    <span style={{ color: '#666', fontSize: '10px' }}>{order.email}</span>
                  </td>
                  <td style={{ padding: '10px' }}>₹{order.order_amount}</td>
                  <td style={{ padding: '10px' }}>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ 
                      padding: '2px 6px', 
                      backgroundColor: order.payment_status === 'Verified' ? '#0f3314' : '#332b0f',
                      color: order.payment_status === 'Verified' ? '#4caf50' : '#ff9800',
                      border: `1px solid ${order.payment_status === 'Verified' ? '#4caf50' : '#ff9800'}`
                    }}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>
                    <select 
                      value={order.payment_status} 
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ backgroundColor: '#111', color: '#fff', border: '1px solid #333', padding: '5px', outline: 'none' }}
                    >
                      <option value="Pending_Verification">Pending</option>
                      <option value="Verified">Verified</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManager;
